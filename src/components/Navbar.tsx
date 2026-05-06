import { Link } from "@tanstack/react-router";
import { Radar } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Radar className="h-7 w-7 text-primary" />
            <span className="absolute inset-0 rounded-full animate-pulse-ring" />
          </div>
          <span className="font-bold tracking-tight text-lg">
            PotHole<span className="text-primary">.AI</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/report" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Report</Link>
          <Link to="/dashboard" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Admin</Link>
          <a href="/#architecture" className="hover:text-foreground transition">Architecture</a>
          <a href="/#team" className="hover:text-foreground transition">Team</a>
        </nav>
        <Link
          to="/report"
          className="rounded-md bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
        >
          Report Pothole
        </Link>
      </div>
    </header>
  );
}