/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface AIConsultationPayload {
  businessName: string;
  businessSector: string;
  targetAudience: string;
  tone: 'professional' | 'creative' | 'bold' | 'luxury';
  marketingBudget: 'startup' | 'medium' | 'enterprise';
  primaryGoal: string;
}

export interface AIConsultationResult {
  slogan: string;
  strategicBrief: string;
  brandIdentityPillars: string[];
  visualIdentityConcept: string;
  digitalCampaignIdea: string;
  recommendedServices: string[];
  suggestedTagline: string;
}

export interface MarketingPillar {
  id: string;
  number: string;
  title: string;
  arabicTitle: string;
  description: string;
  deliverables: string[];
}

export interface BuilderServiceSelection {
  serviceId: string;
  selectedOptions: string[];
  timelineWeeks: number;
}

export interface ProjectProposal {
  clientName: string;
  totalTimelineWeeks: number;
  selectedServices: {
    title: string;
    description: string;
    timeline: string;
    deliverables: string[];
  }[];
}
