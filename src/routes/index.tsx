import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, Mail, Linkedin, Github, MessageSquare } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import vishwaImg from "@/assets/vishwa.png";
import atmiaVideo from "@/assets/atmia-admin.mp4";
import justAbroadVideo from "@/assets/just-abroad.mp4";
import narsanVideo from "@/assets/narsan-arts.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishwa Gohil — Web Developer" },
      {
        name: "description",
        content:
          "Vishwa Gohil — web developer in Rajkot building expressive, performant apps with React, Next.js, Node.js & MongoDB.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  "React.js", "Next.js", "TypeScript", "JavaScript",
  "Node.js", "Nest.js", "MongoDB", "Prisma",
  "Tailwind CSS", "HTML / CSS", "Git & GitHub", "Framer Motion",
];

const ReactIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={`${className} text-[#61dafb]`} fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle r="2.05" fill="currentColor"/>
    <ellipse rx="11" ry="4.2"/>
    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
  </svg>
);

const NextIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 180 180" className={`${className} text-cream`} fill="none" stroke="currentColor">
    <circle cx="90" cy="90" r="85" fill="black" stroke="currentColor" strokeWidth="6"/>
    <path d="M128 140L76.5 68H66V112H76.5V82.5L120.5 140H128Z" fill="currentColor"/>
    <path d="M115 68H125V112H115V68Z" fill="currentColor"/>
  </svg>
);

const TSIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-[3px] overflow-hidden`} fill="#3178c6">
    <rect width="100" height="100"/>
    <text x="44" y="80" fill="white" fontSize="48" fontFamily="system-ui, sans-serif" fontWeight="bold">TS</text>
  </svg>
);

const JSIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-[3px] overflow-hidden`} fill="#f7df1e">
    <rect width="100" height="100"/>
    <text x="46" y="80" fill="black" fontSize="48" fontFamily="system-ui, sans-serif" fontWeight="bold">JS</text>
  </svg>
);

const NodeIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-[#689F63]`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7v10l10 5 10-5V7z"/>
    <path d="M12 22V12"/>
    <path d="M12 12L2 7"/>
    <path d="M12 12l10-5"/>
  </svg>
);

const NestIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-[#E0234E]`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 8.5v7L12 22l10-6.5v-7L12 2zm8 12.5l-8 5.2-8-5.2V9.7l8-5.2 8 5.2v4.8z"/>
  </svg>
);

const MongoIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-[#13aa52]`} fill="currentColor">
    <path d="M12 1.5C12 1.5 6.5 7 6.5 12.5C6.5 16.5 9.5 19.5 12 22.5C14.5 19.5 17.5 16.5 17.5 12.5C17.5 7 12 1.5 12 1.5ZM12 18.5C10.5 18.5 9 17 9 15C9 12.5 12 8.5 12 8.5C12 8.5 15 12.5 15 15C15 17 13.5 18.5 12 18.5Z"/>
  </svg>
);

const PrismaIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M12 2L2 18h10V2z" fill="#16a394" />
    <path d="M12 2v16h10L12 2z" fill="#2d3748" />
  </svg>
);

const TailwindIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-[#38bdf8]`} fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.002 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.002 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
  </svg>
);

const HTMLCSSIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-[#e34f26]`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 2h16l-2 16-6 4-6-4-2-16z"/>
    <path d="M12 6H8v4h8v4l-4 2-4-2v-1" stroke="#264de4"/>
  </svg>
);

const GitIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-cream`} fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const MotionIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-cream`} fill="currentColor">
    <path d="M0 0h12L6 6zM0 12h24l-6-6H6zM12 18H24l-6 6z" />
  </svg>
);

const SKILL_ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  "React.js": (props) => <ReactIcon {...props} />,
  "Next.js": (props) => <NextIcon {...props} />,
  "TypeScript": (props) => <TSIcon {...props} />,
  "JavaScript": (props) => <JSIcon {...props} />,
  "Node.js": (props) => <NodeIcon {...props} />,
  "Nest.js": (props) => <NestIcon {...props} />,
  "MongoDB": (props) => <MongoIcon {...props} />,
  "Prisma": (props) => <PrismaIcon {...props} />,
  "Tailwind CSS": (props) => <TailwindIcon {...props} />,
  "HTML / CSS": (props) => <HTMLCSSIcon {...props} />,
  "Git & GitHub": (props) => <GitIcon {...props} />,
  "Framer Motion": (props) => <MotionIcon {...props} />,
};

