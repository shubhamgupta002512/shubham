import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Radar, MapPin, Bell, Camera, BrainCircuit, Gauge, ShieldCheck, ArrowRight,
  Database, Server, Cpu, Globe, Layers, Target, AlertTriangle, GraduationCap, Users,
} from "lucide-react";
import heroCity from "@/assets/hero-city.jpg";
import detection from "@/assets/detection.jpg";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  component: Index,
});

const objectives = [
  { icon: Camera, title: "Easy Reporting", desc: "Web platform for citizens to report potholes with image + location in seconds." },
  { icon: BrainCircuit, title: "AI Severity Detection", desc: "Image analysis classifies potholes into Low, Medium, High severity automatically." },
  { icon: MapPin, title: "Real-Time Tracking", desc: "Live map view of all complaints with status: Reported → In Progress → Fixed." },
  { icon: Gauge, title: "Smart Prioritization", desc: "Repairs are auto-prioritized by severity and location for faster action." },
  { icon: ShieldCheck, title: "Transparency", desc: "Citizens & authorities both get visibility into response time and progress." },
  { icon: Bell, title: "Smart City Ready", desc: "Supports the broader vision of intelligent, data-driven urban infrastructure." },
];

const methodology = [
  { n: "01", title: "User Input", desc: "Citizen captures pothole image & shares GPS location via the web app." },
  { n: "02", title: "Data Processing", desc: "React frontend sends image + coordinates to Node/Express backend via REST API." },
  { n: "03", title: "AI Analysis", desc: "Image is analyzed and severity is classified as Low, Medium or High." },
  { n: "04", title: "Storage", desc: "Image path, location, severity & status are stored in MongoDB." },
  { n: "05", title: "Map View", desc: "All potholes appear as colored markers on Google Maps / Leaflet." },
  { n: "06", title: "Admin Action", desc: "Authorities update status — Reported → In Progress → Fixed in real time." },
];

const stack = {
  Frontend: ["HTML", "CSS", "JavaScript", "React.js"],
  Backend: ["Node.js", "Express.js"],
  Database: ["MongoDB"],
  "Tools / APIs / AI": ["Google Maps", "Multer (uploads)", "Image-based AI Analysis"],
};

