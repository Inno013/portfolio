// ============================================================
// Portfolio Data Types
// ============================================================

export interface Profile {
  name: string;
  greeting: string;
  role: string;
  description: string;
  cvUrl: string;
  email: string;
  phone: string;
  profileImage: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0–100
  icon: string; // emoji or URL
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string; // "Present" or a date string
  description: string;
  isCurrent: boolean;
  type: string; // "Work" | "Freelance" | "Internship"
  logoUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string;
}