const FLOATING_ICONS = [
  { render: (className: string) => <ReactIcon className={className} />, top: "12%", left: "10%", sizeClass: "w-16 h-16", opacity: 0.18, duration: 10 },
  { render: (className: string) => <NextIcon className={className} />, top: "75%", left: "5%", sizeClass: "w-20 h-20", opacity: 0.15, duration: 14 },
  { render: (className: string) => <TSIcon className={className} />, top: "20%", left: "82%", sizeClass: "w-16 h-16", opacity: 0.18, duration: 11 },
  { render: (className: string) => <NodeIcon className={className} />, top: "80%", left: "78%", sizeClass: "w-16 h-16", opacity: 0.18, duration: 12 },
  { render: (className: string) => <MongoIcon className={className} />, top: "10%", left: "52%", sizeClass: "w-14 h-14", opacity: 0.16, duration: 11 },
  { render: (className: string) => <TailwindIcon className={className} />, top: "48%", left: "86%", sizeClass: "w-16 h-16", opacity: 0.20, duration: 12 },
  { render: (className: string) => <PrismaIcon className={className} />, top: "82%", left: "42%", sizeClass: "w-14 h-14", opacity: 0.15, duration: 14 },
  { render: (className: string) => <NestIcon className={className} />, top: "42%", left: "8%", sizeClass: "w-14 h-14", opacity: 0.16, duration: 10 },
];

const PROJECTS = [
  {
    n: "01",
    title: "AtmiaAdmin",
    tag: "Educational ERP",
    blurb:
      "Responsive ERP for managing courses, exams, schedules & question banks with adaptive difficulty logic.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    link: "https://github.com/Vishwa112003/AtmiaAdmin",
    video: atmiaVideo,
  },
  {
    n: "02",
    title: "JustAbroad",
    tag: "Adaptive Exam Prep",
    blurb:
      "Full-stack platform for IELTS, GRE, PTE & NEET with a full-screen mock test engine and analytics.",
    stack: ["Next.js", "Prisma", "SQLite", "Zustand"],
    link: "https://github.com/Vishwa112003/JustAbroad",
    video: justAbroadVideo,
  },
  {
    n: "03",
    title: "Narsan Arts",
    tag: "Studio Portfolio",
    blurb:
      "Premium creative-studio site with 3D parallax, motion-driven components & custom SVG visuals.",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    link: "https://github.com/Vishwa112003/NarsanArts",
    video: narsanVideo,
  },
];

