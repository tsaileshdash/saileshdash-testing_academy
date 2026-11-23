"use client";

import { useMemo, useState } from "react";
import { Code2, Search, Sparkles, Wrench } from "lucide-react";
import { TESTING_TOOLS, type TestingTool } from "@/data/qaPlatformData";

const CATEGORIES: Array<"All" | TestingTool["category"]> = [
  "All",
  ...Array.from(new Set(TESTING_TOOLS.map((tool) => tool.category))),
];

export default function ToolsHubPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return TESTING_TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      const searchableContent = [
        tool.name,
        tool.category,
        tool.summary,
        tool.realWorldUse,
        tool.effectiveUse,
        ...tool.keyStrengths,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableContent.includes(normalizedQuery);
    });
  }, [query, selectedCategory]);

  return (
    <div className="min-h-full">
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-purple-50/70 py-14 dark:border-slate-800 dark:from-navy-950 dark:via-navy-950 dark:to-purple-950/30 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-400/20 dark:bg-white/5 dark:text-purple-300">
              <Sparkles className="h-3.5 w-3.5" />
              QA tools, patterns &amp; examples
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Your QA Automation{" "}
              <span className="bg-gradient-to-r from-royal-600 to-purple-600 bg-clip-text text-transparent">
                Toolkit
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Explore the tools used across UI, API, performance, CI/CD, and AI
              testing. Each guide includes a practical example and tips for
              getting reliable results.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-white/5">
                <Wrench className="h-4 w-4 text-royal-600 dark:text-purple-400" />
                {TESTING_TOOLS.length} tool guides
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-white/5">
                <Code2 className="h-4 w-4 text-royal-600 dark:text-purple-400" />
                Examples you can adapt
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-md">
            <span className="sr-only">Search QA tools</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools, use cases, or strengths..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 dark:border-slate-700 dark:bg-navy-900 dark:text-white"
            />
          </label>

          <div className="flex flex-wrap gap-2" aria-label="Filter by category">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                    isSelected
                      ? "bg-royal-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-royal-300 hover:text-royal-700 dark:border-slate-800 dark:bg-navy-900 dark:text-slate-300 dark:hover:border-purple-400/40 dark:hover:text-purple-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
          Showing {filteredTools.length} of {TESTING_TOOLS.length} tools
        </p>

        {filteredTools.length > 0 ? (
          <div className="mt-4 grid items-start gap-6 xl:grid-cols-2">
            {filteredTools.map((tool) => (
              <article
                key={tool.slug}
                className="reveal-item overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-navy-900/60"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-royal-500/10 px-3 py-1 text-xs font-semibold text-royal-700 dark:bg-purple-500/15 dark:text-purple-300">
                      {tool.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {tool.slug}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-slate-950 dark:text-white sm:text-2xl">
                    {tool.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {tool.summary}
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-navy-950/80">
                      <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Common use
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                        {tool.realWorldUse}
                      </p>
                    </div>
                    <div className="rounded-xl border border-purple-200/70 bg-purple-50/60 p-4 dark:border-purple-400/15 dark:bg-purple-500/5">
                      <h3 className="text-xs font-bold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                        Use it effectively
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                        {tool.effectiveUse}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Key strengths
                    </h3>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                      {tool.keyStrengths.map((strength) => (
                        <li
                          key={strength}
                          className="flex items-start gap-2 text-sm leading-5 text-slate-700 dark:text-slate-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-500 dark:bg-purple-400" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-800 bg-[#0b1220] text-slate-100">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                      <h3 className="text-xs font-semibold text-slate-200">
                        Basic example
                      </h3>
                      <span className="rounded bg-white/10 px-2 py-1 font-mono text-[11px] text-slate-300">
                        {tool.exampleLanguage}
                      </span>
                    </div>
                    <pre className="overflow-x-auto p-4 text-xs leading-5 sm:text-[13px]">
                      <code>{tool.exampleCode}</code>
                    </pre>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Keep in mind:
                    </span>{" "}
                    {tool.tradeoffs}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-slate-700">
            <Search className="mx-auto h-8 w-8 text-slate-400" />
            <h2 className="mt-3 font-semibold text-slate-900 dark:text-white">
              No matching tools
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Try another search or choose a different category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
