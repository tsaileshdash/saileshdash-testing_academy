"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, ShieldCheck, Menu, X, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CodeRunner } from "./CodeRunner";
import { InterviewPrep } from "./InterviewPrep";
import { useTheme } from "./ThemeProvider";

const languageExamples = {
  TypeScript: `type CheckResult = { name: string; passed: boolean };

const checks: CheckResult[] = [
  { name: "login form is valid", passed: true },
  { name: "required fields are present", passed: true },
];

checks.forEach(({ name, passed }) => {
  console.log(\`\${passed ? "PASS" : "FAIL"}: \${name}\`);
});`,
  JavaScript: `const checks = [
  { name: "login form is valid", passed: true },
  { name: "required fields are present", passed: true },
];

checks.forEach(({ name, passed }) => {
  console.log(\`\${passed ? "PASS" : "FAIL"}: \${name}\`);
});`,
  Python: `from playwright.sync_api import Page, expect

def test_home_page_has_title(page: Page):
    page.goto("/")
    expect(page).to_have_title("QA Career Hub")`,
  Java: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {
    @Test
    void addsTwoNumbers() {
        int result = 2 + 3;
        assertEquals(5, result);
    }
}`,
} as const;

type ProgrammingLanguage = keyof typeof languageExamples;
type LearningTool = "QA Basics" | "Playwright" | "Selenium";

const toolExamples: Record<
  Exclude<LearningTool, "QA Basics">,
  Record<ProgrammingLanguage, string>
> = {
  Playwright: {
    TypeScript: `import { test, expect } from "@playwright/test";

test("user can sign in", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});`,
    JavaScript: `const { test, expect } = require("@playwright/test");

test("home page has a title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/QA Career Hub/);
});`,
    Python: `import re
from playwright.sync_api import Page, expect

def test_home_page_has_title(page: Page):
    page.goto("https://example.com")
    expect(page).to_have_title(re.compile("Example Domain"))`,
    Java: `import com.microsoft.playwright.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class HomePageTest {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      Browser browser = playwright.chromium().launch();
      Page page = browser.newPage();
      page.navigate("https://example.com");
      assertThat(page).hasTitle("Example Domain");
      browser.close();
    }
  }
}`,
  },
  Selenium: {
    TypeScript: `import { Builder, By, until } from "selenium-webdriver";

async function checkPageTitle() {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://example.com");
    await driver.wait(until.titleIs("Example Domain"), 5000);
    console.log("PASS: page title is correct");
  } finally {
    await driver.quit();
  }
}

checkPageTitle();`,
    JavaScript: `const { Builder, until } = require("selenium-webdriver");

async function checkPageTitle() {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://example.com");
    await driver.wait(until.titleIs("Example Domain"), 5000);
    console.log("PASS: page title is correct");
  } finally {
    await driver.quit();
  }
}

checkPageTitle();`,
    Python: `from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait

driver = webdriver.Chrome()
try:
    driver.get("https://example.com")
    WebDriverWait(driver, 5).until(
        lambda browser: browser.title == "Example Domain"
    )
    print("PASS: page title is correct")
finally:
    driver.quit()`,
    Java: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

class PageTitleCheck {
  public static void main(String[] args) {
    WebDriver driver = new ChromeDriver();
    try {
      driver.get("https://example.com");
      new WebDriverWait(driver, Duration.ofSeconds(5))
          .until(d -> d.getTitle().equals("Example Domain"));
      System.out.println("PASS: page title is correct");
    } finally {
      driver.quit();
    }
  }
}`,
  },
};

const learningTools: LearningTool[] = ["QA Basics", "Playwright", "Selenium"];

