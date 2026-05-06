import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Trash2, Inbox } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

type Severity = "Low" | "Medium" | "High";
type Status = "Reported" | "In Progress" | "Fixed";
type Pothole = {
  id: number;
  preview: string | null;
  severity: Severity;
  coords: { lat: number; lng: number } | null;
  desc: string;
  status: Status;
  createdAt: string;
};

const STATUSES: Status[] = ["Reported", "In Progress", "Fixed"];

const sevDot: Record<Severity, string> = {
  Low: "bg-emerald-400",
  Medium: "bg-amber-400",
  High: "bg-red-400",
};

const statusColor: Record<Status, string> = {
  Reported: "text-amber-300 bg-amber-400/10 border-amber-400/30",
  "In Progress": "text-sky-300 bg-sky-400/10 border-sky-400/30",
  Fixed: "text-emerald-300 bg-emerald-400/10 border-emerald-400/30",
};

function load(): Pothole[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("potholes") || "[]");
  } catch {
    return [];
  }
}

function DashboardPage() {
  const [items, setItems] = useState<Pothole[]>([]);
  const [filter, setFilter] = useState<"All" | Status>("All");

  useEffect(() => setItems(load()), []);

  const save = (next: Pothole[]) => {
    setItems(next);
    localStorage.setItem("potholes", JSON.stringify(next));
  };

  const setStatus = (id: number, status: Status) =>
    save(items.map((i) => (i.id === id ? { ...i, status } : i)));
  const remove = (id: number) => save(items.filter((i) => i.id !== id));

  const filtered = filter === "All" ? items : items.filter((i) => i.status === filter);

  const counts = {
    All: items.length,
    Reported: items.filter((i) => i.status === "Reported").length,
    "In Progress": items.filter((i) => i.status === "In Progress").length,
    Fixed: items.filter((i) => i.status === "Fixed").length,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-12 relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-6 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <p className="font-mono text-xs text-primary mb-3">// ADMIN DASHBOARD</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Repair <span className="text-gradient">tracking</span> & status updates.
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {(["All", "Reported", "In Progress", "Fixed"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`text-left rounded-2xl border p-5 transition ${
                  filter === k ? "border-primary bg-card" : "border-border bg-card/60 hover:bg-card"
                }`}
              >
                <div className="text-3xl font-bold font-mono text-gradient">{counts[k]}</div>
                <div className="text-xs text-muted-foreground mt-1">{k}</div>
              </button>
            ))}
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-16 text-center">
              <Inbox className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reports yet.</p>
              <Link to="/report" className="mt-4 inline-block text-primary font-semibold underline">
                Submit the first one →
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-4">
              {filtered.map((p) => (
                <div key={p.id} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col sm:flex-row">
                  {p.preview && (
                    <img src={p.preview} alt="" className="sm:w-40 sm:h-auto h-40 w-full object-cover" />
                  )}
                  <div className="p-5 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${sevDot[p.severity]}`} />
                        <span className="font-mono text-xs">{p.severity.toUpperCase()}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-1 rounded border ${statusColor[p.status]}`}>
                        {p.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      {p.desc || <span className="text-muted-foreground italic">No notes</span>}
                    </div>
                    {p.coords && (
                      <div className="mt-2 text-xs text-muted-foreground font-mono flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {p.coords.lat.toFixed(4)}, {p.coords.lng.toFixed(4)}
                      </div>
                    )}
                    <div className="mt-2 text-[10px] text-muted-foreground font-mono">
                      {new Date(p.createdAt).toLocaleString()}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <select
                        value={p.status}
                        onChange={(e) => setStatus(p.id, e.target.value as Status)}
                        className="rounded-md bg-input/60 border border-border px-3 py-1.5 text-xs"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => remove(p.id)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-red-400"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}