// Ankush Banik — Retro Web-OS Portfolio (PostHog-inspired)
// Drop-in React component. For Next.js: put this in app/page.jsx with "use client"; at the top.
// Self-contained — needs only Tailwind + lucide-react.
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Folder, FileText, TerminalSquare, Briefcase, User, X, Minus, Sparkles,
  Trophy, Award, GitPullRequest, Cpu, ChevronRight,
  Mail, Phone, MapPin, Download, Search, HelpCircle, MessageCircle, Mic,
  ScanLine, ShoppingCart, ArrowUpRight, Copy,
} from "lucide-react";

const Github = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8 1.6 1 1.9.1.8.5 1.3.9 1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);
const Linkedin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const Twitter = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.24 2.25h3.31l-7.23 8.26L22.5 21.75h-6.66l-5.22-6.82-5.97 6.82H1.34l7.73-8.84L1.5 2.25h6.83l4.71 6.23 5.2-6.23zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64z" />
  </svg>
);

/* ----------------------------- Design tokens ----------------------------- */
const ORANGE = "#FF5C01";
const TAN = "#E6DDC6";

const PROFILE = {
  name: "Ankush Banik",
  role: "Full-Stack Software Engineer",
  location: "Bengaluru, India",
  email: "ankushbanik263@gmail.com",
  phone: "+91 8637838923",
  github: "https://github.com/Ankush263",
  linkedin: "https://www.linkedin.com/in/ankush-banik-b61bb6214/",
  twitter: "https://x.com/AnkushBanik8",
};

/* paper-grain texture as a data URI (built in JS to avoid encoding headaches) */
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.10'/></svg>`
)}")`;

/* --------------------------- Illustrated icons ---------------------------- */
/* Flat, bold-outlined desktop icons in the PostHog spirit (original art). */
const SW = 2.4;
function IcAbout() {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44">
      <rect x="5" y="6" width="30" height="28" rx="3" fill="#fff" stroke="#000" strokeWidth={SW} />
      <rect x="5" y="6" width="30" height="9" rx="3" fill={ORANGE} stroke="#000" strokeWidth={SW} />
      <circle cx="14" cy="23" r="4.2" fill="#FFD9A8" stroke="#000" strokeWidth="2" />
      <line x1="22" y1="21" x2="31" y2="21" stroke="#000" strokeWidth="2" />
      <line x1="22" y1="26" x2="31" y2="26" stroke="#000" strokeWidth="2" />
      <line x1="9" y1="31" x2="31" y2="31" stroke="#000" strokeWidth="2" />
    </svg>
  );
}
function IcResume() {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44">
      <rect x="9" y="4" width="22" height="32" rx="2" fill="#fff" stroke="#000" strokeWidth={SW} />
      <line x1="13" y1="11" x2="27" y2="11" stroke="#000" strokeWidth="2" />
      <line x1="13" y1="16" x2="27" y2="16" stroke="#000" strokeWidth="2" />
      <line x1="13" y1="21" x2="22" y2="21" stroke="#000" strokeWidth="2" />
      <rect x="5" y="24" width="20" height="11" rx="2" fill="#E0352B" stroke="#000" strokeWidth={SW} />
      <text x="15" y="32.5" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#fff">PDF</text>
    </svg>
  );
}
function IcProjects() {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44">
      <path d="M5 13 h9 l3 3 h16 v18 a2 2 0 0 1 -2 2 H7 a2 2 0 0 1 -2 -2 z" fill="#000" />
      <path d="M5 16 h30 v18 a2 2 0 0 1 -2 2 H7 a2 2 0 0 1 -2 -2 z" fill={ORANGE} stroke="#000" strokeWidth={SW} />
      <path d="M8 20 h24 v14 H8 z" fill="#FFE0CC" stroke="#000" strokeWidth="2" />
    </svg>
  );
}
function IcExperience() {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44">
      <rect x="14" y="7" width="12" height="7" rx="2" fill="none" stroke="#000" strokeWidth={SW} />
      <rect x="5" y="13" width="30" height="21" rx="3" fill="#C98A5E" stroke="#000" strokeWidth={SW} />
      <rect x="4" y="20" width="32" height="5" fill="#000" />
      <rect x="17" y="19" width="6" height="7" rx="1" fill={ORANGE} stroke="#000" strokeWidth="2" />
    </svg>
  );
}
function IcFeatures() {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44">
      <rect x="5" y="5" width="13" height="13" rx="3" fill={ORANGE} stroke="#000" strokeWidth={SW} />
      <rect x="22" y="5" width="13" height="13" rx="3" fill="#3DA35D" stroke="#000" strokeWidth={SW} />
      <rect x="5" y="22" width="13" height="13" rx="3" fill="#3B82C4" stroke="#000" strokeWidth={SW} />
      <rect x="22" y="22" width="13" height="13" rx="3" fill="#111" stroke="#000" strokeWidth={SW} />
    </svg>
  );
}
function IcTerminal() {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44">
      <rect x="4" y="7" width="32" height="23" rx="3" fill="#111" stroke="#000" strokeWidth={SW} />
      <rect x="16" y="30" width="8" height="4" fill="#000" />
      <rect x="11" y="33" width="18" height="3" rx="1.5" fill="#000" />
      <path d="M10 14 l5 4 l-5 4" fill="none" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="23" x2="27" y2="23" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
function IcContact() {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44">
      <rect x="5" y="9" width="30" height="23" rx="3" fill="#fff" stroke="#000" strokeWidth={SW} />
      <path d="M6 11 L20 23 L34 11" fill="none" stroke="#000" strokeWidth={SW} strokeLinejoin="round" />
      <circle cx="31" cy="11" r="5" fill={ORANGE} stroke="#000" strokeWidth="2" />
    </svg>
  );
}

