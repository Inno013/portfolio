import { Client } from "@notionhq/client";
import type {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
} from "../types/index";

// ============================================================
// Notion Client
// ============================================================
const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

// Helper: extract plain text from Notion rich text
function richText(rt: any[]): string {
  return rt?.map((t: any) => t.plain_text).join("") ?? "";
}

// Helper: format date to "MMM YYYY"
function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ============================================================
// PROFILE
// ============================================================
export async function getProfile(): Promise<Profile> {
  const FALLBACK: Profile = {
    name: "Your Name",
    greeting: "Hello 👋",
    role: "Full Stack Developer",
    description:
      "A passionate developer who loves building beautiful and functional web applications. Update this via your Notion database.",
    cvUrl: "/cv/resume.pdf",
    email: "hello@example.com",
    phone: "",
    profileImage: "/src/assets/profile.jpg",
    socialLinks: {
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
    },
  };

  const dbId = import.meta.env.NOTION_PROFILE_DB_ID;
  if (!dbId) return FALLBACK;

  try {
    const res = await notion.databases.query({
      database_id: dbId,
      page_size: 1,
    });
    if (!res.results.length) return FALLBACK;

    const p = res.results[0] as any;
    const props = p.properties;

    return {
      name: richText(props["Name"]?.title) || FALLBACK.name,
      greeting: richText(props["Greeting"]?.rich_text) || FALLBACK.greeting,
      role: richText(props["Role"]?.rich_text) || FALLBACK.role,
      description:
        richText(props["Description"]?.rich_text) || FALLBACK.description,
      cvUrl: props["CV URL"]?.url || FALLBACK.cvUrl,
      email: props["Email"]?.email || FALLBACK.email,
      phone: props["Phone"]?.phone_number || FALLBACK.phone,
      profileImage:
        props["Profile Image"]?.url ||
        props["Profile Image"]?.files?.[0]?.file?.url ||
        props["Profile Image"]?.files?.[0]?.external?.url ||
        FALLBACK.profileImage,
      socialLinks: {
        facebook: props["Facebook"]?.url || undefined,
        instagram: props["Instagram"]?.url || undefined,
        whatsapp: props["WhatsApp"]?.url || undefined,
        linkedin: props["LinkedIn"]?.url || undefined,
        github: props["GitHub"]?.url || undefined,
      },
    };
  } catch (err) {
    console.error("[Notion] getProfile error:", err);
    return FALLBACK;
  }
}

// ============================================================
// SKILLS
// ============================================================
export async function getSkills(): Promise<Skill[]> {
  const FALLBACK: Skill[] = [
    {
      id: "1",
      name: "TypeScript",
      category: "Frontend",
      level: 85,
      icon: "🟦",
      order: 1,
    },
    {
      id: "2",
      name: "React",
      category: "Frontend",
      level: 80,
      icon: "⚛️",
      order: 2,
    },
    {
      id: "3",
      name: "Astro",
      category: "Frontend",
      level: 75,
      icon: "🚀",
      order: 3,
    },
    {
      id: "4",
      name: "Node.js",
      category: "Backend",
      level: 78,
      icon: "🟩",
      order: 4,
    },
    {
      id: "5",
      name: "PostgreSQL",
      category: "Database",
      level: 70,
      icon: "🐘",
      order: 5,
    },
    {
      id: "6",
      name: "Figma",
      category: "Design",
      level: 72,
      icon: "🎨",
      order: 6,
    },
    {
      id: "7",
      name: "Docker",
      category: "Tools",
      level: 65,
      icon: "🐳",
      order: 7,
    },
    {
      id: "8",
      name: "Git",
      category: "Tools",
      level: 88,
      icon: "📦",
      order: 8,
    },
  ];

  const dbId = import.meta.env.NOTION_SKILLS_DB_ID;
  if (!dbId) return FALLBACK;

  try {
    const res = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    return res.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        name: richText(props["Name"]?.title) || "Skill",
        category: props["Category"]?.select?.name || "Other",
        level: props["Level"]?.number ?? 50,
        icon: richText(props["Icon"]?.rich_text) || "⚡",
        order: props["Order"]?.number ?? 99,
      };
    });
  } catch (err) {
    console.error("[Notion] getSkills error:", err);
    return FALLBACK;
  }
}

