import TopNav from "@/components/layout/TopNav";
import { profile } from "@/data/missions";

export default function OperatorPage() {
  return (
    <div>
      <TopNav />
      <main className="cc-shell py-8 md:py-12 space-y-6">
        <section className="cc-card p-6">
          <p className="cc-mono text-xs cc-muted">OPERATOR PROFILE</p>
          <h1 className="text-3xl font-semibold mt-2 cc-gradient-text">{profile.name}</h1>
          <p className="cc-muted">{profile.title}</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="cc-card p-6 space-y-3">
            <h2 className="text-xl font-semibold">Strength Matrix</h2>
            {profile.strengths.map((item) => (
              <article key={item.name} className="cc-subcard p-3">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="cc-muted text-sm">{item.proof}</p>
              </article>
            ))}
          </div>

          <div className="cc-card p-6 space-y-3">
            <h2 className="text-xl font-semibold">Growth Areas</h2>
            {profile.growthAreas.map((item) => (
              <article key={item.name} className="cc-subcard p-3">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="cc-muted text-sm">{item.action}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cc-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Level Board</h2>
          <div className="space-y-3">
            {profile.levels.map((item) => (
              <div key={item.skill}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{item.skill}</span>
                  <span className="cc-mono">L{item.level}</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full"
                  style={{ background: "color-mix(in srgb, var(--line) 70%, var(--panel) 30%)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.level * 10}%`,
                      background: "linear-gradient(120deg, var(--accent-a), var(--accent-b) 58%, var(--accent-c))",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