/* ------------------------------ Pixel avatar ----------------------------- */
const AVATAR = [
  "..............","....KKKKKK....","...KOOOOOOK...","..KOOOOOOOOK..",
  "..KOOOOOOOOK..","..KKKKKKKKKK..","..KSSSSSSSSK..","..KSKWSSWKSK..",
  "..KSSSSSSSSK..","..KSSKKKKSSK..","..KSSSSSSSSK..","...KSSSSSSK...",
  "....KKKKKK....","..............",
];
const PAL = { K: "#000", O: ORANGE, S: "#F1C9A0", W: "#fff" };
function PixelAvatar({ size = 96 }) {
  const cell = 9, rects = [];
  AVATAR.forEach((row, y) => row.split("").forEach((c, x) => {
    if (PAL[c]) rects.push(<rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill={PAL[c]} />);
  }));
  return <svg width={size} height={size} viewBox={`0 0 ${14 * cell} ${14 * cell}`} style={{ shapeRendering: "crispEdges" }}>{rects}</svg>;
}

/* --------------------------- Isometric wallpaper -------------------------- */
const top = (x, y, w, h) => `${x},${y} ${x + w},${y + h} ${x},${y + 2 * h} ${x - w},${y + h}`;
const left = (x, y, w, h, d) => `${x - w},${y + h} ${x},${y + 2 * h} ${x},${y + 2 * h + d} ${x - w},${y + h + d}`;
const right = (x, y, w, h, d) => `${x},${y + 2 * h} ${x + w},${y + h} ${x + w},${y + h + d} ${x},${y + 2 * h + d}`;
function Cube({ x, y, w = 52, h = 26, d = 34, t, l, r, label, labelFill = "#3b4a1e" }) {
  return (
    <g stroke="#1c1c1c" strokeWidth="2.5" strokeLinejoin="round">
      <polygon points={left(x, y, w, h, d)} fill={l} />
      <polygon points={right(x, y, w, h, d)} fill={r} />
      <polygon points={top(x, y, w, h)} fill={t} />
      {label && (
        <text x={x} y={y + h + 7} textAnchor="middle" stroke="none"
          fontFamily="'Bricolage Grotesque',sans-serif" fontWeight="800" fontSize="26" fill={labelFill}>{label}</text>
      )}
    </g>
  );
}
function IsoScene() {
  return (
    <svg viewBox="0 0 420 340" className="iso" width="100%" height="100%">
      {/* dirt base */}
      <Cube x={210} y={150} w={62} h={31} d={40} t="#8a6a44" l="#5f4830" r="#735338" />
      {/* grass cubes spelling A B */}
      <Cube x={150} y={70} t="#9CB04A" l="#65812F" r="#7E9A3C" label="A" />
      <Cube x={262} y={78} t="#A7BC55" l="#6E8B35" r="#88A444" label="B" />
      <Cube x={208} y={36} t="#B6C865" l="#7B963E" r="#94AE4C" label="•" labelFill="#FF5C01" />
      {/* little orange plants on the front dirt */}
      {[[180, 232], [200, 244], [222, 240], [240, 250]].map(([px, py], i) => (
        <g key={i} stroke="#1c1c1c" strokeWidth="2" strokeLinecap="round">
          <line x1={px} y1={py} x2={px} y2={py - 12} stroke="#3DA35D" />
          <circle cx={px} cy={py - 14} r="4" fill={ORANGE} />
        </g>
      ))}
      {/* flag on top cube */}
      <g stroke="#1c1c1c" strokeWidth="2.5" strokeLinejoin="round">
        <line x1="208" y1="36" x2="208" y2="8" />
        <polygon points="208,9 232,15 208,21" fill={ORANGE} />
      </g>
    </svg>
  );
}

/* -------------------------- Code snippet renderer ------------------------- */
function CodeLine({ line }) {
  const m = line.match(/(.*?)(\/\/.*|#.*)$/);
  return m
    ? <div><span>{m[1]}</span><span style={{ color: "#7a7a7a" }}>{m[2]}</span></div>
    : <div>{line || "\u00A0"}</div>;
}
function CodePreview({ lang, lines }) {
  return (
    <div style={{ border: "2px solid #000", background: "#111", marginTop: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", borderBottom: "2px solid #000", background: "#000" }}>
        <span style={{ width: 10, height: 10, background: ORANGE, borderRadius: 99 }} />
        <span style={{ width: 10, height: 10, background: "#555", borderRadius: 99 }} />
        <span style={{ width: 10, height: 10, background: "#555", borderRadius: 99 }} />
        <span className="mono" style={{ color: "#888", fontSize: 11, marginLeft: 4 }}>{lang}</span>
      </div>
      <pre className="mono" style={{ margin: 0, padding: "10px 12px", color: "#e6e6e6", fontSize: 12, lineHeight: 1.55, overflowX: "auto", whiteSpace: "pre" }}>
        {lines.map((l, i) => <CodeLine key={i} line={l} />)}
      </pre>
    </div>
  );
}

/* ------------------------------ Window bodies ----------------------------- */
function AboutBody() {
  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ border: "3px solid #000", boxShadow: `5px 5px 0 ${ORANGE}`, background: "#fff", padding: 4, flexShrink: 0 }}>
          <PixelAvatar size={92} />
        </div>
        <div style={{ minWidth: 180, flex: 1 }}>
          <h1 className="display" style={{ fontSize: 26, lineHeight: 1, margin: 0 }}>{PROFILE.name}</h1>
          <div className="mono" style={{ display: "inline-block", marginTop: 8, background: ORANGE, color: "#fff", padding: "3px 8px", border: "2px solid #000", fontSize: 12, fontWeight: 700 }}>{PROFILE.role}</div>
        </div>
      </div>
      <p style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.65 }}>
        Full-Stack Software Engineer with <b>3+ years</b> shipping production web apps, backend APIs, third-party
        integrations, and AI/OCR features. I own features end-to-end — data models, API optimization, and cloud
        deploys on <b>AWS &amp; Azure</b> for users across the US, the Philippines, and India.
      </p>
      <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.65 }}>
        Comfortable across <b>JavaScript/TypeScript, Go, Python</b> and the cloud-native toolchain (Docker, Kubernetes,
        Terraform). Lately: AI-powered healthcare features and interactive developer tooling.
      </p>
      <div className="mono" style={{ marginTop: 14, display: "grid", gap: 6, fontSize: 13 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}><MapPin size={14} /> {PROFILE.location}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Mail size={14} /> {PROFILE.email}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Phone size={14} /> {PROFILE.phone}</span>
      </div>
    </div>
  );
}

