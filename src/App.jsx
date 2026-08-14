import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  Code2,
  Paintbrush,
  Zap,
  Smartphone,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  AMS — Frontend Development Studio                                  */
/*  Signature element: a browser mockup that "types" real code and     */
/*  then compiles it into a live rendered mini-site, looping forever.  */
/* ------------------------------------------------------------------ */

const CODE_LINES = [
  "<header class=\"nav\">",
  "  <a class=\"brand\">AMS</a>",
  "</header>",
  "",
  "<section class=\"hero\">",
  "  <h1>Built for the web.</h1>",
  "  <button>Get Started</button>",
  "</section>",
];

function TypingBrowser() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | compiled | pause
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      setPhase("compiled");
    }
  }, []);

  useEffect(() => {
    if (reducedMotion.current || phase !== "typing") return;

    const currentLine = CODE_LINES[lineIndex] ?? "";
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    if (lineIndex < CODE_LINES.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 90);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("compiled"), 500);
    return () => clearTimeout(t);
  }, [charIndex, lineIndex, phase]);

  useEffect(() => {
    if (reducedMotion.current || phase !== "compiled") return;
    const t = setTimeout(() => {
      setPhase("typing");
      setLineIndex(0);
      setCharIndex(0);
    }, 3200);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="ams-browser">
      <div className="ams-browser-bar">
        <span className="ams-dot ams-dot-r" />
        <span className="ams-dot ams-dot-y" />
        <span className="ams-dot ams-dot-g" />
        <span className="ams-browser-url">amsstudio.dev/preview</span>
      </div>

      <div className="ams-browser-body">
        <pre
          className={`ams-code ${phase === "compiled" ? "ams-code-fade" : ""}`}
        >
          {CODE_LINES.slice(0, lineIndex + 1).map((line, i) => (
            <div key={i} className="ams-code-line">
              {i === lineIndex ? line.slice(0, charIndex) : line}
              {i === lineIndex && phase === "typing" && (
                <span className="ams-caret" />
              )}
            </div>
          ))}
        </pre>

        <div
          className={`ams-preview ${
            phase === "compiled" ? "ams-preview-show" : ""
          }`}
        >
          <div className="ams-preview-nav">
            <span className="ams-preview-brand">AMS</span>
            <span className="ams-preview-link" />
            <span className="ams-preview-link" />
          </div>
          <div className="ams-preview-hero">
            <div className="ams-preview-h1" />
            <div className="ams-preview-h1 ams-preview-h1-short" />
            <div className="ams-preview-btn">Get Started</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    icon: Code2,
    tag: "STRUCTURE",
    title: "HTML Architecture",
    desc: "Semantic, accessible markup that gives every page a solid, well-organized foundation search engines and screen readers both understand.",
  },
  {
    icon: Paintbrush,
    tag: "DESIGN",
    title: "CSS Craft",
    desc: "Pixel-considered layouts, typography, and motion built with modern CSS — no bloated frameworks, just clean styles that load fast.",
  },
  {
    icon: Zap,
    tag: "BEHAVIOR",
    title: "JavaScript Interaction",
    desc: "Smooth, purposeful interactivity — from subtle micro-animations to full client-side logic — written to stay fast and maintainable.",
  },
  {
    icon: Smartphone,
    tag: "EVERY SCREEN",
    title: "Responsive Build",
    desc: "Every site we ship is tested from a 320px phone to an ultrawide monitor, so it looks intentional on whatever it's opened on.",
  },
];

