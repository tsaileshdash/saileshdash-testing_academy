"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, BookOpen, Bot, ClipboardList, X } from "lucide-react";
import {
  interviewQuestionBank,
  type InterviewQuestion,
  type QuestionBankCategory,
} from "./interviewQuestionBank";

type InterviewTrack = "Manual" | "Automation";
type InterviewSelection = InterviewTrack | QuestionBankCategory;

const isInterviewTrack = (
  selection: InterviewSelection,
): selection is InterviewTrack =>
  selection === "Manual" || selection === "Automation";

const questionBankCategories: QuestionBankCategory[] = [
  "SQL",
  "Jenkins",
  "Playwright",
  "Selenium",
  "Java",
  "JavaScript",
];

const questionBankDescriptions: Record<QuestionBankCategory, string> = {
  SQL: "Practice database concepts, query patterns, performance, and data validation questions.",
  Jenkins: "Review CI/CD pipelines, agents, credentials, test reporting, and secure build practices.",
  Playwright: "Prepare for browser automation, fixtures, locators, traces, API testing, and CI questions.",
  Selenium: "Study WebDriver, waits, locators, Grid, browser handling, and maintainable automation.",
  Java: "Review core Java and object-oriented concepts, followed by 10 coding questions with solutions.",
  JavaScript: "Review JavaScript fundamentals and asynchronous behavior, followed by 10 coding questions with solutions.",
};

const questionBankTechnologies: Record<QuestionBankCategory, string[]> = {
  SQL: ["Relational databases", "Joins & aggregation", "Indexes & query plans", "Transactions & ACID"],
  Jenkins: ["Jenkinsfile", "Declarative Pipeline", "Agents & credentials", "JUnit reports & CI triggers"],
  Playwright: ["Playwright Test", "Locators & assertions", "Browser contexts & fixtures", "Trace Viewer & CI"],
  Selenium: ["WebDriver", "Explicit waits", "Page Object Model", "Selenium Grid"],
  Java: ["OOP & collections", "Exceptions & generics", "Streams & lambdas", "JUnit / TestNG"],
  JavaScript: ["ES modules & closures", "Promises & async/await", "Arrays & objects", "Browser and Node.js testing"],
};

interface Topic {
  title: string;
  summary: string;
  questions: InterviewQuestion[];
}

const interviewTracks: Record<
  InterviewTrack,
  { intro: string; technologies: string[]; topics: Topic[] }
