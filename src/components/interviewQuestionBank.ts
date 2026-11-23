export interface InterviewQuestion {
  question: string;
  answer: string;
  code?: boolean;
}

export type QuestionBankCategory =
  | "SQL"
  | "Jenkins"
  | "Playwright"
  | "Selenium"
  | "Java"
  | "JavaScript";

export const interviewQuestionBank: Record<
  QuestionBankCategory,
  InterviewQuestion[]
> = {
  SQL: [
    { question: "What is SQL?", answer: "SQL is a language for defining, querying, and changing data in relational database systems." },
    { question: "What is a primary key?", answer: "A primary key uniquely identifies each row in a table. It must be unique and non-null; a table has one primary key, which may contain multiple columns." },
    { question: "What is a foreign key?", answer: "A foreign key references a candidate or primary key in another (or the same) table and helps enforce referential integrity." },
    { question: "What is the difference between PRIMARY KEY and UNIQUE?", answer: "Both enforce uniqueness. A primary key also identifies the row and cannot be NULL. A table can define multiple UNIQUE constraints but only one primary key." },
    { question: "What does NULL mean?", answer: "NULL means a value is missing or unknown, not zero or an empty string. Test it with IS NULL or IS NOT NULL; equality comparisons with NULL evaluate to unknown." },
    { question: "What is normalization?", answer: "Normalization structures related data to reduce duplication and update anomalies. Common forms include 1NF, 2NF, and 3NF; denormalization can be an intentional read-performance tradeoff." },
    { question: "What is an INNER JOIN?", answer: "It returns rows with matching join keys on both sides. Unmatched rows are excluded." },
    { question: "How do LEFT JOIN and INNER JOIN differ?", answer: "LEFT JOIN keeps every left-side row and fills right-side columns with NULL when there is no match; INNER JOIN returns only matching rows." },
    { question: "What is a CROSS JOIN?", answer: "It returns the Cartesian product: every row from one input paired with every row from the other. The output can grow rapidly." },
    { question: "WHERE vs HAVING?", answer: "WHERE filters source rows before grouping. HAVING filters grouped results after GROUP BY and can use aggregate conditions." },
    { question: "What does GROUP BY do?", answer: "It groups rows with the same values in specified columns so aggregate functions such as COUNT, SUM, or AVG can be calculated per group." },
    { question: "What is an aggregate function?", answer: "An aggregate calculates a value over a set of rows, for example COUNT, SUM, AVG, MIN, or MAX. NULL handling varies by function; COUNT(*) counts rows." },
    { question: "What is the difference between COUNT(*) and COUNT(column)?", answer: "COUNT(*) counts rows. COUNT(column) counts only rows where that expression is not NULL." },
    { question: "What is a subquery?", answer: "A query nested inside another query. It can return a scalar, a set of rows, or a correlated result used by the outer query." },
    { question: "What is a correlated subquery?", answer: "A subquery that refers to columns from the outer query. It is logically evaluated for outer rows, though optimizers may transform it." },
    { question: "What is a CTE?", answer: "A Common Table Expression is a named query introduced with WITH. It improves readability and can support recursion; it is not automatically a materialized temporary table." },
    { question: "What is a window function?", answer: "A window function computes a result across related rows while retaining each row, using an OVER clause with optional PARTITION BY and ORDER BY." },
    { question: "ROW_NUMBER vs RANK vs DENSE_RANK?", answer: "ROW_NUMBER always assigns unique sequential values; RANK gives ties the same rank and leaves gaps; DENSE_RANK gives ties the same rank without gaps." },
    { question: "What is an index?", answer: "An index is an auxiliary structure that can speed up lookups and ordering but costs storage and can slow writes. Index design should follow measured query patterns." },
    { question: "What is a composite index?", answer: "An index over multiple columns. Its usefulness often depends on the leftmost-prefix ordering, so choose column order based on predicates and workload." },
    { question: "What is a database transaction?", answer: "A transaction groups operations into a unit that commits or rolls back. ACID describes atomicity, consistency, isolation, and durability." },
    { question: "What are ACID properties?", answer: "Atomicity: all or none. Consistency: constraints remain valid. Isolation: concurrent work is controlled. Durability: committed changes survive failures." },
    { question: "What is a deadlock?", answer: "A deadlock occurs when transactions hold resources each other needs and wait indefinitely. Databases detect and abort a victim; consistent lock ordering and short transactions reduce risk." },
    { question: "DELETE vs TRUNCATE vs DROP?", answer: "DELETE removes selected rows and can use WHERE. TRUNCATE removes all rows using database-specific semantics. DROP removes the table definition and its data." },
    { question: "UNION vs UNION ALL?", answer: "UNION combines compatible result sets and removes duplicate rows. UNION ALL preserves duplicates and is generally less expensive." },
    { question: "What is a view?", answer: "A view is a named query exposed like a table. A regular view stores its definition, not necessarily its result; materialized views store results where supported." },
    { question: "How do you find duplicate email values?", answer: "Group by email and use HAVING COUNT(*) > 1, handling NULL and case normalization according to the product's uniqueness rules." },
    { question: "How do you get the second-highest salary?", answer: "Use DENSE_RANK() OVER (ORDER BY salary DESC) and filter rank = 2 to handle ties, or use a distinct ordered subquery with an offset where supported." },
    { question: "What is an execution plan?", answer: "It describes how the database intends to execute a query: scans, joins, indexes, estimates, and costs. Compare estimated and actual plans to diagnose performance." },
    { question: "How should a tester validate data after an API update?", answer: "Use a transaction-safe, read-only query where possible; check the target row, related records, derived fields, and unchanged invariants. Isolate test data and avoid relying on row order without ORDER BY." },
  ],
  Jenkins: [
    { question: "What is Jenkins?", answer: "Jenkins is an automation server used to orchestrate CI/CD tasks such as builds, tests, and deployments through jobs and pipelines." },
    { question: "What is a Jenkins Pipeline?", answer: "A Pipeline is a versionable workflow describing stages and steps to automate delivery. It is commonly stored as a Jenkinsfile in source control." },
    { question: "Declarative vs Scripted Pipeline?", answer: "Declarative uses a structured, opinionated pipeline syntax with validation and clear sections. Scripted uses Groovy control flow and is more flexible but easier to make complex." },
    { question: "What is a Jenkinsfile?", answer: "A text file defining a Pipeline, typically checked into the repository so the build process can be reviewed and versioned with the application." },
    { question: "What are stages and steps?", answer: "Stages organize the pipeline into visible phases such as Build and Test. Steps are the actions executed within a stage." },
    { question: "What are agents and nodes?", answer: "An agent is an execution environment assigned work by the controller; nodes are machines or environments that can host agents. Labels select suitable agents." },
    { question: "What is a Jenkins controller?", answer: "The controller coordinates configuration, scheduling, and UI/API access. Build workloads are preferably run on agents rather than on the controller itself." },
    { question: "How do you trigger builds?", answer: "Common triggers include webhook-based SCM events, polling, timers, upstream jobs, and manual/API triggers. Prefer event-driven webhooks when supported." },
    { question: "What is a multibranch Pipeline?", answer: "It discovers branches and pull requests containing a Jenkinsfile and creates separate Pipeline jobs for them, often enabling branch-specific CI." },
    { question: "What are Jenkins credentials?", answer: "Credentials are centrally managed secrets or identities, such as tokens and SSH keys, referenced by ID in jobs instead of being hard-coded." },
    { question: "How should secrets be used in a Jenkinsfile?", answer: "Use the credentials binding mechanisms and scope secrets only to steps that require them. Never print secrets, commit them to source, or expose them to untrusted pull-request code." },
    { question: "How do you archive build artifacts?", answer: "Use artifact archiving steps to retain selected outputs for later inspection or downstream use, with retention policies to control storage." },
    { question: "How do you publish test results?", answer: "Convert test output to a supported report format such as JUnit XML and publish it with the relevant plugin/step, so failures and trends appear in Jenkins." },
    { question: "What is a post section?", answer: "A Declarative Pipeline post section runs actions after stages or the pipeline, with conditions such as always, success, failure, unstable, or changed." },
    { question: "How do you pass parameters to a job?", answer: "Declare typed parameters and reference their values in the Pipeline. Validate and safely quote user-provided values, especially when constructing shell commands." },
    { question: "What are environment variables in a Pipeline?", answer: "They expose configuration to steps through an environment block or scoped environment binding. Avoid storing secrets as ordinary environment values." },
    { question: "How can stages run in parallel?", answer: "Declarative Pipelines support parallel branches in a stage. Ensure concurrent branches use isolated workspaces and do not mutate shared resources unsafely." },
    { question: "How do you handle flaky tests in CI?", answer: "Capture diagnostics, reproduce under the same environment, identify the root cause, and fix timing, data, or isolation issues. Track flakiness; use bounded retries only as temporary mitigation." },
    { question: "What is a Jenkins plugin?", answer: "A plugin extends Jenkins with integrations or features. Keep plugins necessary, reviewed, compatible, and updated; test updates before production rollout." },
    { question: "How do you secure Jenkins?", answer: "Use least-privilege authorization, supported updates, protected credentials, network restrictions, CSRF protections, secure agents, and careful handling of untrusted pipeline code." },
    { question: "What is a shared library?", answer: "A Shared Library provides reusable Pipeline code across repositories. Version and review it, document APIs, and avoid giving untrusted code excessive privileges." },
    { question: "How do you clean a workspace?", answer: "Use a workspace cleanup step before or after a job where appropriate. Isolate workspaces and avoid deleting files outside the job's intended workspace." },
    { question: "What does build status UNSTABLE mean?", answer: "UNSTABLE usually means the build completed but a quality check, such as tests, reported issues. It differs from FAILURE, where a pipeline step failed." },
    { question: "How do you configure a webhook for CI?", answer: "Configure the SCM webhook endpoint and credentials/secret as required, then configure the Jenkins job trigger. Verify delivery logs and avoid exposing the endpoint unnecessarily." },
    { question: "How do you avoid repeating work between jobs?", answer: "Use pipeline stages, shared libraries, reusable templates, or downstream triggers. Reuse artifacts when appropriate and avoid assuming agents share local files." },
    { question: "What is a matrix build?", answer: "A matrix runs a job across combinations such as operating systems, runtime versions, or browsers. Limit combinations to those that provide meaningful coverage." },
    { question: "How do you troubleshoot a stuck build?", answer: "Check queue reasons, agent availability and labels, executor capacity, SCM operations, and the last console output. Abort safely only after identifying the stuck process or dependency." },
    { question: "How do you parameterize a test pipeline?", answer: "Pass validated parameters for environment or suite selection, keep defaults safe, and map allowed values to configuration rather than accepting arbitrary commands." },
    { question: "How do you deploy only after successful tests?", answer: "Make the deploy stage depend on successful build and test stages, use explicit conditions, and gate production deployment with approvals and environment-specific credentials." },
    { question: "What belongs in a CI pipeline?", answer: "Fast feedback checks such as lint, unit tests, build, and targeted integration tests. Add broader suites based on risk, publish reports, and keep the pipeline reproducible." },
  ],
  Playwright: [
    { question: "What is Playwright?", answer: "Playwright is a browser automation framework for end-to-end testing and browser control, with bindings including TypeScript/JavaScript, Python, Java, and .NET." },
    { question: "What are browser, context, and page?", answer: "A Browser is the browser process, a BrowserContext is an isolated session with its own cookies/storage, and a Page is a tab within a context." },
    { question: "What is auto-waiting?", answer: "Playwright waits for relevant actionability conditions before actions and retries web-first assertions until they pass or time out, reducing timing races." },
    { question: "What is a Locator?", answer: "A Locator is a lazy query for elements that Playwright resolves when an action or assertion runs. It supports retry behavior and should target user-visible semantics when possible." },
    { question: "Which locators should you prefer?", answer: "Prefer getByRole with accessible name, getByLabel, and user-facing text. Use getByTestId for a deliberate test contract when semantic selectors are unsuitable." },
    { question: "What are web-first assertions?", answer: "Assertions such as toBeVisible retry until the condition becomes true or times out, making them more robust than immediately inspecting a one-time snapshot." },
    { question: "What is a fixture?", answer: "A fixture provides a test dependency, setup, and teardown, such as a page or authenticated context. Fixtures help keep tests isolated and setup reusable." },
    { question: "How do you isolate tests?", answer: "Use separate BrowserContexts, unique test data, and independent setup/cleanup. Do not rely on ordering or state left by another test." },
    { question: "How do you reuse authentication state?", answer: "Authenticate in a setup project, save storage state to a protected file, and load it for tests that need the same role. Do not commit credentials or sensitive state files." },
    { question: "What is a project in Playwright Test?", answer: "A project is a named configuration of tests, browser/device settings, or dependencies. Projects can run cross-browser coverage or setup and dependent test suites." },
    { question: "How do retries work?", answer: "Retries rerun failed tests according to configuration. They can provide evidence of flakiness but should not replace diagnosing and fixing the underlying issue." },
    { question: "How do you debug a failure with Trace Viewer?", answer: "Capture traces, ideally on first retry or failure, then inspect action timeline, DOM snapshots, screenshots, console, and network activity to find where behavior diverged." },
    { question: "How do you capture screenshots?", answer: "Use page.screenshot or assertion-based screenshot checks. Prefer stable states and controlled data; visual baselines need environment consistency and intentional review." },
    { question: "How do you test an API with Playwright?", answer: "Use the APIRequestContext or request fixture to send requests and assert status, headers, schema-relevant fields, and state. Keep API setup independent and clean up created data." },
    { question: "What is network interception?", answer: "Use route handlers to inspect, modify, fulfill, or abort requests. This can isolate third-party dependencies and simulate error or edge responses." },
    { question: "How do you wait for a navigation?", answer: "Prefer actions followed by an assertion on the resulting URL or page state. For a known navigation event, register the wait before triggering the action." },
    { question: "How do you test downloads?", answer: "Subscribe to the download event before clicking the download control, then inspect suggested filename or save the artifact for content verification." },
    { question: "How do you handle dialogs?", answer: "Register a dialog handler before the action that triggers the dialog, then accept or dismiss it as the scenario requires." },
    { question: "How do you test multiple tabs?", answer: "Wait for the popup event before the click that opens it, then use the returned Page and assert its URL and content." },
    { question: "What is codegen useful for?", answer: "Codegen can record interactions and suggest locators as a starting point. Review generated tests, remove noise, and improve assertions and test isolation." },
    { question: "How do you run tests in parallel?", answer: "Configure workers or shards based on CI capacity and make tests independent. Avoid shared mutable accounts or data that cause race conditions." },
    { question: "What is sharding?", answer: "Sharding splits test execution across multiple jobs or machines. Combine compatible reports afterward and ensure setup, test data, and artifacts work across shards." },
    { question: "How do you configure timeouts?", answer: "Set reasonable test and assertion timeouts based on application behavior. Prefer condition-based assertions over globally increasing timeouts to hide slow or flaky tests." },
    { question: "How do you test accessibility?", answer: "Use accessible role/label locators and keyboard interaction checks, then add a dedicated accessibility scanning tool. Automated checks supplement, not replace, manual assistive-technology testing." },
    { question: "How do you test mobile layouts?", answer: "Use device descriptors or viewport and touch settings to emulate layout and interactions. Validate critical behavior on representative real devices as needed." },
    { question: "How do you mock a backend response?", answer: "Register a route before navigation or the triggering action and fulfill it with a controlled status, headers, and body. Keep separate integration tests against the real service." },
    { question: "How do you reduce flaky tests?", answer: "Use resilient locators, web-first assertions, isolated state, controlled dependencies, and traces. Remove fixed sleeps and investigate actual causes rather than relying on retries." },
    { question: "How do you configure CI for Playwright?", answer: "Install pinned dependencies and browser binaries, run tests with CI-appropriate workers, and upload HTML/JUnit reports and traces on failure." },
    { question: "Can Playwright run tests for native mobile apps?", answer: "Playwright automates web browsers and web views; it is not a general native-app automation framework. Consider Appium or platform-specific tooling for native apps." },
    { question: "How do you handle test data?", answer: "Use deterministic factories or APIs to create unique data, avoid production data, scope it to a test or worker, and clean it up safely." },
  ],
  Selenium: [
    { question: "What is Selenium WebDriver?", answer: "Selenium WebDriver is a browser automation API that controls browsers through browser-specific drivers implementing the WebDriver protocol." },
    { question: "What are the parts of Selenium?", answer: "The ecosystem includes WebDriver for browser control, Grid for distributed execution, and IDE for recording/playback. Selenium Manager helps manage drivers in supported setups." },
    { question: "What is a WebDriver?", answer: "WebDriver is the language binding API used by a test to issue commands to a browser through a driver implementation." },
    { question: "Implicit vs explicit waits?", answer: "Implicit wait applies a global timeout to element lookup. Explicit wait polls for a specific condition. Prefer explicit waits; mixing both can cause confusing cumulative timeouts." },
    { question: "Why should fixed sleeps be avoided?", answer: "A fixed sleep is either unnecessarily slow or too short for a slow response. Wait for the specific state the test needs instead." },
    { question: "What is Page Object Model?", answer: "It encapsulates page or component locators and user-level operations. Keep test intent and important assertions understandable in the test rather than hiding everything in objects." },
    { question: "How do you locate an element?", answer: "Use stable, unique selectors such as ID or CSS attributes, or semantic locators supported by your binding. Avoid brittle absolute XPath and validate uniqueness." },
    { question: "findElement vs findElements?", answer: "findElement returns the first matching element or throws when none is found. findElements returns a list, which can be empty." },
    { question: "How do you handle stale element references?", answer: "The DOM element was replaced or detached after it was located. Re-locate after the state change and wait for the intended condition rather than repeatedly reusing stale references." },
    { question: "How do you handle dropdowns?", answer: "For native select elements use the binding's Select helper. For custom dropdowns interact with the actual controls and wait for options to become visible." },
    { question: "How do you handle alerts?", answer: "Switch to the alert and accept, dismiss, read its text, or send text as appropriate. Wait for the alert condition before interacting." },
    { question: "How do you switch windows?", answer: "Capture the original handle, wait until the expected number of windows exists, identify the new handle, switch to it, and return or close it cleanly." },
    { question: "How do you switch frames?", answer: "Wait for the frame and switch using a stable locator or name/index as appropriate. Switch back to default content when leaving the frame." },
    { question: "What is Selenium Grid?", answer: "Grid routes WebDriver sessions to remote browser nodes, enabling parallel and cross-browser execution across machines or containers." },
    { question: "What is RemoteWebDriver?", answer: "RemoteWebDriver sends commands to a remote WebDriver server or Grid endpoint, commonly with browser capabilities/options." },
    { question: "How do you take a screenshot?", answer: "Use the screenshot interface supported by the driver, then save it with a unique test/build name and attach it to failure diagnostics." },
    { question: "How do you upload a file?", answer: "Send the absolute file path to an input[type=file] element using sendKeys rather than automating the operating system file chooser." },
    { question: "How do you test a new tab?", answer: "Trigger the tab, wait for the window-handle set to change, switch to the new handle, and assert its URL and content." },
    { question: "What is Actions in Selenium?", answer: "Actions provides advanced input sequences such as pointer movement, drag-and-drop, and keyboard actions. Prefer normal element interactions when they adequately express the user behavior." },
    { question: "How do you execute JavaScript?", answer: "Use the JavaScript execution interface only when normal WebDriver interactions are insufficient. Direct DOM scripting can bypass real user behavior and hide accessibility issues." },
    { question: "What are capabilities and browser options?", answer: "Capabilities describe session features negotiated with the driver. Browser options configure browser-specific settings and are usually passed when creating a session." },
    { question: "How can tests run in parallel?", answer: "Use separate WebDriver instances per test or thread, isolated test data, and a Grid or CI workers. Never share a driver concurrently across tests." },
    { question: "How do you clean up a driver?", answer: "Call quit in a finally/teardown block to close all windows and end the session; close only closes the current window." },
    { question: "What causes flaky Selenium tests?", answer: "Timing races, weak locators, shared state, browser/environment differences, and external dependencies. Capture logs/screenshots and fix synchronization or isolation at the source." },
    { question: "How should exceptions be handled in automation?", answer: "Catch exceptions only when the test can take meaningful recovery or diagnostic action. Preserve failure context and always clean up sessions; do not silently pass failed checks." },
    { question: "How do you scroll to an element?", answer: "Prefer actions that naturally bring an element into view. If needed, use a supported scroll approach and then wait for visibility/interactability rather than assuming a fixed position." },
    { question: "How do you run Selenium tests in CI?", answer: "Install pinned bindings and browsers/drivers or use Grid, configure headless mode where appropriate, isolate data, and publish test reports plus failure artifacts." },
    { question: "Selenium vs Playwright?", answer: "Compare protocol/ecosystem, language needs, browser support, grid setup, synchronization, diagnostics, and migration cost. Selenium has broad WebDriver and Grid adoption; Playwright has integrated contexts, auto-waiting, and tracing." },
    { question: "How do you test Shadow DOM?", answer: "Use the WebDriver shadow-root APIs available in your binding to access the host's shadow root, then locate elements within it." },
    { question: "How do you improve Selenium suite maintainability?", answer: "Use stable selectors, explicit conditions, focused tests, reusable but small helpers, isolated state, consistent driver lifecycle, and reports with useful artifacts." },
  ],
  Java: [
    { question: "What is the difference between JDK, JRE, and JVM?", answer: "JVM executes bytecode. JRE traditionally packages the JVM and runtime libraries. JDK includes development tools such as the compiler; modern distributions may package these differently." },
    { question: "What are the four pillars of OOP?", answer: "Encapsulation, abstraction, inheritance, and polymorphism: managing state, exposing essential behavior, reusing specialized types, and using a common interface with varying implementations." },
    { question: "Overloading vs overriding?", answer: "Overloading uses the same method name with different parameter lists and is resolved at compile time. Overriding replaces an inherited instance method implementation and uses runtime dispatch." },
    { question: "Interface vs abstract class?", answer: "An interface defines a contract and can have default/static methods; a class can implement multiple interfaces. An abstract class can hold instance state and shared constructors/implementation but Java classes have single inheritance." },
    { question: "What is a constructor?", answer: "A constructor initializes a new instance and has the class name with no return type. Constructors can be overloaded and chained with this() or super()." },
    { question: "== vs equals()?", answer: "For primitives, == compares values. For references, == compares identity. equals() compares logical equality when a class implements it appropriately." },
    { question: "Why override hashCode when overriding equals?", answer: "The contract requires equal objects to have equal hash codes so hash-based collections can find them correctly. Unequal objects may still share a hash code." },
    { question: "Why is String immutable?", answer: "Immutability supports safe sharing, stable hash values, security, and string-pool reuse. Operations that appear to modify a String create a new value." },
    { question: "StringBuilder vs StringBuffer?", answer: "Both are mutable character sequences. StringBuilder is generally preferred for single-threaded construction; StringBuffer synchronizes methods and may be useful for shared access, though external synchronization/design is often better." },
    { question: "ArrayList vs LinkedList?", answer: "ArrayList provides fast indexed access and good cache locality. LinkedList has node-based insertion/removal when the node is already located, but indexed access is linear and memory overhead is higher." },
    { question: "HashMap vs Hashtable?", answer: "HashMap is unsynchronized and allows one null key and null values. Hashtable is legacy synchronized and disallows nulls; use ConcurrentHashMap for common concurrent access needs." },
    { question: "What is a checked exception?", answer: "A checked exception must be caught or declared by the method, encouraging handling of recoverable conditions. RuntimeException subclasses are unchecked." },
    { question: "What is try-with-resources?", answer: "It automatically closes resources implementing AutoCloseable at the end of the block, including on exceptions, and preserves suppressed close exceptions." },
    { question: "What is the difference between final, finally, and finalize?", answer: "final restricts reassignment/overriding/inheritance depending on use. finally is a cleanup block. finalize was deprecated for removal and should not be used for resource management." },
    { question: "What does static mean?", answer: "A static member belongs to the class rather than each instance. Static methods have no this reference and cannot directly access instance members." },
    { question: "What are access modifiers?", answer: "public is broadly accessible; protected is package/subclass accessible; package-private has no modifier; private is restricted to the declaring class." },
    { question: "What is a generic type?", answer: "Generics provide compile-time type parameters for classes and methods, reducing casts and type errors. Type erasure removes most generic type details at runtime." },
    { question: "What is a lambda expression?", answer: "A lambda is a concise implementation of a functional interface's single abstract method, often used with collections and streams." },
    { question: "What is a functional interface?", answer: "An interface with exactly one abstract method, suitable for lambda expressions. It may also contain default and static methods." },
    { question: "What is the Stream API?", answer: "Streams describe pipelines of operations over data, such as filter, map, and reduce. Intermediate operations are lazy; terminal operations execute the pipeline." },
    { question: "map vs flatMap?", answer: "map transforms each element into one result. flatMap transforms each element into a stream/optional-like container and flattens the nested results." },
    { question: "What is a race condition?", answer: "A race occurs when concurrent operations access shared state and the outcome depends on timing. Use immutability, confinement, synchronization, or atomic/concurrent utilities." },
    { question: "What does synchronized do?", answer: "It provides mutual exclusion and memory visibility around a monitor. Keep critical sections small and avoid lock-order patterns that can deadlock." },
    { question: "What is volatile?", answer: "volatile ensures reads/writes of a variable have visibility and ordering guarantees, but does not make compound operations such as increment atomic." },
    { question: "What is an immutable class?", answer: "A class whose observable state cannot change after construction. Use private final fields, controlled construction, no mutators, and defensive copies for mutable inputs/outputs." },
    { question: "What is an enum?", answer: "An enum defines a fixed set of type-safe constants and can include fields, methods, and constructors." },
    { question: "What is a record?", answer: "A record is a concise data carrier that generates components, accessors, equals, hashCode, and toString. Its component references are final, but referenced objects may themselves be mutable." },
    { question: "How does garbage collection work?", answer: "The JVM identifies objects no longer reachable from GC roots and reclaims their memory. GC timing is not deterministic; resource handles should be closed explicitly." },
    { question: "What is dependency injection?", answer: "Dependencies are supplied to a component rather than constructed internally, improving testability and separating wiring from behavior." },
    { question: "How do you test Java code?", answer: "Use focused unit tests with JUnit or TestNG, isolate external dependencies with interfaces/fakes where useful, add integration tests for boundaries, and assert observable behavior rather than private implementation." },
  ],
  JavaScript: [
    { question: "What are JavaScript primitive types?", answer: "The primitives are undefined, null, boolean, number, bigint, string, and symbol. Objects, including arrays and functions, are reference values." },
    { question: "var vs let vs const?", answer: "var is function-scoped and hoisted with undefined initialization. let and const are block-scoped and have a temporal dead zone. const prevents rebinding, not mutation of referenced objects." },
    { question: "What is hoisting?", answer: "Declarations are processed before execution in their scope. Function declarations are available earlier; var is initialized to undefined, while let/const cannot be accessed before initialization." },
    { question: "== vs ===?", answer: "== performs coercive comparison in many cases; === compares without type coercion. Prefer === unless coercion is deliberate and clear." },
    { question: "What is a closure?", answer: "A function retains access to lexical variables from the scope where it was created, even after that outer function has returned." },
    { question: "What is the event loop?", answer: "The event loop coordinates the call stack with task and microtask queues so asynchronous callbacks run when the stack is available. Promise reactions run as microtasks." },
    { question: "Promise states?", answer: "A Promise is pending, fulfilled with a value, or rejected with a reason. Settled promises remain fulfilled or rejected." },
    { question: "async/await?", answer: "async functions return promises. await pauses that function until a promise settles, allowing asynchronous code to be written in a sequential style; use try/catch or rejection handling." },
    { question: "What is the difference between null and undefined?", answer: "undefined commonly represents an absent/uninitialized value; null is an intentional empty value. Their exact semantics differ, so use explicit checks appropriate to the data." },
    { question: "What does this refer to?", answer: "In a normal function, this depends on how the function is called. Arrow functions capture this lexically from the surrounding scope." },
    { question: "What is a prototype?", answer: "Objects can delegate property lookup to another object, their prototype. This delegation chain is JavaScript's prototype-based inheritance mechanism." },
    { question: "What is prototypal inheritance?", answer: "An object can inherit behavior by delegating property lookups through its prototype chain. Classes provide syntax over this model." },
    { question: "map vs forEach?", answer: "map returns a new array of transformed results. forEach runs a callback for side effects and returns undefined." },
    { question: "What do filter and reduce do?", answer: "filter creates an array of elements that pass a predicate. reduce accumulates values into one result using a reducer and initial value." },
    { question: "What is destructuring?", answer: "Destructuring extracts values from arrays or properties from objects into variables, optionally with defaults and renaming." },
    { question: "What is a rest parameter?", answer: "A rest parameter collects remaining function arguments into an array, for example function f(first, ...remaining)." },
    { question: "What is the spread syntax?", answer: "Spread expands iterable values or object properties into a new array/object or function call. It is shallow, so nested references remain shared." },
    { question: "What is a module?", answer: "An ES module is a file with explicit imports and exports. Modules have their own scope and are evaluated once per module instance." },
    { question: "What is event delegation?", answer: "Attach a handler to a common ancestor and use event bubbling plus target matching to handle events from descendants, useful for dynamic lists." },
    { question: "What is debouncing?", answer: "Debouncing delays execution until calls stop for a specified interval, useful for search input. Throttling instead limits executions to a maximum rate." },
    { question: "Shallow copy vs deep copy?", answer: "A shallow copy duplicates only the top-level structure and shares nested references. A deep copy recursively copies supported nested data; choose a method compatible with the values involved." },
    { question: "What does Object.freeze do?", answer: "It prevents extensions and makes own data properties non-writable/non-configurable at the top level. It is shallow and does not freeze nested objects automatically." },
    { question: "What is NaN?", answer: "NaN represents an invalid numeric result and is not equal to itself. Use Number.isNaN to test it reliably." },
    { question: "How does try/catch work with async code?", answer: "A try/catch around await handles a rejected promise. For an un-awaited promise, attach a rejection handler or await it within the try block." },
    { question: "What is optional chaining?", answer: "?. accesses a property or calls a function only when the left side is not nullish, returning undefined otherwise." },
    { question: "What is nullish coalescing?", answer: "?? uses the fallback only when the left operand is null or undefined, unlike || which also falls back for values such as 0, false, and empty string." },
    { question: "What is a generator?", answer: "A generator function uses function* and yield to produce an iterator whose execution can pause and resume." },
    { question: "What is a memory leak in JavaScript?", answer: "A leak occurs when unused objects remain reachable, for example through forgotten event listeners, timers, caches, or detached DOM references. Release references and clean up subscriptions." },
    { question: "How do you handle errors in a Promise chain?", answer: "Return or await promises consistently and attach catch/finally handlers where errors can be meaningfully handled. Avoid swallowing rejections or creating unhandled promises." },
    { question: "How do you write maintainable JavaScript tests?", answer: "Use isolated test data, clear arrange/act/assert sections, deterministic dependencies, meaningful assertions, and cleanup. Prefer testing public behavior over implementation details." },
    { question: "Practice: reverse a string without reverse().", answer: `function reverseString(value) {
  let result = "";
  for (const character of value) {
    result = character + result;
  }
  return result;
}

console.log(reverseString("quality")); // "ytilauq"`, code: true },
    { question: "Practice: determine whether a string is a palindrome.", answer: `function isPalindrome(value) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === [...normalized].reverse().join("");
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true`, code: true },
    { question: "Practice: return the first non-repeating character.", answer: `function firstUniqueCharacter(value) {
  const counts = new Map();
  for (const character of value) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }
  return [...value].find((character) => counts.get(character) === 1) ?? null;
}

console.log(firstUniqueCharacter("swiss")); // "w"`, code: true },
    { question: "Practice: remove duplicate values from an array.", answer: `function uniqueValues(values) {
  return [...new Set(values)];
}

console.log(uniqueValues([1, 2, 2, 3])); // [1, 2, 3]`, code: true },
    { question: "Practice: count each word in a sentence.", answer: `function countWords(sentence) {
  const counts = new Map();
  for (const word of sentence.toLowerCase().match(/[a-z0-9']+/g) ?? []) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return Object.fromEntries(counts);
}

console.log(countWords("test code, test well"));`, code: true },
    { question: "Practice: find the largest number in an array.", answer: `function maxValue(values) {
  if (values.length === 0) throw new Error("Array must not be empty");
  let max = values[0];
  for (const value of values.slice(1)) {
    if (value > max) max = value;
  }
  return max;
}

console.log(maxValue([-4, 9, 2])); // 9`, code: true },
    { question: "Practice: check whether two strings are anagrams.", answer: `function areAnagrams(left, right) {
  const normalize = (value) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "").split("").sort().join("");
  return normalize(left) === normalize(right);
}

console.log(areAnagrams("listen", "silent")); // true`, code: true },
    { question: "Practice: generate the first n Fibonacci numbers.", answer: `function fibonacci(count) {
  const result = [];
  let previous = 0;
  let current = 1;
  for (let index = 0; index < count; index += 1) {
    result.push(previous);
    [previous, current] = [current, previous + current];
  }
  return result;
}

console.log(fibonacci(7)); // [0, 1, 1, 2, 3, 5, 8]`, code: true },
    { question: "Practice: find two array values that sum to a target.", answer: `function twoSum(values, target) {
  const indexesByValue = new Map();
  for (let index = 0; index < values.length; index += 1) {
    const complement = target - values[index];
    if (indexesByValue.has(complement)) {
      return [indexesByValue.get(complement), index];
    }
    indexesByValue.set(values[index], index);
  }
  return null;
}

console.log(twoSum([2, 7, 11], 9)); // [0, 1]`, code: true },
    { question: "Practice: implement a debounce function.", answer: `function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

const searchLater = debounce((query) => console.log(query), 300);`, code: true },
  ],
};

