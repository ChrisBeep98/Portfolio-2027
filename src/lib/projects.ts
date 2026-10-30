import { dictionary } from "@/lib/dictionary";

type Copy = typeof dictionary.en;

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  tags: string[];
  link?: string;
  github?: string;
  lightBg: string;
  darkBg: string;
  accent: string;
}

/** Llave del diccionario que aporta título y descripción de cada pieza. */
type ProjectCopyKey = "goams" | "nevado" | "vank" | "anyma";

type ProjectAsset = Omit<Project, "id" | "title" | "description"> & {
  copyKey: ProjectCopyKey;
};

/**
 * Datos del showcase (media, acentos, tags, ruta). El título y la descripción
 * NO viven aquí: salen del diccionario vía `buildProjects` para conservar la
 * Data Parity Rule EN/ES. Lo consumen `sections/Projects.tsx` (showcase) y
 * `sections/Header.tsx` (slider del menú móvil) — un solo listado, dos usos.
 */
const PROJECT_ASSETS: ProjectAsset[] = [
  {
    copyKey: "goams",
    category: "Product Design",
    image: "/go-ams/login.webp",
    lightBg: "#E5E5E5",
    darkBg: "#171717",
    accent: "#737373",
    tags: ["Product Design", "Figma Design", "Design System"],
    link: "/projects/go-ams",
    github: "#",
  },
  {
    copyKey: "nevado",
    category: "Adventure Platform",
    image: "https://res.cloudinary.com/dnx0dmhq3/image/upload/v1770692621/Layout_4_a4k6ah.jpg",
    video: "https://res.cloudinary.com/dnx0dmhq3/video/upload/v1770754632/chrome_4PFMYnDlsP_mejs5o.mp4",
    lightBg: "#F0F9FF",
    darkBg: "#0F172A",
    accent: "#0EA5E9",
    tags: ["Full Stack", "Payments API", "Branding"],
    link: "/projects/nevado",
    github: "#",
  },
  {
    copyKey: "vank",
    category: "Fintech Platform",
    image: "https://cdn.prod.website-files.com/684d06174bbd508a8dcbc859/68acd98ffcf18c76db9ce92b_MacBook%20Air%20M4%20-%20Sky%20Blue-2.jpg",
    video: "https://res.cloudinary.com/dnx0dmhq3/video/upload/v1770498001/684d06174bbd508a8dcbc859_68a02c4efff9efe6193d79dd_showcase_09-transcode_kezu6n.mp4",
    lightBg: "#FEF08A",
    darkBg: "#713F12",
    accent: "#facc15",
    tags: ["Strategy", "UI/UX Design", "Fintech"],
    link: "/projects/vank",
    github: "#",
  },
  {
    copyKey: "anyma",
    category: "Sports Platform",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
    video: "https://res.cloudinary.com/dnx0dmhq3/video/upload/v1770737959/684d06174bbd508a8dcbc859_68afd4d547d4ac2e7cc5433f_showcase_anyma_02-transcode_mf3jez.mp4",
    lightBg: "#DCFCE7",
    darkBg: "#064E3B",
    accent: "#22c55e",
    tags: ["UI/UX Design", "Strategy", "Sports Tech"],
    link: "/projects/anyma",
    github: "#",
  },
];

/** Listado canónico de proyectos con el copy del idioma activo. */
export const buildProjects = (t: Copy): Project[] =>
  PROJECT_ASSETS.map(({ copyKey, ...asset }, index) => ({
    ...asset,
    id: index + 1,
    title: t[copyKey].intro.title,
    description: t[copyKey].intro.contextDesc,
  }));

/**
 * Miniatura ligera para el menú móvil: la misma pieza a ~400px. El menú no
 * debe arrastrar los assets de 1200px del showcase; fuera de los CDNs con
 * transformaciones se devuelve la URL original.
 */
export const menuThumb = (src: string, width = 400): string => {
  if (src.includes("res.cloudinary.com")) {
    return src.replace("/image/upload/", `/image/upload/w_${width},q_auto,f_auto/`);
  }
  if (src.includes("images.unsplash.com")) {
    return src.replace(/([?&]w=)\d+/, `$1${width}`).replace(/([?&]h=)\d+/, `$1${width}`);
  }
  if (src.includes("cdn.prod.website-files.com")) {
    return `${src}${src.includes("?") ? "&" : "?"}width=${width}`;
  }
  return src;
};
