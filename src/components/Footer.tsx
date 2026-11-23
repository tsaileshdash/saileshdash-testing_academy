import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-bold text-slate-900 dark:text-white">QA Career Hub</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Practical learning roadmaps, testing tool guides, and career progression for
              Software Testers, Automation Engineers, and SDETs.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Phase 1 Modules</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/roadmaps" className="hover:text-royal-600 dark:hover:text-purple-400">
                  Career Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-royal-600 dark:hover:text-purple-400">
                  Testing Tools &amp; Technologies Hub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Content Transparency
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Curricula, checkpoints, and architecture guides are editorial recommendations.
              External tool comparisons and trend notes display publication and verification dates.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
