"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Terminal } from "lucide-react";

type ProgrammingLanguage = "TypeScript" | "JavaScript" | "Python" | "Java";

interface CodeRunnerProps {
  language: ProgrammingLanguage;
  code: string;
  canRun?: boolean;
  unavailableMessage?: string;
}

const SANDBOX_DOCUMENT = `<!doctype html>
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' blob:; worker-src blob:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">
<script>
let activeWorker;
window.addEventListener("message", (event) => {
  if (event.source !== parent || event.data?.type !== "run") return;
  if (activeWorker) activeWorker.terminate();

  const workerSource = \`
    const format = (value) => {
      if (typeof value === "string") return value;
      try {
        const json = JSON.stringify(value);
        return json === undefined ? String(value) : json;
      } catch {
        return String(value);
      }
    };
    self.onmessage = ({ data }) => {
      const lines = [];
      let totalLength = 0;
      const log = (...values) => {
        if (totalLength >= 20000) return;
        const line = values.map(format).join(" ");
        lines.push(line.slice(0, 20000 - totalLength));
        totalLength += line.length + 1;
      };
      const safeConsole = { log, info: log, warn: log, error: log };
      try {
        const result = new Function("console", '"use strict";\\\\n' + data.code)(safeConsole);
        if (result !== undefined) log(result);
        self.postMessage({
          type: "result",
          output: lines.join("\\\\n") || "Code ran successfully. No output was logged.",
        });
      } catch (error) {
        self.postMessage({
          type: "error",
          output: error && error.stack ? error.stack : String(error),
        });
      }
    };
  \`;

  const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
  const worker = new Worker(workerUrl);
  activeWorker = worker;

  const timeout = setTimeout(() => {
    worker.terminate();
    URL.revokeObjectURL(workerUrl);
    if (activeWorker === worker) activeWorker = undefined;
    parent.postMessage({
      type: "runner-result",
      isError: true,
      output: "Execution stopped after 2 seconds. Check for an infinite loop or long-running operation.",
    }, "*");
  }, 2000);

  worker.onmessage = ({ data }) => {
    clearTimeout(timeout);
    worker.terminate();
    URL.revokeObjectURL(workerUrl);
    if (activeWorker === worker) activeWorker = undefined;
    parent.postMessage({
      type: "runner-result",
      isError: data.type === "error",
      output: data.output,
    }, "*");
  };
  worker.onerror = (error) => {
    clearTimeout(timeout);
    worker.terminate();
    URL.revokeObjectURL(workerUrl);
    if (activeWorker === worker) activeWorker = undefined;
    parent.postMessage({
      type: "runner-result",
      isError: true,
      output: error.message || "The code could not be executed.",
    }, "*");
  };
  worker.postMessage({ code: event.data.code });
});
</script>`;

export function CodeRunner({
  language,
  code,
  canRun = true,
  unavailableMessage,
}: CodeRunnerProps) {
  const sandboxRef = useRef<HTMLIFrameElement>(null);
  const [output, setOutput] = useState("Run your code to see output here.");
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [sandboxReady, setSandboxReady] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== sandboxRef.current?.contentWindow) return;

      const result = event.data as {
        type?: string;
        isError?: boolean;
        output?: string;
      };
      if (result.type !== "runner-result") return;

      setOutput(result.output ?? "The runner returned no output.");
      setIsError(Boolean(result.isError));
      setIsRunning(false);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const runCode = async () => {
    setIsError(false);
    if (!canRun) {
      setOutput(unavailableMessage ?? "This example cannot run in the current workspace.");
      return;
    }

    if (language === "Python" || language === "Java") {
      setOutput(
        `${language} execution is not available in this browser workspace. A local ${language} runtime or a trusted compiler service is required.`,
      );
      return;
    }

    setIsRunning(true);
    setOutput("Compiling and running...");

    try {
      let executableCode = code;
      if (language === "TypeScript") {
        const typescript = await import("typescript");
        const result = typescript.transpileModule(code, {
          compilerOptions: {
            module: typescript.ModuleKind.None,
            target: typescript.ScriptTarget.ES2020,
          },
          reportDiagnostics: true,
        });
        const errors = (result.diagnostics ?? []).filter(
          (diagnostic) => diagnostic.category === typescript.DiagnosticCategory.Error,
        );
        if (errors.length > 0) {
          setOutput(
            errors
              .map((diagnostic) =>
                typescript.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
              )
              .join("\n"),
          );
          setIsError(true);
          setIsRunning(false);
          return;
        }
        executableCode = result.outputText;
      }

      const sandbox = sandboxRef.current?.contentWindow;
      if (!sandbox || !sandboxReady) {
        throw new Error("The isolated code runner is still starting. Try again shortly.");
      }
      sandbox.postMessage({ type: "run", code: executableCode }, "*");
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "The code could not be prepared.");
      setIsError(true);
      setIsRunning(false);
    }
  };

  return (
    <section
      aria-label="Code output"
      className="flex min-h-64 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-navy-950"
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Terminal className="h-4 w-4 text-royal-600 dark:text-purple-400" />
          Output
        </h3>
        <button
          type="button"
          onClick={runCode}
          disabled={isRunning || !sandboxReady || !canRun}
          className="inline-flex items-center gap-2 rounded-lg bg-royal-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-royal-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play className="h-3.5 w-3.5" />
          {isRunning ? "Running..." : canRun ? "Run code" : "Package required"}
        </button>
      </div>
      <pre
        aria-live="polite"
        className={`min-h-48 flex-1 overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-xs leading-5 ${
          isError
            ? "text-rose-600 dark:text-rose-300"
            : "text-slate-700 dark:text-slate-200"
        }`}
      >
        {output}
      </pre>
      <p className="border-t border-slate-100 px-4 py-2 text-[11px] leading-4 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        {canRun
          ? "JavaScript and TypeScript run in an isolated sandbox with a 2-second limit. Python and Java need a separate runtime."
          : unavailableMessage}
      </p>
      <iframe
        ref={sandboxRef}
        title="Isolated code execution"
        sandbox="allow-scripts"
        srcDoc={SANDBOX_DOCUMENT}
        onLoad={() => setSandboxReady(true)}
        className="hidden"
      />
    </section>
  );
}
