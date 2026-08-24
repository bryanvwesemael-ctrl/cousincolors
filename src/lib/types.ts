export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  applications: string[];
  process: string[];
  faq: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export interface ProjectData {
  id: string;
  title: string;
  location: string;
  category: 'Binnen' | 'Buiten' | 'Behang' | 'Lakwerk';
  services: string[];
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
