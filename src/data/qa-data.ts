export interface CareerTrack {
  id: string;
  title: string;
  audience: string;
  durationEstimate: string;
  summary: string;
  coreModules: string[];
  checkpoint: string;
}

export interface TestingTool {
  slug: string;
  name: string;
  category:
    | "Manual Testing"
    | "Automation Testing"
    | "Programming"
    | "API Testing"
    | "Performance Testing"
    | "CI/CD & DevOps"
    | "AI Testing";
  summary: string;
  realWorldUse: string;
  keyStrengths: string[];
  tradeoffs: string;
}

export interface TrendItem {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  verifiedDate: string;
  sourceLabel: string;
  summary: string;
  type: "Verified Industry Signal" | "Editorial Guidance";
}

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: "fresher-qa",
    title: "Fresher Roadmap — Become a Software Tester",
    audience: "Graduates & Career Starters",
    durationEstimate: "8–12 Weeks (Self-Paced)",
    summary:
      "Build rock-solid foundations across SDLC/STLC, test design, defect life cycles, SQL, API basics with Postman, Git, and resume/interview readiness.",
    coreModules: [
      "SDLC & STLC + Test Levels",
      "Equivalence Partitioning & Boundary Value Analysis",
      "Bug Life Cycle, Jira & SQL Fundamentals",
      "Postman API Basics, Git/GitHub & Mock Interviews",
    ],
    checkpoint:
      "Write 25+ structured test cases, log realistic bug reports with logs/screenshots, run SQL joins, and execute a Postman collection on a sample API.",
  },
  {
    id: "manual-to-automation",
    title: "Manual Tester to Automation Tester",
    audience: "Manual QA Engineers",
    durationEstimate: "10–16 Weeks",
    summary:
      "Transition from manual execution to maintainable code-based UI and API test automation using Java or Python, Selenium/Playwright, test runners, and CI.",
    coreModules: [
      "Java or Python + OOP, Collections & Exception Handling",
      "Selenium WebDriver or Playwright + Page Object Model",
      "TestNG / JUnit / Pytest + Maven / Gradle",
      "BDD/Cucumber, API Automation & Jenkins Pipelines",
    ],
    checkpoint:
      "Build an end-to-end Page Object Model framework with reporting, API test setup/teardown, and automated execution triggered from CI.",
  },
  {
    id: "automation-to-sdet",
    title: "Automation Tester to SDET",
    audience: "Automation Engineers & Senior QA",
    durationEstimate: "14–20 Weeks",
    summary:
      "Architect scalable test platforms across microservices, distributed systems, containers, cloud environments, performance/security checks, and AI-assisted workflows.",
    coreModules: [
      "Test Architecture, Design Patterns & Microservices Testing",
      "Playwright / REST Assured / Contract & DB Testing",
      "Docker, Cloud Testing, k6/JMeter & Security Basics",
      "AI-Assisted Test Generation, LLM/Agent QA & Coding/DSA",
    ],
    checkpoint:
      "Design a containerized test suite running in CI/CD with service/API coverage, load thresholds, and clear flakiness/observability diagnostics.",
  },
  {
    id: "specialized-paths",
    title: "Specialized QA Career Paths",
    audience: "Domain & Leadership Track",
    durationEstimate: "Ongoing / Role-Specific",
    summary:
      "Focused tracks for API Testing Specialist, Performance Engineer, Security QA, Mobile QA, Salesforce QA, ETL/Data Warehouse QA, AI/ML QA, Accessibility, Cloud QA, and QE Lead.",
    coreModules: [
      "API, Performance (JMeter/k6) & Security Testing",
      "Mobile (Appium), Salesforce & Data Warehouse/ETL Testing",
      "AI/ML & LLM Evaluation + WCAG Accessibility Testing",
      "Cloud Testing & Quality Engineering Leadership",
    ],
    checkpoint:
      "Complete a domain capstone (e.g., ETL row/schema reconciliation, k6 load profile, or WCAG audit) mapped to target job descriptions.",
  },
];