function Cursor() {
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.4 });
  const xb = useSpring(useMotionValue(-100), { stiffness: 90, damping: 18, mass: 0.6 });
  const yb = useSpring(useMotionValue(-100), { stiffness: 90, damping: 18, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      xb.set(e.clientX); yb.set(e.clientY);
      const el = e.target as HTMLElement;
      setHover(!!el?.closest("a, button, [data-hov]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, xb, yb]);

  useEffect(() => {
    const checkLightbox = () => {
      setLightboxOpen(document.body.classList.contains("lightbox-open"));
    };
    checkLightbox();
    const observer = new MutationObserver(checkLightbox);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (lightboxOpen) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: hover ? 1.8 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="h-2.5 w-2.5 rounded-full bg-white"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99]"
        style={{ x: xb, y: yb, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: hover ? 2.2 : 1, opacity: hover ? 0.4 : 0.7 }}
          className="h-9 w-9 rounded-full border border-ink/40"
        />
      </motion.div>
    </>
  );
}

function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "home";
      for (const s of NAV) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#home" className="font-display text-2xl font-black tracking-tight">
          V<span className="text-coral">.</span>G
        </a>
        <nav
          className={`hidden md:flex items-center gap-1 rounded-full border border-ink/15 bg-cream/70 px-2 py-1.5 backdrop-blur-md transition-shadow ${
            scrolled ? "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]" : ""
          }`}
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="relative px-4 py-2 text-sm font-medium"
            >
              {active === n.id && (
                <motion.span
                  layoutId="navpill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${active === n.id ? "text-cream" : "text-ink"}`}>
                {n.label}
              </span>
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream hover:bg-ink/90 transition"
        >
          Hire me! →
        </a>
      </div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotImg = useTransform(scrollYProgress, [0, 1], [-3, 6]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 120, damping: 18 });
  const [avatarHover, setAvatarHover] = useState(false);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-32 pb-12"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      {/* big background word */}
      <motion.div
        aria-hidden
        style={{ y: yTitle }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 top-24 text-center font-display font-black uppercase leading-none text-ink/[0.05]"
      >
        <div className="text-[22vw]">Vishwa</div>
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-cream/60 px-4 py-1.5 text-xs font-medium backdrop-blur"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Available for freelance · Rajkot, IN
          </motion.div>

          <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[8.5vw] font-black leading-[0.85] tracking-[-0.04em] overflow-hidden">
            {"Full".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block italic font-medium"
            >
              stack
            </motion.span>{" "}
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block"
            >
              dev
              <motion.svg
                viewBox="0 0 300 30"
                className="absolute -bottom-2 left-0 w-full"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.1, duration: 1.2 }}
              >
                <motion.path
                  d="M5 20 Q 150 0 295 18"
                  fill="none"
                  stroke="oklch(0.88 0.22 122)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </motion.svg>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 max-w-xl text-lg text-muted-foreground"
          >
            Hi, I'm <strong className="text-ink">Vishwa Gohil</strong> — I design and engineer
            web products that feel as good as they perform. Currently building learning platforms
            & dashboards at Atmia Education and Just Abroad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="/Vishwa_Gohil_Resume.pdf"
              download="Vishwa_Gohil_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream"
            >
              Download CV
              <span className="grid h-6 w-6 place-items-center rounded-full bg-acid text-ink transition group-hover:rotate-45">
                <Download size={14} strokeWidth={2.5} />
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3.5 text-sm font-medium hover:bg-ink hover:text-cream transition"
            >
              Get in touch
            </motion.a>
          </motion.div>
        </div>

        {/* image */}
        <motion.div
          style={{ y: yImg, rotate: rotImg }}
          className="lg:col-span-5 relative"
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 800 }}
            className="relative mx-auto w-full max-w-md"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            {/* acid blob */}
            <motion.div
              aria-hidden
              animate={{ borderRadius: ["42% 58% 70% 30% / 45% 30% 70% 55%", "58% 42% 30% 70% / 55% 70% 30% 45%", "42% 58% 70% 30% / 45% 30% 70% 55%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -m-6 bg-acid"
            />
            {/* coral square */}
            <motion.div
              aria-hidden
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -right-6 -top-6 h-24 w-24 border-[3px] border-ink"
            />
            {/* ticker badge */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -left-10 bottom-10 hidden sm:block"
            >
              <svg viewBox="0 0 200 200" className="h-32 w-32">
                <defs>
                  <path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                </defs>
                <text fill="oklch(0.14 0.02 60)" fontSize="14" fontFamily="JetBrains Mono" letterSpacing="3">
                  <textPath href="#circ">★ AVAILABLE · 2026 · LET'S BUILD · OPEN TO WORK · </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Comment/Speech Bubble Popup */}
            <AnimatePresence>
              {avatarHover && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 15, x: "-50%" }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, scale: 0.85, y: 15, x: "-50%" }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  style={{ left: "50%" }}
                  className="absolute -top-20 z-30 w-72 md:w-80 bg-ink text-cream px-5 py-3 rounded-2xl border border-acid/30 shadow-2xl text-center text-sm font-medium tracking-wide pointer-events-none select-none"
                >
                  <span className="relative z-10 block">
                    Hey! I'm Vishwa, let's create something amazing ✦
                  </span>
                  {/* Arrow tail */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-ink border-r border-b border-acid/30 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src={vishwaImg}
              alt="Illustrated portrait of Vishwa Gohil"
              className="relative z-10 w-full select-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          ↓ scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

function Ticker() {
  const words = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind", "Framer Motion", "Prisma"];
  const row = [...words, ...words];
  return (
    <div className="border-y border-ink/15 bg-ink text-cream overflow-hidden py-6">
      <div className="flex ticker-track whitespace-nowrap font-display text-5xl md:text-7xl font-black uppercase">
        {row.map((w, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            {w}
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
        {/* LEFT: sticky intro */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <SectionLabel n="01" label="About" />
          <RevealText className="mt-8 font-display text-4xl md:text-5xl font-medium leading-[1.05] tracking-[-0.02em]">
            I build <em className="text-coral">user-focused</em> web apps that balance craft with clarity.
          </RevealText>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-md">
            Full-stack developer from Rajkot, turning dense product ideas into interfaces people
            actually enjoy using. Specialized in crafting high-performance, <strong className="text-ink font-semibold">SEO-friendly</strong> websites.
            Using <strong className="text-ink font-medium">React</strong>, <strong className="text-ink font-medium">Next.js</strong>, <strong className="text-ink font-medium">Node.js</strong> & <strong className="text-ink font-medium">MongoDB</strong> — end to end.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            <Stat n="&nbsp;1.8+" l="yrs shipping" />
            <Stat n="&nbsp; &nbsp; 6+" l="live products" />
            <Stat n="&nbsp; &nbsp;∞" l="cups of chai" />
          </div>
        </div>

        {/* RIGHT: timeline */}
        <div className="lg:col-span-7">
          <TimelineGroup
            title="Experience"
            items={[
              {
                date: "May 2025 — Present",
                role: "Full Stack Web Developer",
                place: "Atmia Education & Just Abroad",
                body: "Building responsive React & Next.js interfaces, Node/Nest + MongoDB backends — shipping educational portals, dashboards and business sites end-to-end.",
                tags: ["Next.js", "Nest.js", "MongoDB"],
                current: true,
              },
              {
                date: "May 2024 — Oct 2024",
                role: "Web Developer",
                place: "Asquare Tech Lab LLP",
                body: "Built interactive React apps, integrated REST APIs and cut load times 40% through reusable components, hooks and performance-first CSS.",
                tags: ["React", "REST APIs", "CSS"],
              },
            ]}
          />

          <TimelineGroup
            title="Education"
            className="mt-16"
            items={[
              {
                date: "2024 — 2026",
                role: "M.Sc. Information Technology",
                place: "Saurashtra University, Rajkot",
                body: "Advanced coursework in software engineering, data systems and modern web architectures.",
                tags: ["Ongoing"],
                current: true,
              },
              {
                date: "2021 — 2024",
                role: "Bachelor of Computer Application",
                place: "Saurashtra University, Rajkot",
                body: "Graduated with CGPA 7.76. Foundations in programming, databases and full-stack web development.",
                tags: ["CGPA 7.76"],
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-black text-ink leading-none">{n}</div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
    </div>
  );
}

type TLItem = {
  date: string; role: string; place: string; body: string;
  tags?: string[]; current?: boolean;
};

function TimelineGroup({
  title, items, className = "",
}: { title: string; items: TLItem[]; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className="h-px flex-1 bg-ink/15" />
      </div>
      <div className="relative pl-6 md:pl-8">
        {/* vertical rail */}
        <span aria-hidden className="absolute left-1.5 md:left-2 top-2 bottom-2 w-px bg-ink/15" />
        <div className="space-y-6">
          {items.map((it, i) => (
            <TimelineItem key={i} item={it} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item, index }: { item: TLItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative"
      data-hov
    >
      {/* node */}
      <span
        aria-hidden
        className={`absolute -left-[22px] md:-left-[26px] top-5 h-3 w-3 rounded-full ring-4 ring-background ${
          item.current ? "bg-acid animate-pulse" : "bg-ink"
        }`}
      />
      <div className="group rounded-2xl border border-ink/15 bg-card p-6 transition hover:border-ink hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.3)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {item.date}
          </div>
          {item.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/40 bg-acid/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-acid" />
              Now
            </span>
          )}
        </div>
        <div className="mt-3 font-display text-2xl font-bold leading-tight">{item.role}</div>
        <div className="text-coral font-medium">{item.place}</div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/15 bg-background/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section id="skills" ref={ref} className="relative bg-ink text-cream px-6 py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ rotate: rot }}
        className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-acid/20 blur-3xl"
      />

      {/* Floating Background Icons */}
      {FLOATING_ICONS.map((item, idx) => (
        <motion.div
          key={idx}
          className="absolute pointer-events-none select-none"
          style={{
            top: item.top,
            left: item.left,
            opacity: item.opacity,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 20, 0],
            rotate: [0, 12, -12, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.render(item.sizeClass)}
        </motion.div>
      ))}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel n="02" label="Skills" dark />
          <RevealText className="mt-6 font-display text-4xl md:text-5xl font-medium leading-tight">
            Tools I reach for, daily.
          </RevealText>
        </div>
        <div className="lg:col-span-8">
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: (i % 2 ? 1.5 : -1.5) }}
                whileHover={{ scale: 1.05, rotate: 0, backgroundColor: "oklch(0.88 0.22 122)", color: "oklch(0.14 0.02 60)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 260, damping: 18 }}
                className="cursor-none rounded-full border border-cream/30 px-5 py-2.5 text-base font-medium flex items-center gap-2.5 bg-ink/40 backdrop-blur-sm group"
                data-hov
              >
                {SKILL_ICONS[s] && (
                  <span className="flex-shrink-0 transition-transform group-hover:scale-110">
                    {SKILL_ICONS[s]({})}
                  </span>
                )}
                {s}
              </motion.span>
            ))}
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { t: "Frontend", b: "Pixel-perfect, accessible, motion-rich interfaces." },
              { t: "Backend", b: "REST APIs, auth, data modeling with Node & Mongo." },
              { t: "Craft", b: "Performance, DX and reusable component systems." },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, borderColor: "oklch(0.88 0.22 122)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.35, ease: "easeOut" }}
                className="rounded-2xl border border-cream/15 p-6 bg-cream/[0.02] transition-colors hover:bg-cream/[0.05]"
              >
                <div className="font-display text-2xl font-bold text-acid">{c.t}</div>
                <p className="mt-2 text-sm text-cream/70">{c.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel n="03" label="Projects" />
            <h2 className="mt-6 font-display text-5xl md:text-7xl font-black leading-none tracking-[-0.03em]">
              Selected <em className="font-medium">work</em>.
            </h2>
          </div>
          <a
            href="https://github.com/Vishwa112003"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-coral"
          >
            All on GitHub ↗
          </a>
        </div>
        <div className="mt-16 divide-y divide-ink/15 border-y border-ink/15">
          {PROJECTS.map((p) => (
            <ProjectRow key={p.n} {...p} onPlay={() => p.video && setActive(p.video)} />
          ))}
        </div>
      </div>
      <VideoLightbox src={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectRow(p: (typeof PROJECTS)[number] & { onPlay: () => void }) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let playTimeout: any;

    if (hover) {
      // Debounce video playing by 200ms to avoid loading on accidental/quick hover passes
      playTimeout = setTimeout(() => {
        v.play().catch(() => {});
      }, 200);
    } else {
      v.pause();
      v.currentTime = 0;
    }

    return () => clearTimeout(playTimeout);
  }, [hover]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative"
    >
      <motion.div
        aria-hidden
        initial={false}
        animate={{ scaleY: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 1 }}
        className="absolute inset-0 -z-10 bg-ink"
      />
      <div data-hov className="relative grid grid-cols-12 items-center gap-4 py-8">
        <a href={p.link} target="_blank" rel="noreferrer" className={`col-span-2 md:col-span-1 font-mono text-sm transition-colors ${hover ? "text-acid" : "text-muted-foreground"}`}>
          {p.n}
        </a>
        <a href={p.link} target="_blank" rel="noreferrer" className={`col-span-10 md:col-span-5 font-display text-3xl md:text-5xl font-black tracking-[-0.02em] transition-colors ${hover ? "text-cream italic" : "text-ink"}`}>
          {p.title}
        </a>
        <div className={`col-span-12 md:col-span-3 text-sm transition-colors ${hover ? "text-cream/80" : "text-muted-foreground"}`}>
          {p.blurb}
        </div>
        <div className={`col-span-10 md:col-span-2 flex flex-wrap gap-1.5 text-[10px] font-mono uppercase tracking-wider ${hover ? "text-cream/80" : "text-muted-foreground"}`}>
          {p.stack.map((s) => (
            <span key={s} className={`rounded-full px-2 py-0.5 border ${hover ? "border-cream/30" : "border-ink/20"}`}>
              {s}
            </span>
          ))}
        </div>
        <a href={p.link} target="_blank" rel="noreferrer" className={`col-span-2 md:col-span-1 text-right font-display text-3xl transition-transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5 ${hover ? "text-acid" : "text-ink"}`}>
          ↗
        </a>
      </div>

      {/* Inline expanding preview panel */}
      <AnimatePresence initial={false}>
        {hover && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-4 pb-10">
              <div className="col-span-12 md:col-span-3" />
              <div className="col-span-12 md:col-span-6">
                {p.video ? (
                  <div className="relative overflow-hidden rounded-2xl border border-acid/30 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                    <video
                      ref={videoRef}
                      src={p.video}
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="aspect-video w-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-5 md:p-8">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-cream/80">
                        Preview — {p.tag}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); p.onPlay(); }}
                        data-hov
                        aria-label={`Play ${p.title} video`}
                        className="inline-flex items-center gap-3 rounded-full bg-acid px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink shadow-xl transition-transform hover:scale-[1.04]"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-acid">
                          <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-current"><path d="M8 5v14l11-7z"/></svg>
                        </span>
                        Play full video
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-cream/20 bg-ink/60 px-6 py-8">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-acid">{p.tag}</div>
                      <div className="mt-1 font-display text-xl text-cream">Video coming soon</div>
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      data-hov
                      className="rounded-full border border-cream/30 px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream hover:bg-cream hover:text-ink transition-colors"
                    >
                      View on GitHub ↗
                    </a>
                  </div>
                )}
              </div>
              <div className="col-span-12 md:col-span-3" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


function VideoLightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 backdrop-blur-xl px-4 py-10"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-acid/30 bg-black shadow-[0_50px_120px_-20px_rgba(0,0,0,0.8)]"
          >
            <button
              onClick={onClose}
              data-hov
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-acid font-mono text-lg text-ink transition-transform hover:scale-110"
            >
              ✕
            </button>
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative bg-cream px-6 py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionLabel n="04" label="Contact" />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 font-display text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-[-0.04em]"
        >
          Let's make <br />
          <a
            href="mailto:vishwabagohil@gmail.com"
            className="italic font-medium underline decoration-acid decoration-[14px] underline-offset-[18px] hover:text-coral transition"
            data-hov
          >
            something
          </a>{" "}
          <br /> good together.
        </motion.h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <ContactCard index={0} label="Email" value="vishwabagohil@gmail.com" href="mailto:vishwabagohil@gmail.com" />
          <ContactCard index={1} label="LinkedIn" value="vishwa-gohil-991a49315" href="https://www.linkedin.com/in/vishwa-gohil-991a49315/" />
          <ContactCard index={2} label="Location" value="Rajkot, Gujarat — IN" />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ index, label, value, href }: { index: number; label: string; value: string; href?: string }) {
  const Comp: any = href ? "a" : "div";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Comp
        href={href}
        data-hov
        className="block rounded-3xl border border-ink/20 bg-card p-8 hover:bg-ink hover:text-cream transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)]"
      >
        <div className="font-mono text-xs uppercase tracking-widest opacity-60">{label}</div>
        <div className="mt-3 font-display text-2xl font-bold break-all">{value}</div>
      </Comp>
    </motion.div>
  );
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-ink text-cream px-6 py-16"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-3xl font-black">Vishwa Gohil</div>
          <p className="mt-2 text-cream/60 text-sm max-w-xs">
            Full-stack web developer crafting expressive interfaces & solid backends.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-cream/50">Elsewhere</div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Email", h: "mailto:vishwabagohil@gmail.com", I: Mail },
              { l: "LinkedIn", h: "https://www.linkedin.com/in/vishwa-gohil-991a49315/", I: Linkedin },
              { l: "GitHub", h: "https://github.com/Vishwa112003", I: Github },
              { l: "Contact", h: "https://wa.me/919662512340?text=Hi%20Vishwa%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect%21", I: MessageSquare },
            ].map((x) => (
              <a
                key={x.l}
                href={x.h}
                target={x.h.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-hov
                className="group flex flex-col items-center gap-2 rounded-2xl border border-cream/15 bg-cream/5 px-4 py-4 text-center transition hover:border-acid/60 hover:bg-acid/10 hover:text-acid"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 bg-ink transition group-hover:border-acid/40 group-hover:scale-110">
                  <x.I className="h-5 w-5 text-cream/80 transition group-hover:text-acid" />
                </span>
                <span className="text-xs font-medium tracking-wide">{x.l}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="md:text-right">
          <div className="font-mono text-xs uppercase tracking-widest text-cream/50">Now</div>
          <div className="mt-3 text-sm text-cream/80">
            Designing & shipping at <span className="text-acid">Atmia Education</span> & Just Abroad.
          </div>
          <div className="mt-6 font-mono text-xs text-cream/40">
            © {new Date().getFullYear()} — Built with care, in Rajkot.
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

function SectionLabel({ n, label, dark }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] ${dark ? "text-cream/60" : "text-muted-foreground"}`}>
      <span className={`grid h-6 w-6 place-items-center rounded-full ${dark ? "border border-cream/30" : "border border-ink/30"}`}>
        {n}
      </span>
      {label}
    </div>
  );
}

function RevealText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      style={{ scaleX: sx, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-acid"
    />
  );
}

function Loader({ onComplete }: { onComplete: () => void }) {
  const [displayText, setDisplayText] = useState("");
  const name = "VISHWA GOHIL";
  const chars = "XYZ01$&#@?%*+=-";

  useEffect(() => {
    let frame = 0;
    const maxFrames = 25;
    const interval = setInterval(() => {
      setDisplayText(() => {
        return name.split("").map((char, index) => {
          if (char === " ") return " ";
          const threshold = (maxFrames / name.length) * index;
          if (frame >= threshold + 3) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
      });
      frame++;
      if (frame >= maxFrames + 8) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-0 z-[160] flex flex-col items-center justify-center pointer-events-none select-none text-cream"
    >
      <div className="flex flex-col items-center">
        {/* Scrambled Name */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider text-cream text-center px-4">
          {displayText}
        </h1>

        {/* Animated line underneath */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "160px" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-[2px] bg-acid mt-4 rounded-full"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/50 mt-6 text-center"
        >
          Full Stack Web Developer
        </motion.p>
      </div>
    </motion.div>
  );
}

function LoaderCurtains() {
  const panels = [0, 1, 2, 3, 4];
  return (
    <>
      {/* Neon Curtain Grid */}
      <div className="fixed inset-0 z-[140] flex pointer-events-none">
        {panels.map((i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.05 * i + 0.06,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ originY: 0 }}
            className="h-full flex-1 bg-acid"
          />
        ))}
      </div>

      {/* Dark Curtain Grid */}
      <div className="fixed inset-0 z-[150] flex pointer-events-none">
        {panels.map((i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.05 * i,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ originY: 0 }}
            className="h-full flex-1 bg-ink"
          />
        ))}
      </div>
    </>
  );
}

function Portfolio() {
  const [touch, setTouch] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  return (
    <main className={touch ? "[&_*]:!cursor-auto" : ""}>
      <AnimatePresence>
        {!loaderComplete && (
          <Loader onComplete={() => setLoaderComplete(true)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!loaderComplete && <LoaderCurtains />}
      </AnimatePresence>

      {loaderComplete && (
        <>
          {!touch && <Cursor />}
          <ScrollProgress />
          <Nav />
          <Hero />
          <Ticker />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
