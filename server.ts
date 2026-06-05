/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize server-side Gemini API client lazily and safely
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY environment variable is not set or invalid in Settings.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // 1. API: Deep Interactive Dussur Marketing AI Consultation
  app.post("/api/gemini/consult", async (req, res) => {
    const lang = req.body?.lang || "ar";
    try {
      const {
        businessName,
        businessSector,
        targetAudience,
        tone,
        marketingBudget,
        primaryGoal,
      } = req.body;

      if (!businessName || !businessSector) {
        return res.status(400).json({ 
          error: lang === "ar" 
            ? "الرجاء إدخال اسم المشروع والقطاع التجاري بشكل صحيح" 
            : "Please provide both business name and industry sector accurately." 
        });
      }

      const client = getGeminiClient();

      const budgetMap = {
        startup: {
          ar: "ميزانية محدودة / مشاريع ناشئة",
          en: "Limited seed budget / Market validation startup",
        },
        medium: {
          ar: "ميزانية متوسطة / مشاريع تنموية",
          en: "Competitive mid-scale development budget",
        },
        enterprise: {
          ar: "ميزانية تشغيلية كبرى / قطاع حكومي أو شبه حكومي",
          en: "Enterprise scale / sovereign or government-level execution budget",
        },
      };

      const toneMap = {
        professional: {
          ar: "رصين واحترافي رفيع",
          en: "Prestigious, corporate & highly intellectual",
        },
        creative: {
          ar: "إبداعي خارج الصندوق، يلفت الأنظار",
          en: "Immersive, bold, disruptive & out-of-the-box",
        },
        bold: {
          ar: "جريء وثوري يغير قواعد اللعبة",
          en: "Disruptive, revolutionary game-changer",
        },
        luxury: {
          ar: "فاخر وحصري يستهدف فئات عالية القيمة",
          en: "Exclusive luxury, ultra-premium & high-net-worth targeted",
        },
      };

      const arPrompt = `
        صمم لي خطة استراتيجية وهوية تسويقية ذكية ومختصرة جداً تليق بفلسفة "دُسُر".
        معلومات من العميل:
        - اسم المشروع / شركتهم: ${businessName}
        - مجال الشغل: ${businessSector}
        - الجمهور اللي يستهدفونه: ${targetAudience || "الناس بالسعودية"}
        - نبرة وأسلوب الكلام: ${toneMap[tone]?.ar || toneMap.professional.ar}
        - الميزانية المتوقعة: ${budgetMap[marketingBudget]?.ar || budgetMap.medium.ar}
        - الهدف الأساسي اللي يبون يوصلون له: ${primaryGoal || "نثبت حضورنا ورتب شغلنا بالكامل"}

        أرجوك صغ المخرجات بأسلوب بسيط، ذكي، ومختصر جداً بلهجة سعودية مبسطة ولطيفة وواضحة (لهجة بيضاء خفيفة مفهومة وممتعة وبدون حشو كلام أو نصوص طويلة ومملة). نبي العميل يقرأ الكلام ويفهمه برمشة عين وينبسط من بساطته ووضوحه وذكائه. التزم بالهيكل المحدد في قالب الـ JSON تماماً.
      `;

      const enPrompt = `
        Formulate a comprehensive marketing and art-direction strategy tightly aligned with the philosophy of "Dussur United" (Our brand stands for iron-clad ties, anchors, and pillars that keep corporations resilient amidst shifting market waves).
        Client Details:
        - Entity/Brand Name: ${businessName}
        - Industry Sector: ${businessSector}
        - Targeted Demographics: ${targetAudience || "Premium Saudi market and global partners"}
        - Intent Voice/Tone: ${toneMap[tone]?.en || toneMap.professional.en}
        - Strategic Investment Level: ${budgetMap[marketingBudget]?.en || budgetMap.medium.en}
        - Ultimate Goal: ${primaryGoal || "Anchor market presence, build enduring client relationships, and cement long-term brand authority"}

        Key Dussur United pillars to weave into suggestions:
        - We believe that marketing is not a fleeting campaign that vanishes. It is an immutable structural anchor.
        - Dussur's integrated pillars include Brand Strategy & Positioning, Identity Systems & Visual Codes, UX/UI & Digital Products, Premium Web Development, AI Custom Agents & Labs, Paid Media Performance, Cinematic Video Production, PR, and Royal Prints.

        Write your outputs in elegant, high-profile corporate English that suits sovereign-level Saudi institutions and world-class visionaries. Follow the structured JSON schema precisely. Do not include markdown wraps in your generated output other than the raw JSON.
      `;

      const promptText = lang === "ar" ? arPrompt : enPrompt;

      const systemInstructionAr = `
        أنت المستشار الذكي السهل والممتع لشركة "دُسُر" (Dussur). 
        مهمتك تكتب خطة تسويقية واستراتيجية هوية ذكية جداً ومختصرة للغاية بلهجة سعودية بيضاء، بسيطة، محببة، وتدخل القلب على طول.
        تجنب الجمل الطويلة والكلمات المعقدة واللغة الفصحى الثقيلة والمملة. خل كلامك دايركت والمخرجات واضحة يفهمها العميل العادي مباشرة وبدون فلسفة أو نصوص غامضة، وحافظ على الالتزام التام بتسليم مستند JSON نظيف تماماً.
      `;

      const systemInstructionEn = `
        You are the Chief Creative Strategist at "Dussur United" (Dussur represents the colossal, iron ropes that bind the ship's frame together, anchoring it against roaring waves).
        Your mission is to formulate an incredibly powerful, premium strategic advisory brief that anchors the client's brand with "Dussur" (absolute stability and elegance).
        Output everything in highly articulate, professional, world-class business English. Avoid cliches, use sophisticated prose suitable for Saudi enterprise leaders and international builders.
        Ensure your formatted output matches the JSON schema EXACTLY.
      `;

      const systemInstruction = lang === "ar" ? systemInstructionAr : systemInstructionEn;

      const response = await client.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: promptText,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              slogan: {
                type: Type.STRING,
                description: lang === "ar" 
                  ? "شعار إعلاني رنان وقوي جداً يلائم المشروع والجمهور المستهدف بروح سعودية بليغة."
                  : "A highly resonant, powerful strategic slogan/tagline designed to capture market share, with elegant Arabic-Saudi or prestigious international vibes.",
              },
              suggestedTagline: {
                type: Type.STRING,
                description: lang === "ar"
                  ? "شعار فرعي يدعم الشعار الرئيسي ويعمق معناه الاستراتيجي."
                  : "Supporting auxiliary sub-slogan backing the main message with depth.",
              },
              strategicBrief: {
                type: Type.STRING,
                description: lang === "ar"
                  ? "موجز استراتيجي عميق (فقرة غنية جداً) توضح كيف سيدخل العميل السوق، ويتجاوز المنافسين بالاعتماد على ركائز تسويقية قوية وثابتة."
                  : "Deep comprehensive narrative brief mapping out the brand's positioning, market entry strategy, and unique value proposition based on rigid corporate anchors.",
              },
              brandIdentityPillars: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: lang === "ar"
                  ? "ثلاثة ركائز أساسية (عناوين مع وصف قصير جداً) يقوم عليها بناء هوية هذه العلامة التجارية تحديداً."
                  : "Three distinct core pillars (title and very brief description each) that serve as structural pillars for this specific brand identity.",
              },
              visualIdentityConcept: {
                type: Type.STRING,
                description: lang === "ar"
                  ? "الاتجاه البصري والفني الأنسب لتجسيد الهوية (ألوان، طبوغرافيا، رمزية بصريّة) لتعكس الفخامة والاستدامة."
                  : "The definitive art direction and aesthetic parameters (colors, typography, symbolic grid) suited to manifest brand nobility and historical permanence.",
              },
              digitalCampaignIdea: {
                type: Type.STRING,
                description: lang === "ar"
                  ? "فكرة مجنونة وصادمة للحملة الرقمية الأولى (Digital Launch Campaign Concept) بمحتوى تفاعلي أو هاشتاج ريادي."
                  : "A brilliant, high-impact concept for the first interactive launch campaign (Digital Launch Campaign Concept), complete with structural activations.",
              },
              recommendedServices: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: lang === "ar"
                  ? "خدمتان أو ثلاث خدمات نوصي العميل بالبدء فيها فوراً من ركائز دُسُر المتحدة من أجل تنفيذ الخطة على أكمل وجه."
                  : "Two or three specific Dussur services we recommend the client initiates immediately to start materializing their strategic roadmap.",
              },
            },
            required: [
              "slogan",
              "suggestedTagline",
              "strategicBrief",
              "brandIdentityPillars",
              "visualIdentityConcept",
              "digitalCampaignIdea",
              "recommendedServices",
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error(
          lang === "ar" 
            ? "لم نتمكن من الحصول على استجابة مناسبة من محرك الاستراتيجيات."
            : "Could not retrieve valid advice from the strategic reasoning engine."
        );
      }

      // Robust JSON cleaning to avoid SyntaxError if model outputs markdown backticks
      let cleanedText = responseText.trim();
      if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
      }

      const parsedResult = JSON.parse(cleanedText);
      res.json(parsedResult);
    } catch (error: any) {
      console.error("Gemini Consultation Error:", error);
      res.status(500).json({
        error: error.message || 
          (lang === "ar" 
            ? "حدث خطأ غير متوقع أثناء معالجة طلب الاستشارة الإستراتيجية." 
            : "An unexpected error occurred during raw strategy calculation."),
        details: 
          lang === "ar"
            ? "يرجى التأكد من تهيئة مفتاح GEMINI_API_KEY في لوحة الإعدادات والمحاولة من جديد."
            : "Please verify that GEMINI_API_KEY stands correctly configured in the settings dashboard and retry.",
      });
    }
  });

  // 2. API: Simulated Contact Lead Responder with AI Summary Recommendations
  app.post("/api/contact", async (req, res) => {
    const lang = req.body?.lang || "ar";
    try {
      const { name, email, phone, service, message } = req.body;

      if (!name || !email || !phone || !message) {
        return res.status(400).json({ 
          error: lang === "ar"
            ? "يرجى تعبئة جميع الحقول المطلوبة لضمان استلام طلبك ومراجعته."
            : "Please fill out all required fields to submit."
        });
      }

      // Generate a wonderful custom AI welcome advisory paragraph tailored to their exact project request in contact!
      let aiAdvice = lang === "ar"
        ? "يا هلا بك، استلمنا طلبك بكل ترحاب وبنكلمك هاتفياً خلال 24 ساعة عشان نبدأ معاً وبأبسط شكل."
        : "Dussur United specialists will reach out to you within the next 24 hours to secure and map this project's parameters.";
        
      try {
        const client = getGeminiClient();
        const promptAr = `عميل اسمه (${name}) أرسل طلب اتصال لشركة دُسُر يبي خدمة: (${service}).
        رسالته وتفاصيل مشروعه: "${message}".
        اكتب له رد ترويجي ترحيبي قصير جداً وحلو وملهم (جملتين كحد أقصى) بلهجة سعودية بيضاء مبسطة ولطيفة جداً، وعطه نصيحة تسويقية سريعة وذكية ومختصرة بناء على نوع الخدمة اللي يبيها، مع تأكيد أن فريق دُسُر يجهز له كل شيء الحين وبنكلمه هاتفياً فوراً. خله كلام بسيط وسهل ومحبب للقلب وبدون كلافة أو كلام طويل.`;
        
        const promptEn = `A prestigious client named (${name}) submitted an inquiry for service: (${service}).
        Their message details: "${message}".
        Write a short, highly motivating greeting/response (2 to 3 sentences maximum) in prestigious, confident, and warm business English. Provide them with an immediate, smart strategic marketing advice/tip tailored to their specified area, and assure them that Dussur's partners are already reviewing their project and will schedule a live connection. Write the output as a sovereign, elegant telegram message.`;

        const prompt = lang === "ar" ? promptAr : promptEn;
        
        const systemInstructionAr = "أنت المستشار الودود والذكي لشركة دُسُر. ترحب بالعميل السعودي ترحيب دافئ ولطيف جداً بلهجة سعودية بيضاء بمصطلحات راقية وبسيطة، وتعطيه نصيحة تسويقية مختصرة وذكية في جملتين خفيفتين.";
        const systemInstructionEn = "You are the premium welcoming strategic coordinator for Dussur United. Solid poise, luxury elegant corporate English with authentic hospitality, and a brilliant modern marketing tip.";

        const systemInstruction = lang === "ar" ? systemInstructionAr : systemInstructionEn;

        const response = await client.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: prompt,
          config: {
            systemInstruction: systemInstruction,
          }
        });
        if (response.text) {
          aiAdvice = response.text.trim();
        }
      } catch (e) {
        console.warn("Contact AI advice generation placeholder bypass:", e);
      }

      res.json({
        success: true,
        message: lang === "ar"
          ? "تم استلام رسالتك وتوثيقها بسلام بركائز متينة."
          : "Your inquiry has been successfully recorded and pinned to absolute security.",
        aiAdvice: aiAdvice
      });
    } catch (error: any) {
      console.error("Contact Submission Error:", error);
      res.status(500).json({ 
        error: lang === "ar" 
          ? "حدث خطأ أثناء حفظ طلب الاتصال." 
          : "An error occurred while saving contact info." 
      });
    }
  });

  // Static files and Vite integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Vite dev server starting in middleware mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on port ${PORT}`);
    console.log(`Dussur United server environment is up and running: http://localhost:${PORT}`);
  });
}

startServer();