// ============================================================
// PROJECTS
// ============================================================
export async function getProjects(): Promise<Project[]> {
  const FALLBACK: Project[] = [
    {
      id: "1",
      title: "Portfolio Website",
      description:
        "A dynamic portfolio built with Astro and Notion CMS, deployed on Vercel.",
      tags: ["Astro", "TypeScript", "Notion", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      imageUrl: "",
      featured: true,
      order: 1,
    },
    {
      id: "2",
      title: "E-Commerce App",
      description:
        "Full-stack e-commerce platform with payment integration and real-time inventory.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      imageUrl: "",
      featured: true,
      order: 2,
    },
    {
      id: "3",
      title: "Task Manager",
      description:
        "Collaborative task management app with Kanban board and team collaboration features.",
      tags: ["React", "Firebase", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      imageUrl: "",
      featured: false,
      order: 3,
    },
  ];

  const dbId = import.meta.env.NOTION_PROJECTS_DB_ID;
  if (!dbId) return FALLBACK;

  try {
    const res = await notion.databases.query({
      database_id: dbId,
      sorts: [
        { property: "Featured", direction: "descending" },
        { property: "Order", direction: "ascending" },
      ],
    });

    return res.results.map((page: any) => {
      const props = page.properties;
      const files = props["Image"]?.files ?? [];
      const imageUrl =
        files[0]?.file?.url ||
        files[0]?.external?.url ||
        props["Image URL"]?.url ||
        "";

      return {
        id: page.id,
        title: richText(props["Title"]?.title) || "Project",
        description: richText(props["Description"]?.rich_text) || "",
        tags: props["Tags"]?.multi_select?.map((t: any) => t.name) ?? [],
        liveUrl: props["Live URL"]?.url || undefined,
        githubUrl: props["GitHub URL"]?.url || undefined,
        imageUrl,
        featured: props["Featured"]?.checkbox ?? false,
        order: props["Order"]?.number ?? 99,
      };
    });
  } catch (err) {
    console.error("[Notion] getProjects error:", err);
    return FALLBACK;
  }
}

// ============================================================
// EXPERIENCE (Career)
// ============================================================
export async function getExperiences(): Promise<Experience[]> {
  const FALLBACK: Experience[] = [
    {
      id: "1",
      company: "Tech Company",
      role: "Frontend Developer",
      startDate: "Jan 2023",
      endDate: "Present",
      description:
        "Developing and maintaining web applications using React and TypeScript.",
      isCurrent: true,
      type: "Work",
      logoUrl: "",
    },
    {
      id: "2",
      company: "Startup Inc.",
      role: "Junior Developer",
      startDate: "Jun 2021",
      endDate: "Dec 2022",
      description:
        "Built RESTful APIs and responsive UI components for various client projects.",
      isCurrent: false,
      type: "Work",
      logoUrl: "",
    },
  ];

  const dbId = import.meta.env.NOTION_EXPERIENCE_DB_ID;
  if (!dbId) return FALLBACK;

  try {
    const res = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "Is Current", direction: "descending" }],
    });

    return res.results.map((page: any) => {
      const props = page.properties;
      const isCurrent = props["Is Current"]?.checkbox ?? false;
      const startDate = formatDate(props["Start Date"]?.date?.start);
      const endDate = isCurrent
        ? "Present"
        : formatDate(props["End Date"]?.date?.start);
      const logoFiles = props["Logo"]?.files ?? [];
      const logoUrl =
        logoFiles[0]?.file?.url ||
        logoFiles[0]?.external?.url ||
        props["Logo URL"]?.url ||
        "";

      return {
        id: page.id,
        company: richText(props["Company"]?.title) || "Company",
        role: richText(props["Role"]?.rich_text) || "Role",
        startDate,
        endDate,
        description: richText(props["Description"]?.rich_text) || "",
        isCurrent,
        type: props["Type"]?.select?.name || "Work",
        logoUrl,
      };
    });
  } catch (err) {
    console.error("[Notion] getExperiences error:", err);
    return FALLBACK;
  }
}

// ============================================================
// EDUCATION
// ============================================================
export async function getEducation(): Promise<Education[]> {
  const FALLBACK: Education[] = [
    {
      id: "1",
      institution: "University Name",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      startDate: "2018",
      endDate: "2022",
      description:
        "Focused on software engineering, algorithms, and web development.",
      gpa: "3.8",
    },
  ];

  const dbId = import.meta.env.NOTION_EDUCATION_DB_ID;
  if (!dbId) return FALLBACK;

  try {
    const res = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "End Date", direction: "descending" }],
    });

    return res.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        institution: richText(props["Institution"]?.title) || "Institution",
        degree: richText(props["Degree"]?.rich_text) || "",
        field: richText(props["Field"]?.rich_text) || "",
        startDate: props["Start Date"]?.date?.start
          ? new Date(props["Start Date"].date.start).getFullYear().toString()
          : "",
        endDate: props["End Date"]?.date?.start
          ? new Date(props["End Date"].date.start).getFullYear().toString()
          : "Present",
        description: richText(props["Description"]?.rich_text) || "",
        gpa: richText(props["GPA"]?.rich_text) || undefined,
      };
    });
  } catch (err) {
    console.error("[Notion] getEducation error:", err);
    return FALLBACK;
  }
}
