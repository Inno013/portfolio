/**
 * Maps common skill/technology names to their Simple Icons SVG paths.
 * All icons use viewBox="0 0 24 24" and fill="currentColor".
 * https://simpleicons.org
 */

import {
  siTypescript,
  siJavascript,
  siReact,
  siAstro,
  siVuedotjs,
  siAngular,
  siNextdotjs,
  siSvelte,
  siHtml5,
  siCss,
  siTailwindcss,
  siSass,
  siNodedotjs,
  siPython,
  siPhp,
  siLaravel,
  siDjango,
  siExpress,
  siNestjs,
  siGo,
  siRust,
  siKotlin,
  siSwift,
  siDart,
  siFlutter,
  siPostgresql,
  siMysql,
  siMongodb,
  siRedis,
  siSqlite,
  siFirebase,
  siSupabase,
  siGraphql,
  siFigma,
  siDocker,
  siKubernetes,
  siGit,
  siGithub,
  siGitlab,
  siLinux,
  siGooglecloud,
  siVercel,
  siNetlify,
  siVite,
  siWebpack,
  siPrisma,
  siDrizzle,
  siJest,
  siVitest,
  siCypress,
  siStorybook,
  siRedux,
  siElectron,
  siAndroid,
  siApple,
  siWordpress,
  siShopify,
  siJira,
  siNotion,
  siBun,
} from "simple-icons";

type SimpleIcon = { path: string; hex: string; title: string };

// Normalise a skill name to a lookup key
function normalise(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const iconMap: Record<string, SimpleIcon> = {
  // JavaScript / TypeScript
  typescript: siTypescript,
  ts: siTypescript,
  javascript: siJavascript,
  js: siJavascript,

  // Frontend frameworks
  react: siReact,
  reactjs: siReact,
  astro: siAstro,
  vue: siVuedotjs,
  vuejs: siVuedotjs,
  angular: siAngular,
  angularjs: siAngular,
  nextjs: siNextdotjs,
  next: siNextdotjs,
  svelte: siSvelte,

  // HTML / CSS
  html: siHtml5,
  html5: siHtml5,
  css: siCss,
  css3: siCss,
  tailwind: siTailwindcss,
  tailwindcss: siTailwindcss,
  sass: siSass,
  scss: siSass,

  // Backend runtimes & frameworks
  nodejs: siNodedotjs,
  node: siNodedotjs,
  bun: siBun,
  python: siPython,
  php: siPhp,
  laravel: siLaravel,
  django: siDjango,
  express: siExpress,
  expressjs: siExpress,
  nestjs: siNestjs,
  nest: siNestjs,
  go: siGo,
  golang: siGo,
  rust: siRust,
  // java: no icon available in this simple-icons version
  kotlin: siKotlin,
  swift: siSwift,
  dart: siDart,

  // Mobile
  flutter: siFlutter,
  reactnative: siReact, // React Native uses the React icon

  // Databases
  postgresql: siPostgresql,
  postgres: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  mongo: siMongodb,
  redis: siRedis,
  sqlite: siSqlite,
  firebase: siFirebase,
  supabase: siSupabase,
  graphql: siGraphql,

  // Design
  figma: siFigma,

  // DevOps / Infrastructure
  docker: siDocker,
  kubernetes: siKubernetes,
  k8s: siKubernetes,
  linux: siLinux,
  // AWS and Azure icons not available in this simple-icons version → generic fallback
  gcp: siGooglecloud,
  googlecloud: siGooglecloud,
  vercel: siVercel,
  netlify: siNetlify,

  // Build tools
  vite: siVite,
  webpack: siWebpack,

  // ORM / DB tooling
  prisma: siPrisma,
  drizzle: siDrizzle,

  // Testing
  jest: siJest,
  vitest: siVitest,
  cypress: siCypress,
  storybook: siStorybook,

  // State management
  redux: siRedux,
  // zustand not available in this simple-icons version

  // Misc tools
  electron: siElectron,
  android: siAndroid,
  ios: siApple,
  wordpress: siWordpress,
  shopify: siShopify,
  jira: siJira,
  notion: siNotion,

  // Version control
  git: siGit,
  github: siGithub,
  gitlab: siGitlab,
};

/** Lookup icon by skill name. Returns `null` if no match found. */
export function getSkillIcon(name: string): SimpleIcon | null {
  return iconMap[normalise(name)] ?? null;
}

/**
 * Returns an inline SVG string ready for use in HTML/Astro.
 * Falls back to a generic code icon when skill is unknown.
 */
export function getSkillSvg(name: string, className = ""): string {
  const icon = getSkillIcon(name);
  const cls = className ? ` class="${className}"` : "";

  if (icon) {
    return `<svg${cls} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="${icon.path}"/></svg>`;
  }

  // Generic code / terminal fallback icon
  return `<svg${cls} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
}