> = {
  Manual: {
    intro:
      "Build clear fundamentals in test design, exploratory testing, defect reporting, and collaborating throughout the delivery lifecycle.",
    technologies: [
      "Jira or Azure DevOps for work and defect tracking",
      "Test plans, test cases, checklists, and exploratory charters",
      "SQL for validating persisted application data",
      "Postman for API exploration and basic response checks",
      "Browser DevTools for console, network, and storage inspection",
    ],
    topics: [
      {
        title: "Testing fundamentals & SDLC",
        summary:
          "Explain quality activities throughout development, from requirements review through release and maintenance.",
        questions: [
          {
            question: "What is the difference between QA and testing?",
            answer:
              "Testing is the act of evaluating a product to find defects and verify behavior. QA is broader and process-focused: it aims to prevent defects by improving the way teams specify, build, review, and test software.",
          },
          {
            question: "How do verification and validation differ?",
            answer:
              "Verification asks whether work products meet their specified requirements, often through reviews and static checks. Validation asks whether the implemented product meets user needs, typically through executing the software.",
          },
          {
            question: "What would you do when requirements are unclear?",
            answer:
              "Identify the ambiguity and its risk, document concrete examples and questions, and review them with the product owner and developers. Record agreed acceptance criteria before finalizing tests, while using exploratory testing to surface additional assumptions.",
          },
        ],
      },
      {
        title: "Test design & coverage",
        summary:
          "Choose techniques that give meaningful coverage while keeping test suites focused and maintainable.",
        questions: [
          {
            question: "Explain equivalence partitioning and boundary value analysis.",
            answer:
              "Equivalence partitioning groups inputs expected to behave similarly and selects representative values from each group. Boundary value analysis focuses on the edges of those groups, where off-by-one and range defects are common.",
          },
          {
            question: "How do you prioritize test cases?",
            answer:
              "Prioritize by user and business impact, likelihood of failure, change scope, usage frequency, and dependencies. Run high-risk critical-path checks first, then broaden coverage based on available time and release risk.",
          },
          {
            question: "What is exploratory testing?",
            answer:
              "Exploratory testing combines learning, test design, and execution. Start with a charter, investigate the product, note observations and evidence, and adapt tests as new risks or behavior emerge.",
          },
        ],
      },
      {
        title: "Defects & communication",
        summary:
          "Write actionable reports that help a team reproduce, prioritize, and resolve issues.",
        questions: [
          {
            question: "What should a good bug report contain?",
            answer:
              "Include a concise title, environment/build, preconditions, exact reproduction steps, expected and actual results, impact or severity rationale, and useful evidence such as screenshots, logs, or a request trace. Keep one distinct issue per report.",
          },
          {
            question: "Severity vs. priority: what is the difference?",
            answer:
              "Severity describes the technical or user impact of a defect. Priority describes how soon the team should address it. A severe issue is often urgent, but deadlines, workarounds, exposure, and business context can change priority.",
          },
          {
            question: "What do you do if a developer cannot reproduce your bug?",
            answer:
              "Compare the exact build, environment, account, data, and timing; verify each step; then share a minimal reproduction and supporting logs or network evidence. Pair with the developer to observe the behavior and update the report with findings.",
          },
        ],
      },
      {
        title: "API, data & release testing",
        summary:
          "Use focused checks beyond the visual interface to validate service behavior and release readiness.",
        questions: [
          {
            question: "What do you validate when testing an API manually?",
            answer:
              "Check method and URL, authentication, required and invalid inputs, status code, response schema and values, headers, error handling, and relevant state changes. Also consider repeat requests, permissions, and boundary cases.",
          },
          {
            question: "How can SQL help a tester?",
            answer:
              "SQL can confirm that application actions persist expected records and relationships, identify duplicate or missing data, and validate aggregates. Use read-only queries where possible and follow least-privilege access practices.",
          },
          {
            question: "When would you recommend not releasing?",
            answer:
              "Recommend a hold when unresolved risk exceeds the team's release tolerance—for example, a reproducible critical-path failure, data integrity issue, serious security concern, or missing evidence for a high-impact change. Communicate impact and mitigations clearly.",
          },
        ],
      },
    ],
  },
  Automation: {
    intro:
      "Prepare to discuss maintainable test architecture, reliable browser automation, API coverage, CI execution, and how to reduce flaky feedback.",
    technologies: [
      "Playwright or Selenium WebDriver for browser automation",
      "TypeScript/JavaScript, Java, or Python for test code",
      "Playwright Test, JUnit/TestNG, or Pytest as test runners",
      "Page Objects or screen/component abstractions where they clarify behavior",
      "GitHub Actions, Jenkins, or GitLab CI for repeatable test pipelines",
      "Postman/Newman or REST Assured for API checks; Docker for consistent environments",
    ],
    topics: [
      {
        title: "Framework design & test strategy",
        summary:
          "Design a suite around readable behaviors, useful coverage, and feedback that teams can trust.",
        questions: [
          {
            question: "What makes a good automation candidate?",
            answer:
              "Automate stable, repeatable checks with clear outcomes that provide frequent value, such as critical journeys, regression scenarios, and data-driven variants. Avoid automating unstable behavior before requirements settle or checks whose maintenance cost exceeds their value.",
          },
          {
            question: "How would you structure an automation framework?",
            answer:
              "Separate test intent from reusable setup, domain helpers, fixtures, and configuration. Keep assertions close to the behavior they verify, make test data isolated, centralize cross-cutting reporting, and avoid building abstractions until repeated use justifies them.",
          },
          {
            question: "When would you use the Page Object Model?",
            answer:
              "Use page or component objects to encapsulate stable locators and user-level actions shared by multiple tests. Keep assertions and scenario intent visible in tests; avoid giant page objects that hide flows or create unnecessary indirection.",
          },
        ],
      },
      {
        title: "Playwright & Selenium",
        summary:
          "Understand the browser automation tools, synchronization models, and tradeoffs you use in a real test suite.",
        questions: [
          {
            question: "How does Playwright reduce flaky tests?",
            answer:
              "Playwright locators and web-first assertions auto-wait for relevant actionability or expected states. Prefer role, label, and text locators; isolate browser contexts per test; and retain traces or screenshots on failure instead of adding arbitrary sleeps.",
          },
          {
            question: "How do you wait reliably in Selenium?",
            answer:
              "Use explicit waits for a meaningful condition such as visibility, clickability, or a changed title. Avoid fixed sleeps and avoid mixing implicit and explicit waits, which can make timing behavior confusing.",
          },
          {
            question: "How do you choose between Playwright and Selenium?",
            answer:
              "Consider existing language and infrastructure, browser and grid requirements, ecosystem and team expertise, debugging features, and migration cost. Playwright offers integrated modern browser contexts and tracing; Selenium's WebDriver ecosystem and Grid are widely used across languages and existing enterprise setups.",
          },
        ],
      },
      {
        title: "Locators, waits & test isolation",
        summary:
          "Write stable tests that interact with the product like a user and do not depend on execution order.",
        questions: [
          {
            question: "Which locators do you prefer, and why?",
            answer:
              "Prefer accessible user-facing locators such as role and name or label. They reflect how users find controls and can reveal accessibility issues. Use a dedicated test ID when no suitable user-facing locator exists; avoid brittle styling or deep DOM selectors.",
          },
          {
            question: "What causes flaky UI tests?",
            answer:
              "Common causes include race conditions, shared state, weak selectors, uncontrolled external dependencies, test-order coupling, and timing assumptions. Diagnose with traces and logs, reproduce under CI-like conditions, and fix the source rather than retrying indefinitely.",
          },
          {
            question: "How do you make tests independent?",
            answer:
              "Give tests isolated browser contexts and unique data, reset or seed state through supported APIs, avoid relying on another test's output, and clean up created resources. Parallelize only after eliminating shared mutable state.",
          },
        ],
      },
      {
        title: "API automation, CI & diagnostics",
        summary:
          "Build layered coverage and give developers actionable feedback from automated runs.",
        questions: [
          {
            question: "What should an API automation test assert?",
            answer:
              "Verify status, schema, important values, headers, authorization behavior, and relevant state changes. Cover valid and invalid inputs, boundaries, and contract expectations without duplicating every UI-level assertion.",
          },
          {
            question: "How do you integrate browser tests into CI?",
            answer:
              "Run a small reliable smoke suite on pull requests and broader regression on an appropriate schedule or release gate. Pin runtime and browser versions, use deterministic fixtures, shard safely, publish reports and traces, and protect secrets using the CI platform's secret store.",
          },
          {
            question: "How do you investigate a failing pipeline test?",
            answer:
              "Check whether the failure is product, test, or environment-related. Review the exact build, logs, screenshots/video/trace, network and console errors, then reproduce with the same data and browser settings. Fix the root cause and add regression coverage if appropriate.",
          },
        ],
      },
    ],
  },
};

