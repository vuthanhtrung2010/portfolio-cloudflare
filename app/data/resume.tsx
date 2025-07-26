import { Icons } from "~/components/Icons";
import { CodeIcon, HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Trung",
  initials: "DV",
  url: "https://trunghsgs.edu.vn",
  description: "A Junior Developer. Comes from Vietnam",
  summary:
    "I am a Junior Developer. I have learned over 6 programming languages with many skills like Docker, Databases, etc.",
  avatarUrl: "/assets/pfp.webp",
  skills: [
    "React",
    "Next.JS",
    "Typescript",
    "Node.JS",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "C++",
    "C",
    "Pascal",
  ],
  navbar: [
    { href: "/#hero", icon: HomeIcon, label: "Home" },
    { href: "/blogs", icon: NotebookIcon, label: "Blog" },
    { href: "/#projects", icon: CodeIcon, label: "Projects" },
    // { href: "#", icon: PencilLine, label: "Notes" },
  ],
  contact: {
    email: "vuthanhtrungsuper@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://links.trunghsgs.edu.vn/github",
        icon: Icons.github,

        navbar: true,
      },
      Discord: {
        name: "Discord",
        url: "https://links.trunghsgs.edu.vn/discord",
        icon: Icons.discord,

        navbar: true,
      },
    },
  },
  projects: [
    {
      title: "URL Shortener",
      href: "https://links.trunghsgs.edu.vn",
      dates: "Mar 2024 - Present",
      active: true,
      description:
        "An ultra fast URL Shortener using Prisma ORM with PostgreSQL database.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://links.trunghsgs.edu.vn",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/vuthanhtrung2010/url-shortener",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/assets/projects/URL-Shortener.webp",
      video: "",
    },
    {
      title: "Spotify Status",
      href: "https://spotify.trunghsgs.edu.vn",
      dates: "Feb 2024 - Present",
      active: true,
      description:
        "A simple Next.JS project show your Spotify Listening status.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "CSS",
        "Spotify API",
      ],
      links: [
        {
          type: "Website",
          href: "https://spotify.trunghsgs.edu.vn",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/vuthanhtrung2010/url-shortener",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/assets/projects/Spotify Status.webp",
      video: "",
    },
  ],
} as const;