export const TESTING_TOOLS: TestingTool[] = [
  {
    slug: "playwright",
    name: "Playwright",
    category: "Automation Testing",
    summary:
      "Modern cross-browser end-to-end testing framework supporting Chromium, Firefox, and WebKit with auto-waiting, network interception, and trace debugging.",
    realWorldUse:
      "Web UI regression suites, API + UI hybrid test flows, visual screenshot assertions, and parallel CI sharding.",
    keyStrengths: [
      "Built-in auto-waiting reduces timing flakiness",
      "Rich trace viewer with DOM snapshots and network logs",
      "Native multi-context, auth state reuse, and parallelization",
    ],
    tradeoffs:
      "Primarily focused on web browsers; pair with dedicated tools (such as Appium) for native mobile apps.",
  },
  {
    slug: "selenium",
    name: "Selenium WebDriver",
    category: "Automation Testing",
    summary:
      "W3C WebDriver standard browser automation ecosystem widely adopted across enterprise organizations using Java, Python, C#, and JavaScript.",
    realWorldUse:
      "Large multi-language enterprise test suites and legacy browser compatibility requirements.",
    keyStrengths: [
      "Broad language bindings (Java, Python, C#, JS/TS)",
      "Massive enterprise ecosystem and community support",
      "Flexible grid/cloud execution integrations",
    ],
    tradeoffs:
      "Requires explicit wait strategies and framework boilerplate compared to newer browser automation tools.",
  },
  {
    slug: "cypress",
    name: "Cypress",
    category: "Automation Testing",
    summary:
      "JavaScript/TypeScript front-end testing runner known for interactive time-travel debugging and strong component testing ergonomics.",
    realWorldUse:
      "Front-end web applications and isolated UI component testing in modern JS codebases.",
    keyStrengths: [
      "Interactive test runner with DOM snapshots per command",
      "Mature component testing experience for front-end frameworks",
      "Fast local feedback loop during UI development",
    ],
    tradeoffs:
      "Operates in a browser-centric execution model with tighter constraints around multi-tab/cross-origin flows than out-of-process runners.",
  },
  {
    slug: "postman",
    name: "Postman",
    category: "API Testing",
    summary:
      "API client and collaboration platform for designing, inspecting, scripting, and running REST, GraphQL, and automated collection checks.",
    realWorldUse:
      "Exploratory API debugging, contract/status/schema assertions, environment management, and Newman/CLI regression runs.",
    keyStrengths: [
      "Fast request building and environment variable switching",
      "JavaScript pre-request and post-response test scripts",
      "Team sharing of collections and mock servers",
    ],
    tradeoffs:
      "Large code-heavy test suites with complex version-controlled helpers often move into code frameworks like REST Assured or Playwright API tests.",
  },
  {
    slug: "jmeter",
    name: "Apache JMeter",
    category: "Performance Testing",
    summary:
      "Open-source Java-based load and performance testing tool for simulating concurrent users across HTTP/HTTPS APIs, web endpoints, and protocols.",
    realWorldUse:
      "Baseline load testing, stress/spike scenarios, response time percentile analysis, and CI non-GUI performance runs.",
    keyStrengths: [
      "Mature open-source load generation with rich protocol support",
      "Supports parameterized CSV data sets and distributed/CLI execution",
      "Extensive ecosystem of plugins and listeners",
    ],
    tradeoffs:
      "XML `.jmx` test plans require disciplined conventions and code review practices; heavy thread counts require careful JVM tuning.",
  },
  {
    slug: "k6",
    name: "Grafana k6",
    category: "Performance Testing",
    summary:
      "Developer-friendly load testing tool scripted in JavaScript, designed for performance-as-code workflows and CI/CD threshold gates.",
    realWorldUse:
      "API throughput/latency testing, staged ramp-up profiles, and automated pass/fail SLO checks in pipelines.",
    keyStrengths: [
      "Tests written as version-controlled JavaScript code",
      "Built-in thresholds and clear latency metrics",
      "Fits naturally into Git workflows and modern observability stacks",
    ],
    tradeoffs:
      "Runs on a Go runtime with a JS test API rather than full Node.js/browser DOM execution inside virtual users.",
  },
  {
    slug: "github-actions",
    name: "GitHub Actions",
    category: "CI/CD & DevOps",
    summary:
      "Event-driven CI/CD automation platform integrated directly with GitHub repositories for running build, lint, unit, API, and E2E test workflows.",
    realWorldUse:
      "Pull-request test gates, nightly regression suites, matrix runs across OS/browsers, and artifact/report uploads.",
    keyStrengths: [
      "Native GitHub PR triggers, secrets management, and caching",
      "Matrix builds for parallel test execution",
      "Easy artifact archiving for screenshots, traces, and test reports",
    ],
    tradeoffs:
      "Hosted runner minutes and caching limits need monitoring on heavy E2E or containerized test suites.",
  },
  {
    slug: "llm-agent-qa",
    name: "LLM & AI Agent Testing",
    category: "AI Testing",
    summary:
      "Structured evaluation and guardrail testing for LLM-powered features and AI agents—covering grounding, tool-calling accuracy, prompt regression, and safety.",
    realWorldUse:
      "RAG answer faithfulness checks, agent workflow verification, prompt/model upgrade regression suites, and adversarial/red-team test sets.",
    keyStrengths: [
      "Catches non-deterministic regressions across model or prompt updates",
      "Validates tool invocation arguments, permissions, and fallback paths",
      "Pairs deterministic assertions with rubric/LLM-as-a-judge evaluations",
    ],
    tradeoffs:
      "Probabilistic outputs require golden datasets, confidence thresholds, and statistical evaluation rather than brittle exact-string assertions alone.",
  },
];

export const LATEST_TRENDS: TrendItem[] = [
  {
    id: "trend-browser-automation",
    title: "Playwright Momentum Alongside Enterprise Selenium & Cypress",
    category: "Test Automation",
    publishedDate: "2026-08-06",
    verifiedDate: "2026-11-22",
    sourceLabel: "Industry Comparison Analysis (2026)",
    summary:
      "Playwright sees heavy adoption and weekly package volume for modern web and API-assisted E2E testing, while Selenium remains entrenched in multi-language enterprise estates and Cypress continues serving JS/component-focused workflows.",
    type: "Verified Industry Signal",
  },
  {
    id: "trend-ai-agentic-qa",
    title: "From Basic Test Copilots to AI Agent & LLM Evaluation",
    category: "AI in QA",
    publishedDate: "2026-11-22",
    verifiedDate: "2026-11-22",
    sourceLabel: "QA Career Hub Editorial Architecture",
    summary:
      "Teams increasingly test not only standard web/API endpoints but also AI-assisted features—requiring deterministic schema/assertion checks alongside evaluation datasets for prompts, retrieval accuracy, and tool calls.",
    type: "Editorial Guidance",
  },
];