interviewQuestionBank.Java = [
  ...interviewQuestionBank.Java.slice(0, 20),
  { question: "Practice: reverse a string.", answer: `static String reverse(String value) {
    return new StringBuilder(value).reverse().toString();
}

System.out.println(reverse("quality")); // ytilauq`, code: true },
  { question: "Practice: check whether a string is a palindrome.", answer: `static boolean isPalindrome(String value) {
    String normalized = value.toLowerCase().replaceAll("[^a-z0-9]", "");
    return normalized.contentEquals(new StringBuilder(normalized).reverse());
}

System.out.println(isPalindrome("level")); // true`, code: true },
  { question: "Practice: find the first non-repeating character.", answer: `static Character firstUnique(String value) {
    Map<Character, Integer> counts = new LinkedHashMap<>();
    for (char character : value.toCharArray()) {
        counts.merge(character, 1, Integer::sum);
    }
    return counts.entrySet().stream()
        .filter(entry -> entry.getValue() == 1)
        .map(Map.Entry::getKey)
        .findFirst()
        .orElse(null);
}`, code: true },
  { question: "Practice: remove duplicates while preserving order.", answer: `static <T> List<T> unique(List<T> values) {
    return new ArrayList<>(new LinkedHashSet<>(values));
}

System.out.println(unique(List.of(1, 2, 2, 3))); // [1, 2, 3]`, code: true },
  { question: "Practice: count words in a sentence.", answer: `static Map<String, Integer> wordCounts(String sentence) {
    Map<String, Integer> counts = new LinkedHashMap<>();
    for (String word : sentence.toLowerCase().split("\\\\W+")) {
        if (!word.isEmpty()) counts.merge(word, 1, Integer::sum);
    }
    return counts;
}`, code: true },
  { question: "Practice: find the largest integer in an array.", answer: `static int max(int[] values) {
    if (values.length == 0) throw new IllegalArgumentException("empty array");
    int result = values[0];
    for (int value : values) result = Math.max(result, value);
    return result;
}`, code: true },
  { question: "Practice: determine whether two strings are anagrams.", answer: `static boolean areAnagrams(String left, String right) {
    char[] a = left.toLowerCase().replaceAll("[^a-z0-9]", "").toCharArray();
    char[] b = right.toLowerCase().replaceAll("[^a-z0-9]", "").toCharArray();
    Arrays.sort(a);
    Arrays.sort(b);
    return Arrays.equals(a, b);
}`, code: true },
  { question: "Practice: generate the first n Fibonacci values.", answer: `static List<Long> fibonacci(int count) {
    List<Long> result = new ArrayList<>();
    long previous = 0, current = 1;
    for (int i = 0; i < count; i++) {
        result.add(previous);
        long next = previous + current;
        previous = current;
        current = next;
    }
    return result;
}`, code: true },
  { question: "Practice: find two indices whose values sum to a target.", answer: `static int[] twoSum(int[] values, int target) {
    Map<Integer, Integer> indexes = new HashMap<>();
    for (int i = 0; i < values.length; i++) {
        int complement = target - values[i];
        if (indexes.containsKey(complement)) {
            return new int[] { indexes.get(complement), i };
        }
        indexes.put(values[i], i);
    }
    return new int[0];
}`, code: true },
  { question: "Practice: validate balanced parentheses.", answer: `static boolean isBalanced(String value) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char ch : value.toCharArray()) {
        if (ch == '(') stack.push(ch);
        else if (ch == ')') {
            if (stack.isEmpty()) return false;
            stack.pop();
        }
    }
    return stack.isEmpty();
}`, code: true },
];

interviewQuestionBank.JavaScript = [
  ...interviewQuestionBank.JavaScript.slice(0, 20),
  ...interviewQuestionBank.JavaScript.slice(-10),
];
