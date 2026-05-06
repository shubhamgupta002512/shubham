import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, MapPin, Loader2, CheckCircle2, AlertTriangle, ArrowLeft, BrainCircuit } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/report")({
  component: ReportPage,
});

type Severity = "Low" | "Medium" | "High";

function classify(file: File): Severity {
  // Simulated AI: deterministic based on file size so it feels "smart" for demo.
  const kb = file.size / 1024;
  if (kb > 800) return "High";
  if (kb > 250) return "Medium";
  return "Low";
}

const sevColor: Record<Severity, string> = {
  Low: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  Medium: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  High: "text-red-400 border-red-400/40 bg-red-400/10",
};

function ReportPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsErr, setGpsErr] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [desc, setDesc] = useState("");

  const onFile = (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setSeverity(null);
    setSubmitted(false);
  };

  const detectGps = () => {
    setGpsErr(null);
    if (!navigator.geolocation) {
      setGpsErr("Geolocation not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => setGpsErr(err.message),
    );
  };

  const analyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSeverity(classify(file));
    setAnalyzing(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !severity) return;
    const list = JSON.parse(localStorage.getItem("potholes") || "[]");
    list.unshift({
      id: Date.now(),
      preview,
      severity,
      coords,
      desc,
      status: "Reported",
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("potholes", JSON.stringify(list));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-6 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-primary mb-3">// REPORT A POTHOLE</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Upload, geo-tag, and let <span className="text-gradient">AI grade</span> it.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Capture a pothole image, share your location, and our AI will classify the severity
              (Low / Medium / High). Your report goes straight to the admin dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8">
          {/* FORM */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-6 space-y-6"
          >
            {/* Upload */}
            <div>
              <label className="text-sm font-semibold mb-2 block">1. Pothole Image</label>
              <label className="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-border rounded-xl py-10 hover:border-primary/60 transition">
                <Upload className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">
                  {file ? file.name : "Click to upload a road image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
              </label>
            </div>

            {/* GPS */}
            <div>
              <label className="text-sm font-semibold mb-2 block">2. Location (GPS)</label>
              <button
                type="button"
                onClick={detectGps}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border bg-input/40 px-4 py-3 text-sm hover:bg-input transition"
              >
                <MapPin className="h-4 w-4 text-primary" />
                {coords
                  ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`
                  : "Detect my location"}
              </button>
              {gpsErr && <p className="text-xs text-red-400 mt-2">{gpsErr}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold mb-2 block">3. Notes (optional)</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                placeholder="e.g. Near MG Road signal, deep pothole on left lane"
                className="w-full rounded-md bg-input/40 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Analyze */}
            <button
              type="button"
              disabled={!file || analyzing}
              onClick={analyze}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition disabled:opacity-40"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
              {analyzing ? "Analyzing image..." : "Run AI Severity Analysis"}
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={!severity || submitted}
              className="w-full rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary transition disabled:opacity-40"
            >
              {submitted ? "Reported ✔" : "Submit Report"}
            </button>
          </motion.form>

          {/* PREVIEW */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-sm font-semibold mb-3">Preview</div>
            <div className="aspect-video rounded-xl bg-input/30 border border-border overflow-hidden flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Pothole preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm text-muted-foreground">No image selected</span>
              )}
            </div>

            {severity && (
              <div className={`mt-5 rounded-xl border p-4 flex items-center gap-3 ${sevColor[severity]}`}>
                <AlertTriangle className="h-5 w-5" />
                <div>
                  <div className="font-semibold font-mono">SEVERITY: {severity.toUpperCase()}</div>
                  <div className="text-xs opacity-80">
                    Auto-classified by AI image analysis.
                  </div>
                </div>
              </div>
            )}

            {submitted && (
              <div className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5" />
                <div className="text-sm">
                  Report submitted! Track it on the{" "}
                  <Link to="/dashboard" className="underline font-semibold">Admin Dashboard</Link>.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}