function LogEntry({ when, status, title, sub, bullets }) {
  return (
    <div style={{ borderLeft: `4px solid ${ORANGE}`, paddingLeft: 12, marginBottom: 18 }}>
      <div className="mono" style={{ fontSize: 12, color: "#666" }}>
        <span style={{ background: "#000", color: ORANGE, padding: "1px 6px", marginRight: 8 }}>{when}</span>
        <span style={{ color: status === "RUNNING" ? ORANGE : "#16a34a", fontWeight: 700 }}>[{status}]</span>
      </div>
      <div className="display" style={{ fontSize: 17, marginTop: 5 }}>{title}</div>
      <div className="mono" style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{sub}</div>
      <ul className="mono" style={{ margin: "8px 0 0", paddingLeft: 0, listStyle: "none", fontSize: 12.5, lineHeight: 1.6 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 7 }}>
            <ChevronRight size={13} style={{ flexShrink: 0, marginTop: 3, color: ORANGE }} /><span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function ExperienceBody() {
  return (
    <div style={{ padding: 18 }}>
      <div className="mono" style={{ fontSize: 12, color: "#555", marginBottom: 16, borderBottom: "2px dashed #000", paddingBottom: 8 }}>$ tail -f /var/log/career.log</div>
      <LogEntry when="2024-05 → now" status="RUNNING" title="Circle Health — Full-Stack Software Engineer" sub="Healthcare AI & Cloud · Bengaluru, India"
        bullets={[
          "Build & maintain healthcare apps for US / PH / India on React, Node, Python, PostgreSQL, AWS, Azure.",
          "Patient engagement via Meta WhatsApp Business + Exotel / Twilio / Ubona calling integrations.",
          "Integrated the Simple EHR to fetch patient records in near real-time for faster enrollment.",
          "Billing & clinical workflows with CPT / ICD codes across CCM, BHI, RPM, CoCM programs.",
          "AI features: wellness reports, fitness & period trackers, AI health plans, AI diet charts.",
          "Tuned API performance with PM2 workload distribution and NGINX traffic management.",
        ]} />
      <LogEntry when="2022-08 → 2024-04" status="DONE" title="Feed Our World — Lead Developer" sub="Nonprofit Tech · Remote"
        bullets={[
          "Led a platform to cut food waste by moving food from surplus to shortage areas.",
          "Built FOW FARM on the MERN stack + CELO blockchain, reducing operational cost by 25%.",
          "Delivered full-stack features, DB-backed APIs, admin workflows, and donation reporting.",
        ]} />
      <LogEntry when="2022" status="DONE" title="Webyapar Solution — Software Developer Intern" sub="India"
        bullets={[
          "Built a custom e-commerce app letting admins spin up shops from API templates (-70% dev cost).",
          "Created product upload & filtering workflows improving catalogue management and discovery.",
        ]} />
    </div>
  );
}

const PROJECTS = [
  { name: "DevStudio", tag: "Interactive coding platform", stack: ["Go", "React", "PostgreSQL", "Docker", "sqlc"],
    blurb: "Editable playback for coding screencasts — learners pause, fork the live codebase, experiment, then resume from the original state.",
    lang: "session.go", code: ["func (h *Hub) Replay(s *Session) error {", "    for _, op := range s.Ops {", "        h.broadcast(op)      // emit edit", "        time.Sleep(op.Delay) // keep timing", "    }", "    return nil", "}"] },
  { name: "WACOMM", tag: "WhatsApp AI dashboard", stack: ["React", "Python", "Meta API", "Gemini 2.5"],
    blurb: "Real-time patient comms on the Meta API — care managers chat with assigned patients, track calls, and get AI conversation summaries.",
    lang: "summarize.py", code: ["@app.post('/summarize')", "async def summarize(chat: Chat):", "    msgs = await db.fetch(chat.id)", "    out  = gemini.generate(PROMPT, msgs)", "    return { 'summary': out.text }"] },
  { name: "AI Health Report", tag: "OCR / LLM workflow", stack: ["Gemini", "Node.js", "AWS S3"],
    blurb: "Scans lab reports, extracts structured health data, computes wellness scores, and flags cardiovascular, diabetes, hypertension & liver risks.",
    lang: "report.ts", code: ["const data  = await ocr.extract(buffer);", "const risks = scoreVitals(data); // CVD, T2D, HTN", "await s3.put(`reports/${id}.json`, data);", "return { wellness: risks.score, risks };"] },
];
function ProjectsBody() {
  return (
    <div style={{ padding: 18, display: "grid", gap: 18 }}>
      {PROJECTS.map((p) => (
        <div key={p.name} className="card3d" style={{ border: "3px solid #000", background: "#fff", padding: 14, boxShadow: "5px 5px 0 #000" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6 }}>
            <h3 className="display" style={{ fontSize: 19, margin: 0 }}>{p.name}</h3>
            <span className="mono" style={{ fontSize: 11, background: "#000", color: ORANGE, padding: "2px 7px" }}>{p.tag}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {p.stack.map((s) => <span key={s} className="mono" style={{ fontSize: 11, border: "2px solid #000", padding: "1px 6px", background: "#f3f4f6" }}>{s}</span>)}
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: "10px 0 0" }}>{p.blurb}</p>
          <CodePreview lang={p.lang} lines={p.code} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Features window --------------------------- */
const FEATURES = [
  { icon: Phone, color: ORANGE, title: "Telephony at scale", org: "Circle Health", tags: ["Ubona", "Exotel", "Twilio"],
    blurb: "Wired up inbound & outbound calling for patient outreach across Ubona, Exotel and Twilio — call tracking, routing, and DLT/TRAI-compliant flows." },
  { icon: MessageCircle, color: "#25D366", title: "WhatsApp Business automation", org: "Circle Health", tags: ["Meta API", "Templates", "Chatbot"],
    blurb: "Two-way patient messaging on the Meta WhatsApp Business API — approved templates, chatbot routing, and a care-manager inbox." },
  { icon: Mic, color: "#3B82C4", title: "Voice → clinical script (AI)", org: "Circle Health", tags: ["Gemini", "ASR", "Summaries"],
    blurb: "Turned patient voice recordings into structured clinical scripts and summaries with Gemini models, preserving context for follow-up care." },
  { icon: ScanLine, color: "#1f9e8e", title: "OCR health reports → health chart", org: "Circle Health", tags: ["OCR", "Gemini", "AWS S3"],
    blurb: "OCR pipeline scans lab reports, extracts structured vitals, scores cardiovascular / diabetes / hypertension / liver risk, and renders an AI health chart." },
  { icon: ShoppingCart, color: "#9333EA", title: "Multi-vendor e-commerce", org: "Webyapar", tags: ["MERN", "Scale", "Payments"],
    blurb: "A storefront where vendors upload & sell products and buyers purchase — architected and scaled to thousands of concurrent users." },
];
function FeaturesBody() {
  return (
    <div style={{ padding: 18, display: "grid", gap: 16 }}>
      <p className="mono" style={{ margin: 0, fontSize: 12, color: "#555" }}>// things I designed, built & shipped to production</p>
      {FEATURES.map((f) => (
        <div key={f.title} className="card3d" style={{ border: "3px solid #000", background: "#fff", padding: 14, boxShadow: "5px 5px 0 #000", display: "flex", gap: 13 }}>
          <div style={{ flexShrink: 0, width: 42, height: 42, display: "grid", placeItems: "center", border: "3px solid #000", background: f.color, boxShadow: "3px 3px 0 #000" }}>
            <f.icon size={20} strokeWidth={2.6} color="#fff" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <h3 className="display" style={{ fontSize: 17, margin: 0 }}>{f.title}</h3>
              <span className="mono" style={{ fontSize: 10.5, background: "#000", color: "#fff", padding: "1px 6px" }}>{f.org}</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: "7px 0 9px" }}>{f.blurb}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {f.tags.map((t) => <span key={t} className="mono" style={{ fontSize: 11, border: "2px solid #000", padding: "1px 6px", background: "#f3f4f6" }}>{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Terminal window --------------------------- */
const DEPS = [["go", "^1.22"], ["python", "^3.12"], ["typescript", "^5.4"], ["javascript", "es2023"], ["node", "^20.0"], ["react", "^18.3"], ["next", "^14.0"], ["postgresql", "^16"], ["mongodb", "^7.0"], ["redis", "^7.2"]];
const AWS = [["ec2", "compute"], ["lambda", "serverless"], ["s3", "storage"], ["rds", "database"], ["iam", "identity"], ["vpc", "networking"], ["sqs", "queue"], ["cloudwatch", "observability"], ["cloudfront", "cdn"], ["route53", "dns"], ["codepipeline", "ci/cd"], ["codebuild", "ci/cd"], ["codedeploy", "ci/cd"]];
const DEVOPS = [["docker", "^26.0", "Containerizes apps so they run identically everywhere — build once, ship anywhere."], ["kubernetes", "^1.30", "Orchestrates & auto-scales containers across a cluster, self-healing failed pods."], ["terraform", "^1.8", "Infrastructure-as-code: declare cloud resources and provision them reproducibly."]];

function Tip({ children, tip }) {
  return <span className="tip">{children}<span className="tip-bubble mono">{tip}</span></span>;
}
function TerminalBody() {
  const [history, setHistory] = useState([{ t: "out", v: "ankush@web-os:~$ cat skills.lock" }, { t: "out", v: "resolving dependency graph ..." }]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest" }); }, [history]);
  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const push = (lines) => setHistory((h) => [...h, { t: "cmd", v: `ankush@web-os:~$ ${raw}` }, ...lines.map((v) => ({ t: "out", v }))]);
    if (cmd === "clear") return setHistory([]);
    if (cmd === "help") return push(["available: skills  aws  whoami  projects  features  social  clear"]);
    if (cmd === "whoami") return push([`${PROFILE.name} — ${PROFILE.role} (3+ yrs), ${PROFILE.location}`]);
    if (cmd === "projects") return push(PROJECTS.map((p) => `• ${p.name} — ${p.tag}`));
    if (cmd === "features") return push(FEATURES.map((f) => `• ${f.title} (${f.org})`));
    if (cmd === "aws") return push(AWS.map(([n, v]) => `▸ aws-${n.padEnd(13)} ${v}`));
    if (cmd === "social") return push([`github  ${PROFILE.github}`, `linkedin ${PROFILE.linkedin}`, `twitter ${PROFILE.twitter}`]);
    if (cmd === "skills") return push([...DEPS, ...DEVOPS.map((d) => [d[0], d[1]]), ...AWS.map(([n, v]) => [`aws-${n}`, v])].map(([n, v]) => `✔ ${String(n).padEnd(16)} ${v}`));
    if (cmd === "") return setHistory((h) => [...h, { t: "cmd", v: "ankush@web-os:~$" }]);
    return push([`command not found: ${cmd} — try 'help'`]);
  };
  return (
    <div style={{ background: "#0b0b0b", padding: 14, minHeight: 340 }}>
      <div className="mono" style={{ fontSize: 12.5, lineHeight: 1.7, color: "#d8d8d8" }}>
        <div style={{ color: "#16a34a" }}># core skills</div>
        {DEPS.map(([n, v]) => <div key={n}><span style={{ color: ORANGE }}>✔</span> {n}<span style={{ float: "right", color: "#777" }}>{v}</span></div>)}
        {DEVOPS.map(([n, v, tip]) => (
          <div key={n}><span style={{ color: ORANGE }}>✔</span>{" "}
            <Tip tip={tip}><span style={{ borderBottom: "1px dotted #FF5C01", cursor: "help", color: "#fff" }}>{n}</span></Tip>
            <span style={{ float: "right", color: "#777" }}>{v}</span></div>
        ))}
        <div style={{ color: "#16a34a", marginTop: 8 }}># aws — services</div>
        {AWS.map(([n, v]) => <div key={n}><span style={{ color: ORANGE }}>▸</span> aws-{n}<span style={{ float: "right", color: "#777" }}>{v}</span></div>)}
        <div style={{ color: "#16a34a", marginTop: 8 }}># also: github-actions · nginx · pm2 · openai/gpt-4o · gemini · ocr · azure</div>
      </div>
      <div style={{ borderTop: "1px solid #333", margin: "12px 0", paddingTop: 10 }} />
      <div className="mono" style={{ fontSize: 12.5, lineHeight: 1.7 }}>
        {history.map((l, i) => <div key={i} style={{ color: l.t === "cmd" ? "#fff" : "#bdbdbd", whiteSpace: "pre-wrap" }}>{l.v}</div>)}
        <div style={{ display: "flex", alignItems: "center", color: "#fff" }}>
          <span style={{ color: ORANGE, marginRight: 6 }}>ankush@web-os:~$</span>
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { run(input); setInput(""); } }}
            placeholder="type 'help'" className="mono"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 12.5 }} />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}

/* ------------------------------ Resume window ----------------------------- */
function Section({ title, children }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#fff", background: "#000", display: "inline-block", padding: "2px 8px", marginBottom: 8 }}>{title.toUpperCase()}</div>
      {children}
    </div>
  );
}
function ResumeRow({ a, b }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13, padding: "3px 0", flexWrap: "wrap" }}>
      <span style={{ fontWeight: 600 }}>{a}</span><span className="mono" style={{ color: "#777", fontSize: 11.5 }}>{b}</span>
    </div>
  );
}
function ResumeBody() {
  return (
    <div>
      <div className="mono" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#e5e5e5", borderBottom: "2px solid #000", padding: "6px 10px", fontSize: 12 }}>
        <span>Ankush_Banik_Resume.pdf</span>
        <button className="nb-btn" onClick={() => { try { window.print(); } catch (e) {} }}
          style={{ display: "flex", alignItems: "center", gap: 6, background: ORANGE, color: "#fff", border: "2px solid #000", padding: "3px 9px", fontWeight: 700, fontSize: 11, boxShadow: "3px 3px 0 #000" }}>
          <Download size={13} /> Save
        </button>
      </div>
      <div style={{ padding: 18, background: "#fafafa" }}>
        <h2 className="display" style={{ margin: 0, fontSize: 22 }}>{PROFILE.name}</h2>
        <div className="mono" style={{ fontSize: 11.5, color: "#555", marginTop: 4 }}>{PROFILE.role} · {PROFILE.location} · {PROFILE.email} · {PROFILE.phone}</div>
        <Section title="Summary"><p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>Full-Stack Software Engineer with 3+ years building production web apps, backend APIs, third-party integrations, automation, AI/OCR features and cloud-deployed systems across the JS/TS, Go & Python ecosystems with PostgreSQL, MongoDB, Redis, AWS, Azure, Docker, Kubernetes and Terraform.</p></Section>
        <Section title="Experience">
          <ResumeRow a="Circle Health — Full-Stack Software Engineer" b="May 2024 – Present" />
          <ResumeRow a="Feed Our World — Lead Developer" b="Aug 2022 – Apr 2024" />
          <ResumeRow a="Webyapar Solution — Software Developer Intern" b="2022" />
        </Section>
        <Section title="Education"><ResumeRow a="B.Sc. (Hons.) Mathematics — University of Calcutta" b="2018 – 2021" /></Section>
        <Section title="Highlights"><p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>Impact Award @ Feed Our World · 2nd place, Web3aThon (CELO, 13 tracks) · OSS: Lightdash, Ethers.js, create-web3-dapp, CELO.</p></Section>
      </div>
    </div>
  );
}

/* ------------------------------ Contact window ---------------------------- */
function ContactBody() {
  const [copied, setCopied] = useState(false);
  const copy = () => { try { navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch (e) {} };
  return (
    <div style={{ padding: 18 }}>
      <h2 className="display" style={{ margin: 0, fontSize: 24 }}>Let’s build something.</h2>
      <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>Open to full-stack & AI/cloud roles. Fastest way to reach me is email — I usually reply within a day.</p>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
        <a className="slink" href={`mailto:${PROFILE.email}`}><Mail size={16} /> {PROFILE.email}</a>
        <button className="nb-btn" onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, background: copied ? "#16a34a" : "#fff", color: copied ? "#fff" : "#000", border: "2px solid #000", padding: "8px 10px", fontWeight: 700, fontSize: 12, boxShadow: "3px 3px 0 #000", fontFamily: "'JetBrains Mono',monospace" }}>
          <Copy size={14} /> {copied ? "copied!" : "copy"}
        </button>
      </div>
      <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
        <a className="slink" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}><Phone size={16} /> {PROFILE.phone}</a>
        <a className="slink" href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={16} /> github / Ankush263</a>
        <a className="slink" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> in / ankush-banik</a>
        <a className="slink" href={PROFILE.twitter} target="_blank" rel="noreferrer"><Twitter size={16} /> @AnkushBanik8</a>
      </div>
    </div>
  );
}

/* ------------------------------ Window shell ------------------------------ */
function Win({ win, active, onClose, onFocus, onDragStart }) {
  return (
    <div onPointerDown={() => onFocus(win.id)}
      style={{ position: "absolute", left: win.x, top: win.y, width: win.w, maxWidth: "calc(100vw - 16px)", zIndex: win.z, background: "#fff", border: "3px solid #000", boxShadow: active ? "8px 8px 0 #000" : "4px 4px 0 rgba(0,0,0,0.45)" }}>
      <div onPointerDown={(e) => onDragStart(e, win.id)} className="mono select-none"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", borderBottom: "3px solid #000", cursor: "grab", background: active ? ORANGE : "#d4d4d4", color: active ? "#fff" : "#555", fontWeight: 700, fontSize: 13 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
          <win.icon size={15} strokeWidth={2.5} />
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{win.title}</span>
        </span>
        <span style={{ display: "flex", gap: 6 }}>
          <button className="nb-ctrl" tabIndex={-1}><Minus size={13} strokeWidth={3} /></button>
          <button className="nb-ctrl" onPointerDown={(e) => e.stopPropagation()} onClick={() => onClose(win.id)}><X size={13} strokeWidth={3} /></button>
        </span>
      </div>
      <div style={{ maxHeight: "calc(100vh - 170px)", overflowY: "auto" }}>{win.body}</div>
    </div>
  );
}

/* ------------------------------ Registry & icons -------------------------- */
const REGISTRY = {
  about:      { title: "About.txt",         icon: User,           w: 420, body: <AboutBody /> },
  resume:     { title: "Resume.pdf",         icon: FileText,       w: 580, body: <ResumeBody /> },
  projects:   { title: "Projects",           icon: Folder,         w: 600, body: <ProjectsBody /> },
  experience: { title: "Experience.log",     icon: Briefcase,      w: 560, body: <ExperienceBody /> },
  features:   { title: "Features.app",       icon: Sparkles,       w: 600, body: <FeaturesBody /> },
  terminal:   { title: "skills — terminal",  icon: TerminalSquare, w: 540, body: <TerminalBody /> },
  contact:    { title: "Contact",            icon: Mail,           w: 440, body: <ContactBody /> },
};
const DESKTOP_ICONS = [
  { key: "about", label: "About.txt", Art: IcAbout },
  { key: "resume", label: "Resume.pdf", Art: IcResume },
  { key: "projects", label: "Projects", Art: IcProjects },
  { key: "features", label: "Features.app", Art: IcFeatures },
  { key: "experience", label: "Experience", Art: IcExperience },
  { key: "terminal", label: "Skills", Art: IcTerminal },
  { key: "contact", label: "Talk to me", Art: IcContact },
];

/* --------------------------------- App ----------------------------------- */
export default function App() {
  const [windows, setWindows] = useState([]);
  const [zTop, setZTop] = useState(20);
  const [active, setActive] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");
  const drag = useRef(null);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  const open = useCallback((key) => {
    setStartOpen(false);
    setWindows((ws) => {
      const existing = ws.find((w) => w.key === key);
      const nz = zTop + 1; setZTop(nz); setActive(key);
      if (existing) return ws.map((w) => (w.key === key ? { ...w, z: nz } : w));
      const mobile = typeof window !== "undefined" && window.innerWidth < 768;
      const off = ws.length * (mobile ? 14 : 28);
      return [...ws, { key, id: key, ...REGISTRY[key], z: nz, x: (mobile ? 8 : 150) + off, y: (mobile ? 70 : 80) + off }];
    });
  }, [zTop]);
  const close = useCallback((id) => setWindows((ws) => ws.filter((w) => w.id !== id)), []);
  const focus = useCallback((id) => {
    setActive(id);
    setZTop((z) => { const nz = z + 1; setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: nz } : w))); return nz; });
  }, []);

  const onMove = useCallback((e) => {
    const d = drag.current; if (!d) return;
    const nx = d.ox + (e.clientX - d.sx), ny = Math.max(56, d.oy + (e.clientY - d.sy)), vw = window.innerWidth;
    setWindows((ws) => ws.map((w) => (w.id === d.id ? { ...w, x: Math.min(Math.max(nx, -w.w + 80), vw - 60), y: ny } : w)));
  }, []);
  const onUp = useCallback(() => { drag.current = null; window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); }, [onMove]);
  const onDragStart = useCallback((e, id) => {
    const w = windows.find((x) => x.id === id); if (!w) return;
    drag.current = { id, sx: e.clientX, sy: e.clientY, ox: w.x, oy: w.y };
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
  }, [windows, onMove, onUp]);

  const NAV = [["about", "About"], ["experience", "Work"], ["projects", "Projects"], ["features", "Features"], ["terminal", "Skills"]];

  return (
    <div onPointerDown={() => startOpen && setStartOpen(false)}
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", backgroundColor: TAN, backgroundImage: GRAIN, fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
        .display{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;letter-spacing:-0.01em;}
        .mono{font-family:'JetBrains Mono',ui-monospace,monospace;}
        .select-none{user-select:none;-webkit-user-select:none;}
        .nb-btn{transition:none;cursor:pointer;}
        .nb-btn:active{transform:translate(2px,2px);box-shadow:0 0 0 #000 !important;}
        .nb-ctrl{display:inline-grid;place-items:center;width:20px;height:20px;padding:0;line-height:0;border:2px solid #000;background:#fff;color:#000;cursor:pointer;}
        .nb-ctrl svg{display:block;}
        .nb-ctrl:active{transform:translate(1px,1px);}
        .dicon{cursor:pointer;transition:transform .08s;}
        .dicon:hover{transform:translateY(-2px);}
        .dicon:active{transform:translate(1px,2px);}
        .card3d{transition:transform .08s,box-shadow .08s;}
        .card3d:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 ${ORANGE};}
        .navlink{cursor:pointer;background:none;border:none;font-weight:700;font-size:15px;color:#1a1a1a;padding:4px 2px;font-family:'Space Grotesk',sans-serif;}
        .navlink:hover{color:${ORANGE};}
        .tip{position:relative;}
        .tip-bubble{position:absolute;left:0;bottom:140%;width:230px;background:#FFFCC8;color:#000;border:2px solid #000;box-shadow:4px 4px 0 #000;padding:7px 9px;font-size:11px;line-height:1.45;opacity:0;visibility:hidden;transition:opacity .1s;z-index:9999;pointer-events:none;}
        .tip:hover .tip-bubble{opacity:1;visibility:visible;}
        .tip-bubble::after{content:'';position:absolute;left:14px;top:100%;border:7px solid transparent;border-top-color:#000;}
        .slink{display:flex;align-items:center;gap:10px;padding:9px 12px;border:2px solid #000;background:#fff;font-family:'JetBrains Mono',monospace;font-size:12.5px;text-decoration:none;color:#000;cursor:pointer;}
        .slink:hover{background:${ORANGE};color:#fff;}
        .slink:active{transform:translate(2px,2px);}
        ::-webkit-scrollbar{width:12px;height:12px;}
        ::-webkit-scrollbar-thumb{background:#000;border:2px solid ${TAN};}
        ::-webkit-scrollbar-track{background:#cdc3a8;}
        input::placeholder{color:#666;}
        .iso-wrap{position:absolute;right:1%;bottom:48px;width:46%;max-width:640px;z-index:0;pointer-events:none;}
        .hero{position:absolute;left:9%;top:30%;max-width:440px;z-index:1;}
        @media (max-width:980px){ .iso-wrap{opacity:.5;width:60%;right:-6%;} .hero{left:120px;top:78px;max-width:60%;} }
        @media (max-width:640px){ .iso-wrap{display:none;} .hero{left:50%;transform:translateX(-50%);top:330px;text-align:center;max-width:88%;} .nav-extra{display:none;} }
      `}</style>

      {/* ============================= TOP NAV ============================= */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 56, display: "flex", alignItems: "center", gap: 18, padding: "0 16px", borderBottom: "3px solid #000", background: "rgba(243,240,232,0.92)", backdropFilter: "blur(2px)", zIndex: 9600 }}>
        <button className="nb-btn select-none" onClick={() => open("about")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none" }}>
          <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, background: "#000", border: "2px solid #000", boxShadow: `3px 3px 0 ${ORANGE}` }}>
            <span className="mono" style={{ color: ORANGE, fontSize: 11, fontWeight: 700 }}>{"A:\\"}</span>
          </span>
          <span className="display" style={{ fontSize: 18 }}>ankush<span style={{ color: ORANGE }}>OS</span></span>
        </button>
        <div className="nav-extra" style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 6 }}>
          {NAV.map(([k, label]) => <button key={k} className="navlink" onClick={() => open(k)}>{label}</button>)}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <button className="nb-btn select-none" onClick={() => open("contact")} style={{ background: ORANGE, color: "#fff", border: "2px solid #000", padding: "8px 14px", fontWeight: 800, boxShadow: "3px 3px 0 #000", fontFamily: "'Bricolage Grotesque',sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
            Hire me <ArrowUpRight size={15} strokeWidth={2.6} />
          </button>
          <button className="nb-ctrl" style={{ width: 30, height: 30 }} onClick={() => open("terminal")}><Search size={15} /></button>
          <button className="nb-ctrl" style={{ width: 30, height: 30 }} onClick={() => open("about")}><HelpCircle size={15} /></button>
        </div>
      </div>

      {/* ========================= HERO (wallpaper) ======================= */}
      <div className="hero">
        <span className="mono" style={{ display: "inline-block", background: "#000", color: ORANGE, fontSize: 12, padding: "3px 8px", border: "2px solid #000" }}>● online · open to work</span>
        <h1 className="display" style={{ fontSize: 46, lineHeight: 1.02, margin: "14px 0 0" }}>Hi, I’m Ankush.<br />I build <span style={{ color: ORANGE }}>full-stack</span><br />+ AI products.</h1>
        <p style={{ fontSize: 15.5, lineHeight: 1.55, marginTop: 14, maxWidth: 400, color: "#2a2a2a" }}>
          A Web-OS portfolio. Double-tap the icons, drag the windows around, or poke at the terminal. 3+ years shipping healthcare AI &amp; cloud systems.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <button className="nb-btn" onClick={() => open("projects")} style={{ background: "#000", color: "#fff", border: "3px solid #000", padding: "10px 16px", fontWeight: 800, boxShadow: "4px 4px 0 " + ORANGE, fontFamily: "'Bricolage Grotesque',sans-serif" }}>View my work →</button>
          <button className="nb-btn" onClick={() => open("contact")} style={{ background: "#fff", color: "#000", border: "3px solid #000", padding: "10px 16px", fontWeight: 800, boxShadow: "4px 4px 0 #000", fontFamily: "'Bricolage Grotesque',sans-serif" }}>Get in touch</button>
        </div>
      </div>

      {/* isometric scene */}
      <div className="iso-wrap"><IsoScene /></div>

      {/* ============================ DESKTOP ICONS ======================= */}
      <div style={{ position: "absolute", top: 72, left: 14, display: "flex", flexDirection: "column", gap: 16, zIndex: 2 }}>
        {DESKTOP_ICONS.map(({ key, label, Art }) => (
          <button key={key} className="dicon select-none" onClick={() => open(key)} style={{ background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center", width: 80, gap: 4 }}>
            <Art />
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: "#222", background: "rgba(255,255,255,0.6)", padding: "1px 5px", borderRadius: 3, textAlign: "center", lineHeight: 1.2 }}>{label}</span>
          </button>
        ))}
      </div>

      {/* ============================== WINDOWS =========================== */}
      {windows.map((w) => <Win key={w.id} win={w} active={active === w.id} onClose={close} onFocus={focus} onDragStart={onDragStart} />)}

      {/* ============================ START MENU ========================== */}
      {startOpen && (
        <div onPointerDown={(e) => e.stopPropagation()} style={{ position: "absolute", left: 8, bottom: 50, width: 290, display: "flex", border: "3px solid #000", boxShadow: "8px 8px 0 #000", zIndex: 9000, background: "#fff" }}>
          <div className="display" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", background: "#000", color: ORANGE, fontSize: 22, padding: "10px 4px", letterSpacing: "0.1em", textAlign: "center" }}>ANKUSH·OS</div>
          <div style={{ flex: 1, padding: 10 }}>
            <MenuHead label="ACHIEVEMENTS" />
            <MenuItem icon={Award} a="Impact Award" b="Feed Our World" />
            <MenuItem icon={Trophy} a="2nd place — Web3aThon" b="CELO · 13 tracks" />
            <MenuItem icon={GitPullRequest} a="Open Source" b="Lightdash · Ethers.js · CELO" />
            <MenuHead label="SOCIAL" />
            <a className="slink" href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={16} /> github / Ankush263</a>
            <a className="slink" href={PROFILE.linkedin} target="_blank" rel="noreferrer" style={{ marginTop: 7 }}><Linkedin size={16} /> in / ankush-banik</a>
            <a className="slink" href={PROFILE.twitter} target="_blank" rel="noreferrer" style={{ marginTop: 7 }}><Twitter size={16} /> @AnkushBanik8</a>
          </div>
        </div>
      )}

      {/* ============================== TASKBAR =========================== */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 44, display: "flex", alignItems: "center", gap: 8, padding: "0 8px", background: "#e7e3d6", borderTop: "3px solid #000", zIndex: 9500 }}>
        <button className="nb-btn select-none" onPointerDown={(e) => e.stopPropagation()} onClick={() => setStartOpen((s) => !s)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: startOpen ? "#000" : ORANGE, color: "#fff", border: "2px solid #000", padding: "5px 12px", fontWeight: 800, boxShadow: "3px 3px 0 #000", fontFamily: "'Bricolage Grotesque',sans-serif" }}>
          <Cpu size={16} strokeWidth={2.5} /> Ankush
        </button>
        <div style={{ display: "flex", gap: 6, flex: 1, overflow: "hidden" }}>
          {windows.map((w) => (
            <button key={w.id} className="mono select-none" onClick={() => focus(w.id)}
              style={{ display: "flex", alignItems: "center", gap: 6, maxWidth: 150, border: "2px solid #000", background: active === w.id ? "#fff" : "#cfcabb", padding: "4px 8px", fontSize: 11, fontWeight: 700, boxShadow: active === w.id ? "2px 2px 0 #000" : "none", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <w.icon size={13} /> {w.title}
            </button>
          ))}
        </div>
        <div className="mono" style={{ border: "2px solid #000", background: "#fff", padding: "4px 10px", fontSize: 12, fontWeight: 700 }}>{clock}</div>
      </div>
    </div>
  );
}

function MenuHead({ label }) {
  return <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#999", letterSpacing: "0.1em", margin: "4px 0 7px" }}>{label}</div>;
}
function MenuItem({ icon: Icon, a, b }) {
  return (
    <div className="slink" style={{ marginBottom: 7, cursor: "default" }}>
      <Icon size={16} color={ORANGE} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
        <b style={{ fontSize: 12 }}>{a}</b><span style={{ fontSize: 10, color: "#888" }}>{b}</span>
      </span>
    </div>
  );
}