function getExample(language: ProgrammingLanguage, tool: LearningTool): string {
  return tool === "QA Basics" ? languageExamples[language] : toolExamples[tool][language];
}

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<ProgrammingLanguage | null>(null);
  const [selectedTool, setSelectedTool] = useState<LearningTool>("QA Basics");
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const initialDrafts: Record<string, string> = {};
    for (const language of Object.keys(languageExamples) as ProgrammingLanguage[]) {
      for (const tool of learningTools) {
        initialDrafts[`${language}:${tool}`] = getExample(language, tool);
      }
    }
    return initialDrafts;
  });
  const activeDraftKey = selectedLanguage
    ? `${selectedLanguage}:${selectedTool}`
    : null;

  useEffect(() => {
    if (!learningOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLearningOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [learningOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/roadmaps", label: "Career Roadmaps" },
    { href: "/tools", label: "Tools Hub" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-[#060d1f]/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-royal-600 to-purple-600 text-white shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-lg text-slate-900 dark:text-white">
            QA Career <span className="text-royal-600 dark:text-purple-400">Hub</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  active
                    ? "text-royal-600 dark:text-purple-400 font-semibold"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <InterviewPrep />
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setLearningOpen(true)}
            className="hidden sm:inline-flex items-center rounded-lg bg-royal-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-royal-500 transition-colors"
          >
            Start Learning
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            className="md:hidden rounded-lg border border-slate-200 p-2 text-slate-700 dark:border-slate-800 dark:text-slate-200"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-navy-950">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <InterviewPrep mobile />
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setLearningOpen(true);
              }}
              className="mt-1 rounded-md bg-royal-600 px-3 py-2 text-left text-sm font-semibold text-white hover:bg-royal-500"
            >
              Start Learning
            </button>
          </div>
        </div>
      )}

      {learningOpen &&
        typeof document !== "undefined" &&
        createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLearningOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="learning-dialog-title"
            className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-6xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-navy-950"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-7">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-royal-600 dark:text-purple-400">
                  <Code2 className="h-4 w-4" />
                  Your learning workspace
                </span>
                <h2
                  id="learning-dialog-title"
                  className="mt-2 text-xl font-bold text-slate-950 dark:text-white sm:text-2xl"
                >
                  Choose a programming language
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Pick a language to open a matching QA example in the editor.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLearningOpen(false)}
                aria-label="Close learning workspace"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[220px_1fr]">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Programming language
                </legend>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {(Object.keys(languageExamples) as ProgrammingLanguage[]).map(
                    (language) => (
                      <label
                        key={language}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-medium transition-colors ${
                          selectedLanguage === language
                            ? "border-royal-500 bg-royal-500/5 text-royal-700 ring-1 ring-royal-500 dark:text-purple-300"
                            : "border-slate-200 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="programming-language"
                          value={language}
                          checked={selectedLanguage === language}
                          onChange={() => {
                            setSelectedLanguage(language);
                            setSelectedTool("QA Basics");
                          }}
                          className="h-4 w-4 accent-royal-600"
                        />
                        {language}
                      </label>
                    ),
                  )}
                </div>
                {selectedLanguage && (
                  <fieldset className="mt-6">
                    <legend className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Example type
                    </legend>
                    <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                      {learningTools.map((tool) => (
                        <label
                          key={tool}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-medium transition-colors ${
                            selectedTool === tool
                              ? "border-purple-500 bg-purple-500/5 text-purple-700 ring-1 ring-purple-500 dark:text-purple-300"
                              : "border-slate-200 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name="learning-tool"
                            value={tool}
                            checked={selectedTool === tool}
                            onChange={() => setSelectedTool(tool)}
                            className="h-4 w-4 accent-purple-600"
                          />
                          {tool}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}
              </fieldset>

              <div>
                {selectedLanguage ? (
                  <>
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {selectedTool === "QA Basics"
                          ? `${selectedLanguage} coding workspace`
                          : `${selectedTool} with ${selectedLanguage}`}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {selectedTool === "QA Basics"
                          ? "Edit your example and run it to see the output alongside your code."
                          : `A starter ${selectedLanguage} ${selectedTool} test. Edit it for your application and test data.`}
                      </p>
                    </div>
                    <div className="grid items-start gap-4 xl:grid-cols-2">
                      <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0b1220]">
                        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                          <span className="ml-2 font-mono text-xs text-slate-400">
                            qa-example
                            {selectedTool === "QA Basics" && selectedLanguage === "Python"
                              ? ".py"
                              : selectedTool === "QA Basics" && selectedLanguage === "Java"
                                ? ".java"
                                : selectedLanguage === "TypeScript"
                                  ? ".ts"
                                  : selectedLanguage === "Java"
                                    ? ".java"
                                    : selectedLanguage === "Python"
                                      ? ".py"
                                      : ".js"}
                          </span>
                        </div>
                        <textarea
                          aria-label={`${selectedLanguage} code editor`}
                          spellCheck={false}
                          value={activeDraftKey ? drafts[activeDraftKey] : ""}
                          onChange={(event) =>
                            activeDraftKey &&
                            setDrafts((previous) => ({
                              ...previous,
                              [activeDraftKey]: event.target.value,
                            }))
                          }
                          className="min-h-64 w-full resize-y bg-transparent p-4 font-mono text-xs leading-6 text-slate-100 outline-none sm:text-sm"
                        />
                      </div>
                      <CodeRunner
                        key={`${selectedLanguage}-${selectedTool}`}
                        language={selectedLanguage}
                        code={activeDraftKey ? drafts[activeDraftKey] : ""}
                        canRun={selectedTool === "QA Basics"}
                        unavailableMessage={`${selectedTool} code needs its test package and a configured browser/runtime. Install ${selectedTool === "Playwright" ? "@playwright/test" : "selenium-webdriver / Selenium"} in your project to run this example.`}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-6 text-center dark:border-slate-700 dark:bg-white/[0.03]">
                    <Code2 className="h-8 w-8 text-slate-400" />
                    <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Your editor will appear here
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">
                      Select a language to load a starter QA example tailored
                      to that language.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </header>
  );
}
