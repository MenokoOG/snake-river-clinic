export type PageSchema = Record<string, string>;

export const pageSchemas: Record<string, PageSchema> = {
  home: {
    heroTitle: "Care that treats you like a human",
    heroSubtitle: "Primary care rooted in respect, experience, and compassion.",
    ctaText: "Request an appointment",
  },
  services: {
    title: "Services",
    body: "Primary care services focused on adult medicine and long-term health.",
  },
  testimonials: {
    quote1: "I finally felt heard as a patient.",
    quote2: "Respectful, thoughtful, and thorough care.",
  },
  contact: {
    address: "Snake River Adult Medicine, Clarkston, WA",
    phone: "(509) 000-0000",
  },
};