interface InterviewPrepProps {
  mobile?: boolean;
}

export function InterviewPrep({ mobile = false }: InterviewPrepProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<InterviewSelection | null>(
    null,
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setSelectedTrack(null);
          setIsOpen(true);
        }}
        className={
          mobile
            ? "rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            : "inline-flex items-center gap-1.5 whitespace-nowrap text-slate-600 transition-colors hover:text-royal-600 dark:text-slate-300 dark:hover:text-purple-300"
        }
      >
        Interview Prep
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-3 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="interview-prep-title"
              className="reveal-item my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-navy-950 sm:max-h-[calc(100dvh-3rem)]"
            >
              <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur dark:border-slate-800 dark:bg-navy-950/95 sm:px-7">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-royal-600 dark:text-purple-400">
                    <BookOpen className="h-4 w-4" />
                    Interview preparation
                  </span>
                  <h2
                    id="interview-prep-title"
                    className="mt-1 text-xl font-bold text-slate-950 dark:text-white sm:text-2xl"
                  >
                    {selectedTrack
                      ? `${selectedTrack} QA interview guide`
                      : "Choose your interview path"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {selectedTrack
                      ? isInterviewTrack(selectedTrack)
                        ? interviewTracks[selectedTrack].intro
                        : questionBankDescriptions[selectedTrack]
                      : "Choose Manual or Automation, or jump straight into one of the focused question banks."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close interview preparation"
                  className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="p-5 sm:p-7">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {(["Manual", "Automation", ...questionBankCategories] as const).map((track) => {
                    const selected = selectedTrack === track;
                    const isTrack = isInterviewTrack(track);
                    const Icon = track === "Manual"
                      ? ClipboardList
                      : track === "Automation"
                        ? Bot
                        : BookOpen;

                    return (
                      <button
                        key={track}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSelectedTrack(track)}
                        className={`reveal-item rounded-xl border p-4 text-left transition-colors ${
                          selected
                            ? "border-royal-500 bg-royal-500/5 ring-1 ring-royal-500 dark:border-purple-400 dark:bg-purple-500/10 dark:ring-purple-400"
                            : "border-slate-200 bg-slate-50 hover:border-royal-300 dark:border-slate-800 dark:bg-white/[0.03] dark:hover:border-purple-400/50"
                        }`}
                      >
                        <span className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                          <Icon className="h-5 w-5 text-royal-600 dark:text-purple-400" />
                          {isTrack ? `${track} interview` : `${track} questions`}
                        </span>
                        <span className="mt-2 block text-sm leading-5 text-slate-600 dark:text-slate-300">
                          {track === "Manual"
                            ? "Testing principles, test design, defects, and practical QA scenarios."
                            : track === "Automation"
                              ? "Frameworks, browser and API automation, CI pipelines, and reliability."
                              : questionBankDescriptions[track]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedTrack ? (
                  <div className="mt-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {selectedTrack} interview topics &amp; questions
                      </h3>
                      <button
                        type="button"
                        onClick={() => setSelectedTrack(null)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:underline dark:text-purple-400"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Choose another path
                      </button>
                    </div>

                    <section className="mt-4 rounded-xl border border-purple-200/70 bg-purple-50/60 p-4 dark:border-purple-400/15 dark:bg-purple-500/5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Tools &amp; technologies to know
                      </h4>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {(isInterviewTrack(selectedTrack)
                          ? interviewTracks[selectedTrack].technologies
                          : questionBankTechnologies[selectedTrack]
                        ).map(
                          (technology) => (
                            <li
                              key={technology}
                              className="flex items-start gap-2 text-sm leading-5 text-slate-700 dark:text-slate-200"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                              {technology}
                            </li>
                          ),
                        )}
                      </ul>
                    </section>

                    {isInterviewTrack(selectedTrack) ? (
                    <div className="mt-5 space-y-4">
                      {interviewTracks[selectedTrack].topics.map(
                        (topic, topicIndex) => (
                          <section
                            key={topic.title}
                            className="reveal-item rounded-xl border border-slate-200 p-4 dark:border-slate-800 sm:p-5"
                          >
                            <div className="flex items-start gap-3">
                              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-royal-500/10 text-xs font-bold text-royal-700 dark:bg-purple-500/15 dark:text-purple-300">
                                {String(topicIndex + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">
                                  {topic.title}
                                </h4>
                                <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                                  {topic.summary}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                              {topic.questions.map((item) => (
                                <details
                                  key={item.question}
                                  className="reveal-item group py-3 first:pt-0 last:pb-0"
                                >
                                  <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-slate-800 marker:hidden hover:text-royal-600 dark:text-slate-200 dark:hover:text-purple-300 [&::-webkit-details-marker]:hidden">
                                    <span className="flex items-start justify-between gap-3">
                                      {item.question}
                                      <span className="text-royal-600 transition-transform group-open:rotate-45 dark:text-purple-400">
                                        +
                                      </span>
                                    </span>
                                  </summary>
                                  {item.code ? (
                                    <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-3 pr-6 font-mono text-xs leading-5 text-slate-100">
                                      <code>{item.answer}</code>
                                    </pre>
                                  ) : (
                                    <p className="mt-2 pr-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                      {item.answer}
                                    </p>
                                  )}
                                </details>
                              ))}
                            </div>
                          </section>
                        ),
                      )}
                    </div>
                    ) : (
                      <div className="mt-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800 sm:p-5">
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          30 {selectedTrack} interview questions
                        </h4>
                        <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                          {interviewQuestionBank[selectedTrack].map((item, index) => (
                            <details
                              key={item.question}
                              className="group py-3 first:pt-0 last:pb-0"
                            >
                              <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-slate-800 marker:hidden hover:text-royal-600 dark:text-slate-200 dark:hover:text-purple-300 [&::-webkit-details-marker]:hidden">
                                <span className="flex items-start gap-3">
                                  <span className="shrink-0 font-mono text-xs text-slate-400">
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <span className="flex flex-1 items-start justify-between gap-3">
                                    {item.question}
                                    <span className="text-royal-600 transition-transform group-open:rotate-45 dark:text-purple-400">
                                      +
                                    </span>
                                  </span>
                                </span>
                              </summary>
                              {item.code ? (
                                <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 pl-9 font-mono text-xs leading-5 text-slate-100">
                                  <code>{item.answer}</code>
                                </pre>
                              ) : (
                                <p className="mt-2 pl-9 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                  {item.answer}
                                </p>
                              )}
                            </details>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
                    Choose a path to see topic guides, common questions, and
                    sample answer guidance.
                  </p>
                )}
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
