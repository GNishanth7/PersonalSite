import Link from "next/link";
import TopNav from "@/components/layout/TopNav";

export default function ResumePage() {
  return (
    <div>
      <TopNav />
      <main className="cc-shell py-8 md:py-12 space-y-6">
        <section className="cc-card p-6 space-y-3">
          <p className="cc-mono text-xs cc-muted">RECRUITER SNAPSHOT</p>
          <h1 className="text-3xl font-semibold cc-gradient-text">Resume</h1>
          <p className="cc-muted">
            Fast overview for hiring teams. Keep this page concise and keep your downloadable PDF in `public/resume.pdf`.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/resume.pdf" className="cc-link cc-link-primary">
              Download PDF
            </a>
            <Link href="/contact" className="cc-link">
              Contact Directly
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="cc-card p-5">
            <h2 className="font-semibold mb-2">Core Focus</h2>
            <p className="cc-muted text-sm">AI/ML engineering, data science systems, and distributed reliability.</p>
          </article>
          <article className="cc-card p-5">
            <h2 className="font-semibold mb-2">Proof of Work</h2>
            <p className="cc-muted text-sm">Case studies with before/after metrics, architecture notes, and tradeoffs.</p>
          </article>
          <article className="cc-card p-5">
            <h2 className="font-semibold mb-2">Hiring Signal</h2>
            <p className="cc-muted text-sm">Strong problem framing, iterative execution, measurable outcomes.</p>
          </article>
        </section>
      </main>
    </div>
  );
}
