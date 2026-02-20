"use client";

import { useMemo, useState } from "react";
import TopNav from "@/components/layout/TopNav";
import {
  journeyStories,
  storyCategoryLabels,
  type StoryCategory,
} from "@/data/journey";

const filterOptions: Array<{ value: "all" | StoryCategory; label: string }> = [
  { value: "all", label: "All" },
  { value: "hackathon", label: "Hackathons" },
  { value: "academic", label: "Academic" },
  { value: "product", label: "Product Builds" },
  { value: "research", label: "Research" },
  { value: "internship", label: "Internship" },
  { value: "achievement", label: "Achievements" },
];

export default function JourneyPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | StoryCategory>("all");

  const filteredStories = useMemo(() => {
    if (activeFilter === "all") return journeyStories;
    return journeyStories.filter((story) => story.category === activeFilter);
  }, [activeFilter]);

  return (
    <div>
      <TopNav />
      <main className="cc-shell py-8 md:py-12 space-y-6">
        <section className="cc-card p-6 space-y-3">
          <p className="cc-mono text-xs cc-muted">PORTFOLIO V2.0 - JOURNEY STORIES</p>
          <h1 className="text-3xl md:text-4xl font-semibold cc-gradient-text">
            How I Built Up My Engineering Journey
          </h1>
          <p className="cc-muted max-w-3xl">
            This section captures the real journey: hackathons, college projects, Trinity work, dissertation research, and internship execution. Each story follows context, challenge, role, action, result, and learning.
          </p>
        </section>

        <section className="cc-card p-5 md:p-6 space-y-4">
          <p className="cc-mono text-xs cc-muted">FILTER STORIES</p>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setActiveFilter(option.value)}
                  className={`cc-chip transition-colors ${
                    isActive ? "cc-link-primary text-white" : "cc-muted"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          {filteredStories.map((story) => (
            <details key={story.id} className="cc-card p-5 md:p-6 group" open={false}>
              <summary className="list-none cursor-pointer">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs cc-mono cc-muted">{story.period}</p>
                    <h2 className="text-xl font-semibold">{story.title}</h2>
                    <p className="text-sm cc-muted">{story.context}</p>
                  </div>
                  <span className="cc-chip cc-mono">
                    {storyCategoryLabels[story.category]}
                  </span>
                </div>
                <p className="text-sm mt-3">
                  <span className="font-semibold">Challenge:</span> {story.challenge}
                </p>
                <p className="text-xs cc-muted mt-2 group-open:hidden">Click to expand full story</p>
              </summary>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <article className="cc-subcard p-4 space-y-3">
                  <h3 className="font-semibold">My Role</h3>
                  <p className="text-sm">{story.role}</p>
                  <div>
                    <p className="font-semibold text-sm mb-2">What I Did</p>
                    <ul className="space-y-2 text-sm">
                      {story.actions.map((action) => (
                        <li key={action}>- {action}</li>
                      ))}
                    </ul>
                  </div>
                </article>

                <article className="cc-subcard p-4 space-y-3">
                  <h3 className="font-semibold">Outcome</h3>
                  <p className="text-sm">{story.result}</p>
                  <div>
                    <p className="font-semibold text-sm mb-2">What I Learned</p>
                    <ul className="space-y-2 text-sm">
                      {story.lessons.map((lesson) => (
                        <li key={lesson}>- {lesson}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {story.tags.map((tag) => (
                      <span key={tag} className="cc-chip text-xs cc-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </details>
          ))}
        </section>
      </main>
    </div>
  );
}
