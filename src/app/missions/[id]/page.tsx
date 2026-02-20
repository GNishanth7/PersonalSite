import Link from "next/link";
import { notFound } from "next/navigation";
import TopNav from "@/components/layout/TopNav";
import { missions } from "@/data/missions";

type Props = {
  params: Promise<{ id: string }>;
};

const phaseNames = ["T0", "T1", "T2", "T3", "T4"];

export default async function MissionDetailPage({ params }: Props) {
  const { id } = await params;
  const mission = missions.find((item) => item.id === id);

  if (!mission) notFound();

  return (
    <div>
      <TopNav />
      <main className="cc-shell py-8 md:py-12">
        <article className="cc-card overflow-hidden">
          <header
            className="flex items-center justify-between gap-3 border-b p-4"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <p className="text-sm font-semibold">{mission.title}</p>
              <p className="text-xs cc-muted">{mission.domain}</p>
            </div>
            <span className="cc-chip cc-mono">{mission.duration}</span>
          </header>

          <div className="grid md:grid-cols-[1.05fr,0.95fr]">
            <section
              className="border-b md:border-b-0 md:border-r"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="aspect-square p-6 flex flex-col justify-between cc-post-fill">
                <p className="cc-mono text-xs cc-muted">POST PREVIEW</p>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold">{mission.title}</h1>
                  <p className="cc-muted mt-2">{mission.challenge}</p>
                </div>
                <p className="text-sm" style={{ color: "var(--green)" }}>
                  {mission.headlineMetric}
                </p>
              </div>
            </section>

            <section className="p-5 space-y-5">
              <div className="space-y-2">
                <p className="cc-mono text-xs cc-muted">CAPTION</p>
                <p className="text-sm">
                  <span className="font-semibold">@nishanth</span>{" "}
                  {mission.role}. Built with {mission.stack.join(", ")}. Focus: measurable impact and explicit tradeoffs.
                </p>
              </div>

              <div className="space-y-3">
                <p className="cc-mono text-xs cc-muted">TIMELINE CHECKPOINTS</p>
                {mission.phases.map((phase, index) => (
                  <div key={phase.id} className="cc-subcard p-3">
                    <p className="cc-mono text-xs" style={{ color: "var(--cyan)" }}>
                      {phaseNames[index]} {phase.label}
                    </p>
                    <p className="text-sm mt-1">{phase.snapshot}</p>
                    <p className="text-xs cc-muted mt-1">{phase.note}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--amber)" }}>
                      {phase.metricDelta}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="cc-mono text-xs cc-muted">TRADEOFF NOTE</p>
                <p className="text-sm">{mission.growthEdge}</p>
              </div>
            </section>
          </div>

          <footer className="border-t p-4 flex flex-wrap gap-3" style={{ borderColor: "var(--line)" }}>
            <Link href="/missions" className="cc-link">
              Back to Feed
            </Link>
            <Link href="/operator" className="cc-link cc-link-primary">
              Strengths & Levels
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
