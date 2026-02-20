import Link from "next/link";
import TopNav from "@/components/layout/TopNav";
import { missions } from "@/data/missions";

export default function MissionsPage() {
  return (
    <div>
      <TopNav />
      <main className="cc-shell py-8 md:py-12 space-y-6">
        <section className="cc-card p-6">
          <p className="cc-mono text-xs cc-muted">PROJECT ARCHIVE</p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-2 cc-gradient-text">All Portfolio Posts</h1>
          <p className="cc-muted mt-2">
            Instagram-inspired browsing flow with technical depth behind every post.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {missions.map((mission) => (
            <Link
              key={mission.id}
              href={`/missions/${mission.id}`}
              className="cc-post-tile block hover:scale-[1.01] transition-transform"
            >
              <div className="aspect-square p-4 flex flex-col justify-between cc-post-fill">
                <div>
                  <p className="text-xs cc-mono cc-muted">{mission.domain}</p>
                  <h2 className="text-lg font-semibold mt-2 leading-tight">{mission.title}</h2>
                </div>
                <p className="text-xs" style={{ color: "var(--green)" }}>
                  {mission.headlineMetric}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
