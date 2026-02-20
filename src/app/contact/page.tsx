import TopNav from "@/components/layout/TopNav";

export default function ContactPage() {
  return (
    <div>
      <TopNav />
      <main className="cc-shell py-8 md:py-12 space-y-6">
        <section className="cc-card p-6 space-y-3">
          <p className="cc-mono text-xs cc-muted">DIRECT CHANNEL</p>
          <h1 className="text-3xl font-semibold cc-gradient-text">Contact</h1>
          <p className="cc-muted">
            Best path for hiring discussions: email with role context, team goals, and timeline.
          </p>
          <div className="space-y-2">
            <p>
              Email:{" "}
              <a href="mailto:nishanthgopi2002@gmail.com" style={{ color: "var(--cyan)" }}>
                nishanthgopi2002@gmail.com
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a href="https://github.com/GNishanth7" target="_blank" rel="noreferrer" style={{ color: "var(--cyan)" }}>
                github.com/GNishanth7
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a href="https://www.linkedin.com/in/nishanth-gopinath/" target="_blank" rel="noreferrer" style={{ color: "var(--cyan)" }}>
                linkedin.com/in/nishanth-gopinath
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
