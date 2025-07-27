import { Icons } from "~/components/Icons";
import { CodeIcon, HomeIcon, NotebookIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export const DATA = {
  name: "Trung",
  initials: "DV",
  url: "https://trunghsgs.edu.vn",
  description: "A Junior Developer. Comes from Vietnam",
  summary:
    "I am a Junior Developer. I have learned over 6 programming languages with many skills like Docker, Databases, etc.",
  avatarUrl: "https://img.trunghsgs.edu.vn/pfp.webp",
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
      image: "https://img.trunghsgs.edu.vn/URL-Shortener.webp",
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
      image: "https://img.trunghsgs.edu.vn/Spotify-Status.webp",
      video: "",
    },
  ],
  education: [
    {
      school: "HUS High School for Gifted Students",
      href: "https://hsgs.edu.vn",
      degree: "Inforation Technology",
      logoUrl: "https://img.trunghsgs.edu.vn/HSGS-logo.png",
      start: "2025",
      end: "2028"
    },
    {
      school: "Khương Mai Secondary School",
      href: "https://thcskhuongmai.hanoi.edu.vn",
      degree: "Secondary School",
      logoUrl: "https://img.trunghsgs.edu.vn/THCS-KM-logo.png",
      start: "2021",
      end: "2025"
    }
  ],
  hackathons: [
    {
      title: "HSGS Hackathon 2025",
      dates: "July 16th - 18th, 2025",
      location: "HUS High School for Gifted Students, Hanoi, Vietnam",
      description:
        "Developed a web application to help students manage their study schedule and assignments around all school subjects.",
      image: "https://img.trunghsgs.edu.vn/HSGS-logo.png",
      links: [
        {
          icon: <Icons.globe className="h-4 w-4" />,
          title: "Website",
          href: "https://hackathon.trunghsgs.edu.vn",
        },
        {
          icon: <Icons.github className="h-4 w-4" />,
          title: "Frontend (Next.js)",
          href: "https://github.com/vuthanhtrung2010/hsgs-hackathon-2025"
        },
        {
          icon: <Icons.github className="h-4 w-4" />,
          title: "Frontend (React Router)",
          href: "https://github.com/vuthanhtrung2010/hsgs-hackathon-2025-react-router"
        },
        {
          icon: <Icons.github className="h-4 w-4" />,
          title: "Backend",
          href: "https://github.com/vuthanhtrung2010/hsgs-hackathon-2025-backend"
        }
      ]
    },
    {
      title: "CSP Hackathon 2024",
      dates: "September 5th, 2024",
      location: "HNUE High School for Gifted Students, Hanoi, Vietnam",
      description: "Do CP and earn money?",
      image: "https://img.trunghsgs.edu.vn/CSP-Hackathon-2024.jpg",
      links: [
        {
          title: "Fanpage",
          icon: <FontAwesomeIcon icon={faFacebook} className="h-4 w-4" />,
          href: "https://www.facebook.com/csp.hackathon",
        }
      ]
    }
  ],
} as const;
