"use client";

import { useState } from "react";
import { CheckSquare, Square } from "lucide-react";
import { CAREER_TRACKS } from "@/data/qaPlatformData";

export default function RoadmapsPage() {
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>({});

  const toggleCheckpoint = (id: string) => {
    setCompletedCheckpoints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-royal-600 dark:text-purple-400">
          Career Roadmaps
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
          Stage-by-Stage QA &amp; SDET Learning Paths
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Each track pairs core technical milestones with a practical checkpoint you can verify
          before moving to the next stage.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {CAREER_TRACKS.map((track, index) => {
          const isDone = Boolean(completedCheckpoints[track.id]);
          return (
            <section
              key={track.id}
              className="reveal-item rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900/50 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-royal-600/10 px-3 py-1 text-xs font-semibold text-royal-600 dark:bg-purple-500/15 dark:text-purple-300">
                  Track 0{index + 1} • {track.audience}
                </span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {track.durationEstimate}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{track.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{track.summary}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {track.coreModules.map((module, mIdx) => (
                  <div
                    key={module}
                    className="reveal-item rounded-lg border border-slate-200/80 bg-slate-50 p-3.5 text-sm font-medium text-slate-800 dark:border-slate-800 dark:bg-navy-950 dark:text-slate-200"
                  >
                    <span className="mr-2 font-mono text-xs text-royal-600 dark:text-purple-400">
                      {String(mIdx + 1).padStart(2, "0")}
                    </span>
                    {module}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-purple-500/25 bg-purple-500/5 p-4">
                <button
                  type="button"
                  onClick={() => toggleCheckpoint(track.id)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  {isDone ? (
                    <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-royal-600 dark:text-purple-400" />
                  ) : (
                    <Square className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                      Completion Checkpoint {isDone ? "(Completed)" : "(Mark as Done)"}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                      {track.checkpoint}
                    </p>
                  </div>
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
