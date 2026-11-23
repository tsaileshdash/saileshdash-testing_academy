import Link from "next/link";
import { ArrowRight, Compass, Wrench, TrendingUp, CheckCircle2 } from "lucide-react";
import { CAREER_TRACKS, TESTING_TOOLS, LATEST_TRENDS } from "@/data/qaPlatformData";

export default function HomePage() {
  return (
    <div>
      <section className="reveal-item relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-navy-900 via-navy-950 to-slate-950 py-20 text-white dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
              Phase 1 • Roadmaps &amp; Tools Hub
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Build Your Future in Software Testing &amp; Quality Engineering
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              From Fresher to Automation Expert to SDET – Your Complete Roadmap to a Successful QA
              Career.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/roadmaps" className="inline-flex items-center gap-2 rounded-lg bg-royal-500 px-5 py-3 text-sm font-semibold text-white hover:bg-royal-600 transition-colors">
                Start Your QA Journey <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/roadmaps" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-white hover:border-purple-400/60 transition-colors">
                <Compass className="h-4 w-4 text-purple-400" /> Explore Career Roadmaps
              </Link>
              <Link href="/tools" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-white hover:border-royal-400/60 transition-colors">
                <Wrench className="h-4 w-4 text-royal-400" /> Explore Testing Tools
              </Link>
              <a href="#latest-trends" className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 transition-colors">
                <TrendingUp className="h-4 w-4 text-purple-300" /> Explore Latest QA Trends
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmaps" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-royal-600 dark:text-purple-400">Choose Your Career Path</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Structured Learning Roadmaps</h2>
          </div>
          <Link href="/roadmaps" className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:underline dark:text-purple-400">
            View full syllabus &amp; checkpoints <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {CAREER_TRACKS.map((track) => (
            <div key={track.id} className="reveal-item flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-navy-900/50">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-medium">
                  <span className="rounded-md bg-royal-500/10 px-2.5 py-1 text-royal-600 dark:text-purple-300">{track.audience}</span>
                  <span className="text-slate-500 dark:text-slate-400">{track.durationEstimate}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{track.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{track.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {track.coreModules.map((mod) => (
                    <li key={mod} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-royal-600 dark:text-purple-400" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                <Link href="/roadmaps" className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:text-royal-500 dark:text-purple-400">
                  Open Roadmap <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="tools" className="border-y border-slate-200 bg-slate-50/70 py-16 dark:border-slate-800 dark:bg-navy-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-royal-600 dark:text-purple-400">Testing Tools &amp; Technologies Hub</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Tools Used in Real-World QA Teams</h2>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:underline dark:text-purple-400">
              Search all tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TESTING_TOOLS.slice(0, 4).map((tool) => (
              <div key={tool.slug} className="reveal-item rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-navy-900">
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">{tool.category}</span>
                <h3 className="mt-1.5 text-lg font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="latest-trends" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-royal-600 dark:text-purple-400">Latest IT Testing Trends</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Current Signals &amp; Editorial Notes</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {LATEST_TRENDS.map((item) => (
            <article key={item.id} className="reveal-item rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900/50">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="rounded bg-purple-500/10 px-2.5 py-0.5 font-medium text-purple-700 dark:text-purple-300">{item.type}</span>
                <span>Published: {item.publishedDate} • Verified: {item.verifiedDate}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.summary}</p>
              <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">Source: {item.sourceLabel}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