const team = [
  "Shubham Gupta",
  "Nitesh Verma",
  "Ayush Kumar Pandey",
  "Ayush Pratap Singh",
  "Ghanendra Tyagi",
  
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="container mx-auto px-6 relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-mono text-primary mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              MERN STACK · AI · SMART CITY
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              A Smart <span className="text-gradient">Pothole Reporting</span> & Repair Tracking System
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Built with the MERN Stack and Artificial Intelligence — citizens report potholes,
              AI classifies severity, and authorities track repairs in real time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/report" className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition">
                Report a Pothole <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 backdrop-blur px-6 py-3 font-semibold hover:bg-card transition">
                Admin Dashboard
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md font-mono">
              <div><div className="text-2xl text-primary font-bold">MERN</div><div className="text-xs text-muted-foreground">Stack</div></div>
              <div><div className="text-2xl text-primary font-bold">AI</div><div className="text-xs text-muted-foreground">Severity</div></div>
              <div><div className="text-2xl text-primary font-bold">GPS</div><div className="text-xs text-muted-foreground">Geo-tag</div></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-glow blur-2xl" />
            <img
              src={heroCity}
              alt="Smart city aerial view with AI pothole detection overlay"
              width={1920}
              height={1280}
              className="relative rounded-2xl border border-border shadow-elegant w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur border border-border rounded-xl p-4 shadow-elegant font-mono text-xs">
              <div className="text-accent font-bold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                LIVE REPORT
              </div>
              <div className="text-muted-foreground mt-1">Severity: HIGH · MG Road</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-24 relative">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-mono text-xs text-primary mb-3">// PROBLEM STATEMENT</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Roads are broken. <span className="text-gradient">Reporting is broken too.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Road potholes in urban areas often remain unreported or unattended for long periods.
              Existing complaint systems are mostly manual, slow, and lack tracking — making it
              difficult for authorities to respond efficiently or prioritize repairs based on
              severity. The result: more accidents, vehicle damage, traffic jams and public
              inconvenience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: AlertTriangle, t: "Unreported Damage", d: "Most potholes never reach the right authority." },
              { icon: Bell, t: "Slow Response", d: "Manual complaints take weeks to be acted upon." },
              { icon: Gauge, t: "No Prioritization", d: "Severe potholes treated same as minor ones." },
              { icon: ShieldCheck, t: "Public Safety Risk", d: "Accidents & vehicle damage keep rising." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-card p-5">
                <f.icon className="h-6 w-6 text-accent mb-3" />
                <div className="font-semibold">{f.t}</div>
                <p className="text-sm text-muted-foreground mt-1">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section id="objectives" className="py-24 relative bg-card/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-xs text-primary mb-3">// OBJECTIVES</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              What this project sets out to <span className="text-gradient">solve</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-glow opacity-0 group-hover:opacity-30 transition" />
                <f.icon className="h-8 w-8 text-primary mb-4 relative" />
                <h3 className="text-lg font-semibold relative">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground relative">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container mx-auto px-6 relative grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-xs text-primary mb-3">// METHODOLOGY</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">
              User → Backend → AI → DB → Admin → Status
            </h2>
            <div className="space-y-5">
              {methodology.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <div className="font-mono text-2xl font-bold text-primary shrink-0 w-12">{s.n}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.img
            src={detection}
            alt="AI bounding box pothole detection on road"
            width={1280}
            height={960}
            loading="lazy"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-border shadow-elegant w-full h-auto"
          />
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="font-mono text-xs text-primary mb-3">// TECHNOLOGY STACK</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Powered by the <span className="text-gradient">MERN Stack + AI</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(stack).map(([cat, items], i) => {
              const Icon = [Globe, Server, Database, Cpu][i] ?? Layers;
              return (
                <div key={cat} className="rounded-2xl border border-border bg-card p-6">
                  <Icon className="h-7 w-7 text-primary mb-4" />
                  <div className="font-semibold mb-3">{cat}</div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground font-mono">
                    {items.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="font-mono text-xs text-primary mb-3">// SYSTEM ARCHITECTURE</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              From a citizen's phone to a <span className="text-gradient">repair crew</span>.
            </h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-4">
            {[
              { icon: Users, t: "Frontend (React)", d: "User uploads image + GPS coordinates." },
              { icon: Server, t: "API (Express)", d: "REST API receives data via Multer upload." },
              { icon: BrainCircuit, t: "AI Module", d: "Classifies severity: Low / Medium / High." },
              { icon: Database, t: "MongoDB", d: "Stores image, location, severity, status." },
              { icon: MapPin, t: "Map + Admin", d: "Markers on map, admin updates status." },
            ].map((s, i) => (
              <div key={s.t} className="relative rounded-2xl border border-border bg-card p-5">
                <div className="font-mono text-xs text-primary mb-2">STEP {i + 1}</div>
                <s.icon className="h-7 w-7 text-primary mb-3" />
                <div className="font-semibold">{s.t}</div>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <p className="font-mono text-xs text-primary mb-3">// THE TEAM</p>
              <h2 className="text-4xl font-bold tracking-tight">
                Built at <span className="text-gradient">GLA University</span>.
              </h2>
              <p className="mt-4 text-muted-foreground text-sm">
                Final-year project submitted to <span className="text-foreground font-semibold">Mr. Rajat Jain</span>.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-mono">
                <GraduationCap className="h-4 w-4 text-primary" /> GLA UNIVERSITY · ESTD. 2010
              </div>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {team.map((name) => (
                <div key={name} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground">
                    {name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{name}</div>
                    <div className="text-xs text-muted-foreground font-mono">B.Tech · CSE</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="conclusion" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center rounded-3xl border border-border bg-card/60 backdrop-blur p-12 shadow-elegant">
            <Target className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Try the <span className="text-gradient">live demo</span>.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              An intelligent, scalable solution to a critical real-world problem — combining MERN
              stack, AI severity detection, geolocation and real-time tracking to support smart
              city development and road safety.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/report" className="rounded-md bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition">
                Report a Pothole
              </Link>
              <Link to="/dashboard" className="rounded-md border border-border bg-card/40 px-6 py-3 text-sm font-semibold hover:bg-card transition">
                Open Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Radar className="h-4 w-4 text-primary" />
            <span className="font-mono">PotHole.AI · GLA University Project</span>
          </div>
          <div>© {new Date().getFullYear()} — Built for safer roads.</div>
        </div>
      </footer>
    </div>
  );
}