const PROCESS = [
  { n: "01", title: "Discover", desc: "We learn your goals, your audience, and what the site needs to do." },
  { n: "02", title: "Design", desc: "Wireframes and a visual direction you approve before a line of code is written." },
  { n: "03", title: "Build", desc: "Hand-written HTML, CSS, and JavaScript — built for speed, not bloated with plugins." },
  { n: "04", title: "Launch", desc: "Tested across devices and browsers, then shipped with room to grow." },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ams-root">

      <div className="ams-bg-grid" />

      {/* Header */}
      <header className="ams-header">
        <div className="ams-wrap ams-header-inner">
          <a href="#top" className="ams-brand">
            AMS<span className="ams-brand-dot">.</span>
          </a>
          <nav className="ams-nav">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="ams-cta">
            Start a Project <ArrowRight size={15} />
          </a>
          <button
            className="ams-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`ams-wrap ams-mobile-nav ${menuOpen ? "ams-open" : ""}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </header>

      {/* Hero */}
      <section className="ams-hero" id="top">
        <div className="ams-wrap ams-hero-grid">
          <div>
            <span className="ams-eyebrow">FRONTEND DEVELOPMENT STUDIO</span>
            <h1 className="ams-h1">
              We build websites <em>line by line</em>, not template by template.
            </h1>
            <p className="ams-sub">
              AMS designs and hand-codes frontend websites with HTML, CSS, and
              JavaScript — fast, responsive, and built to look intentional on
              every screen.
            </p>
            <div className="ams-hero-actions">
              <a href="#contact" className="ams-cta">
                Start a Project <ArrowRight size={15} />
              </a>
              <a href="#services" className="ams-btn-ghost">
                See our services
              </a>
            </div>
            <div className="ams-stack-row">
              <span className="ams-stack-chip">HTML5</span>
              <span className="ams-stack-chip">CSS3</span>
              <span className="ams-stack-chip">JavaScript</span>
              <span className="ams-stack-chip">Responsive Design</span>
            </div>
          </div>
          <TypingBrowser />
        </div>
      </section>

      {/* Services */}
      <section className="ams-section" id="services">
        <div className="ams-wrap">
          <div className="ams-section-head">
            <div>
              <span className="ams-section-eyebrow">WHAT WE DO</span>
              <h2 className="ams-h2">Our Services</h2>
            </div>
            <p className="ams-section-note">
              Every project is coded by hand — no bloated builders, just clean,
              fast frontend work.
            </p>
          </div>
          <div className="ams-services-grid">
            {SERVICES.map(({ icon: Icon, tag, title, desc }) => (
              <div className="ams-service-card" key={title}>
                <div className="ams-service-icon">
                  <Icon size={19} />
                </div>
                <span className="ams-service-tag">{tag}</span>
                <h3 className="ams-service-title">{title}</h3>
                <p className="ams-service-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="ams-section" id="process" style={{ paddingTop: 0 }}>
        <div className="ams-wrap">
          <div className="ams-section-head">
            <div>
              <span className="ams-section-eyebrow">HOW WE WORK</span>
              <h2 className="ams-h2">A Straightforward Process</h2>
            </div>
            <p className="ams-section-note">
              Four steps, no surprises — you know what's happening at every
              stage.
            </p>
          </div>
          <div className="ams-process-list">
            {PROCESS.map((p) => (
              <div className="ams-process-item" key={p.n}>
                <span className="ams-process-n">{p.n}</span>
                <h3 className="ams-process-title">{p.title}</h3>
                <p className="ams-process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="ams-cta-band" id="contact">
        <div className="ams-wrap">
          <h2 className="ams-h2">Let's build your next website.</h2>
          <p className="ams-cta-band-sub">
            Tell us what you're building — we'll reply with next steps within
            one business day.
          </p>
          <a href="mailto:hello@amsstudio.dev" className="ams-cta">
            Get in Touch <ArrowRight size={15} />
          </a>
          <div className="ams-cta-list">
            <span><Check size={14} /> Hand-coded, no page builders</span>
            <span><Check size={14} /> Fully responsive</span>
            <span><Check size={14} /> Fast load times</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ams-footer">
        <div className="ams-wrap">
          <div className="ams-footer-grid">
            <div>
              <a href="#top" className="ams-brand">
                AMS<span className="ams-brand-dot">.</span>
              </a>
              <p className="ams-footer-brand-blurb">
                A frontend development studio building fast, responsive
                websites with HTML, CSS, and JavaScript.
              </p>
              <div className="ams-footer-social">
                <a href="#" aria-label="GitHub"><Github size={16} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
              </div>
            </div>

            <div className="ams-footer-col">
              <p className="ams-footer-col-title">SITEMAP</p>
              <ul>
                <li><a href="#top">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#process">Process</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="ams-footer-col">
              <p className="ams-footer-col-title">SERVICES</p>
              <ul>
                <li><a href="#services">HTML Architecture</a></li>
                <li><a href="#services">CSS Craft</a></li>
                <li><a href="#services">JavaScript Interaction</a></li>
                <li><a href="#services">Responsive Build</a></li>
              </ul>
            </div>

            <div className="ams-footer-col">
              <p className="ams-footer-col-title">CONTACT</p>
              <ul className="ams-footer-contact">
                <li><Mail size={15} /> hello@amsstudio.dev</li>
                <li><Phone size={15} /> +92 300 0000000</li>
                <li><MapPin size={15} /> Karachi, Pakistan</li>
              </ul>
            </div>
          </div>

          <div className="ams-footer-bottom">
            <span className="ams-footer-copy">
              © {new Date().getFullYear()} AMS. All rights reserved.
            </span>
            <span className="ams-footer-tag">
              Built with <b>HTML</b> · <b>CSS</b> · <b>JavaScript</b>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
