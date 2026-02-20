"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Mission } from "@/data/missions";

type HighlightFilter = "all" | "systems" | "ai" | "research";

const highlights: Array<{ key: HighlightFilter; label: string; hint: string }> = [
  { key: "all", label: "All", hint: "Everything" },
  { key: "systems", label: "Systems", hint: "Scalability + reliability" },
  { key: "ai", label: "AI/ML", hint: "Model + product execution" },
  { key: "research", label: "Research", hint: "Deep experimentation" },
];

function matchesFilter(mission: Mission, filter: HighlightFilter) {
  const domain = mission.domain.toLowerCase();
  if (filter === "all") return true;
  if (filter === "systems") {
    return (
      domain.includes("system") ||
      domain.includes("distributed") ||
      domain.includes("mobile")
    );
  }
  if (filter === "ai") {
    return (
      domain.includes("ai") ||
      domain.includes("generative") ||
      domain.includes("ml") ||
      domain.includes("vision") ||
      domain.includes("speech") ||
      domain.includes("rag") ||
      domain.includes("retrieval") ||
      domain.includes("agent")
    );
  }
  return (
    domain.includes("research") ||
    domain.includes("quantum")
  );
}

export default function InteractiveProjectFeed({ missions }: { missions: Mission[] }) {
  const [filter, setFilter] = useState<HighlightFilter>("all");
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const filteredMissions = useMemo(
    () => missions.filter((mission) => matchesFilter(mission, filter)),
    [missions, filter]
  );

  const activeMission =
    filteredMissions.find((mission) => mission.id === activeMissionId) ?? null;

  const activeMissionIndex = activeMission
    ? filteredMissions.findIndex((mission) => mission.id === activeMission.id)
    : -1;

  const openMission = (missionId: string) => {
    setActiveMissionId(missionId);
    setPhaseIndex(0);
  };

  const closeMission = () => {
    setActiveMissionId(null);
    setPhaseIndex(0);
  };

  const moveMission = useCallback(
    (direction: -1 | 1) => {
      if (!activeMission || filteredMissions.length === 0) return;
      const nextIndex =
        (activeMissionIndex + direction + filteredMissions.length) %
        filteredMissions.length;
      setActiveMissionId(filteredMissions[nextIndex].id);
      setPhaseIndex(0);
    },
    [activeMission, activeMissionIndex, filteredMissions]
  );

  useEffect(() => {
    if (!activeMission) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMission();
      if (event.key === "ArrowRight") moveMission(1);
      if (event.key === "ArrowLeft") moveMission(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMission, moveMission]);

  return (
    <>
      <section className="cc-card p-5 md:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="cc-mono text-xs cc-muted">INTERACTIVE HIGHLIGHTS</p>
          <p className="text-xs cc-muted">Tap to filter</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {highlights.map((item) => {
            const isActive = filter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`flex flex-col items-center gap-2 text-xs transition-colors ${
                  isActive ? "text-black" : "cc-muted"
                }`}
              >
                <span className="cc-ring h-14 w-14">
                  <span className="block h-full w-full rounded-full bg-white" />
                </span>
                <span className="font-semibold">{item.label}</span>
                <span className="cc-muted">{item.hint}</span>
                <span
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: isActive ? "2.25rem" : "0.75rem",
                    background:
                      "linear-gradient(120deg, var(--accent-a), var(--accent-b), var(--accent-c))",
                  }}
                />
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">
            Project Feed ({filteredMissions.length})
          </h2>
          <Link href="/missions" className="cc-muted text-sm hover:text-black">
            open archive
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {filteredMissions.map((mission) => (
            <article key={mission.id} className="cc-post-tile group">
              <button
                type="button"
                onClick={() => openMission(mission.id)}
                className="w-full text-left aspect-square p-4 flex flex-col justify-between cc-post-fill transition-transform group-hover:-translate-y-0.5"
              >
                <p className="text-xs cc-mono cc-muted">{mission.domain}</p>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">{mission.title}</h3>
                  <p className="text-xs mt-2" style={{ color: "var(--green)" }}>
                    {mission.headlineMetric}
                  </p>
                </div>
                <p className="text-xs cc-muted">quick view</p>
              </button>
              <div className="px-3 pb-3">
                <Link href={`/missions/${mission.id}`} className="cc-link text-xs inline-block">
                  full case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeMission && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMission}
            aria-label="Close quick view"
          />
          <article
            role="dialog"
            aria-modal="true"
            className="relative cc-card w-full max-w-4xl max-h-[90vh] overflow-y-auto p-5 md:p-6 space-y-5"
          >
            <header className="flex items-start justify-between gap-3">
              <div>
                <p className="cc-mono text-xs cc-muted">{activeMission.domain}</p>
                <h3 className="text-2xl font-semibold">{activeMission.title}</h3>
                <p className="text-sm cc-muted mt-1">{activeMission.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="cc-chip"
                  onClick={() =>
                    setLiked((previous) => ({
                      ...previous,
                      [activeMission.id]: !previous[activeMission.id],
                    }))
                  }
                >
                  {liked[activeMission.id] ? "Saved" : "Save"}
                </button>
                <button type="button" className="cc-chip" onClick={closeMission}>
                  Close
                </button>
              </div>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <section className="cc-subcard p-4 space-y-3">
                <p className="cc-mono text-xs cc-muted">MISSION BRIEF</p>
                <p className="text-sm">{activeMission.challenge}</p>
                <div className="flex flex-wrap gap-2">
                  {activeMission.stack.map((tech) => (
                    <span key={tech} className="cc-chip cc-mono text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm" style={{ color: "var(--green)" }}>
                  {activeMission.headlineMetric}
                </p>
              </section>

              <section className="cc-subcard p-4 space-y-3">
                <p className="cc-mono text-xs cc-muted">TIMELINE VIEWER</p>
                <div className="flex flex-wrap gap-2">
                  {activeMission.phases.map((phase, index) => (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => setPhaseIndex(index)}
                      className={`cc-chip cc-mono text-xs ${
                        phaseIndex === index ? "cc-link-primary text-white" : ""
                      }`}
                    >
                      T{index}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">{activeMission.phases[phaseIndex].label}</p>
                  <p className="text-sm">{activeMission.phases[phaseIndex].snapshot}</p>
                  <p className="text-xs cc-muted">{activeMission.phases[phaseIndex].note}</p>
                  <p className="text-sm" style={{ color: "var(--amber)" }}>
                    {activeMission.phases[phaseIndex].metricDelta}
                  </p>
                </div>
              </section>
            </div>

            <footer className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button type="button" className="cc-link" onClick={() => moveMission(-1)}>
                  Prev
                </button>
                <button type="button" className="cc-link" onClick={() => moveMission(1)}>
                  Next
                </button>
              </div>
              <p className="text-xs cc-muted">Keyboard: Esc, Left, Right</p>
            </footer>
          </article>
        </div>
      )}
    </>
  );
}
