"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { missions, profile, type Mission } from "@/data/missions";
import { journeyStories, type JourneyStory } from "@/data/journey";

type LineTone = "default" | "muted" | "success" | "error" | "accent";

type TerminalLine = {
  text: string;
  tone?: LineTone;
};

type TerminalEntry = {
  command: string;
  cwdAtRun: string;
  lines: TerminalLine[];
};

type CommandDoc = {
  name: string;
  usage: string;
  description: string;
  examples?: string[];
};

const HOME_SEGMENTS = ["home", "nishanth"];
const THEME_STORAGE_KEY = "chronogram-theme";
const themeOptions = ["vibrant", "night", "mint", "sunset"] as const;

const COMMAND_DOCS: CommandDoc[] = [
  {
    name: "help",
    usage: "help",
    description: "Show all commands and short explanations.",
    examples: ["help"],
  },
  {
    name: "man",
    usage: "man <command>",
    description: "Show detailed help for a specific command.",
    examples: ["man project", "man cd"],
  },
  {
    name: "clear",
    usage: "clear",
    description: "Clear terminal output.",
  },
  {
    name: "whoami",
    usage: "whoami",
    description: "Print current user name.",
  },
  {
    name: "neofetch",
    usage: "neofetch",
    description: "Show system-style portfolio information.",
  },
  {
    name: "pwd",
    usage: "pwd",
    description: "Print current working directory.",
  },
  {
    name: "ls",
    usage: "ls [path]",
    description: "List directory contents.",
    examples: ["ls", "ls /projects"],
  },
  {
    name: "cd",
    usage: "cd <path>",
    description: "Change current directory.",
    examples: ["cd /projects", "cd ..", "cd /home/nishanth"],
  },
  {
    name: "cat",
    usage: "cat <file>",
    description: "Read a file and print its content.",
    examples: ["cat profile.txt", "cat /projects/list.txt"],
  },
  {
    name: "projects",
    usage: "projects",
    description: "List all project files.",
  },
  {
    name: "project",
    usage: "project <id|number|keyword>",
    description: "Open one project in detailed view.",
    examples: ["project rag", "project 2", "project visionary"],
  },
  {
    name: "journey",
    usage: "journey",
    description: "List all journey story files.",
  },
  {
    name: "story",
    usage: "story <id|number|keyword>",
    description: "Open one journey story in detailed view.",
    examples: ["story internship", "story 3"],
  },
  {
    name: "open",
    usage: "open <keyword>",
    description: "Shortcut to open either a project or journey story.",
    examples: ["open rag", "open hackathon"],
  },
  {
    name: "profile",
    usage: "profile",
    description: "Print profile summary.",
  },
  {
    name: "resume",
    usage: "resume",
    description: "Print resume quick summary.",
  },
  {
    name: "contact",
    usage: "contact",
    description: "Show contact channels.",
  },
  {
    name: "theme",
    usage: "theme <vibrant|night|mint|sunset>",
    description: "Switch portfolio color theme.",
    examples: ["theme night"],
  },
  {
    name: "sudo",
    usage: "sudo <command>",
    description: "Hacker-style easter egg.",
    examples: ["sudo hire nishanth", "sudo rm -rf /"],
  },
];

const STATIC_DIRS = new Set(["/", "/home", "/home/nishanth", "/projects", "/journey"]);

const STATIC_FILES = new Set([
  "/home/nishanth/readme.txt",
  "/home/nishanth/profile.txt",
  "/home/nishanth/resume.txt",
  "/home/nishanth/contact.txt",
  "/projects/list.txt",
  "/journey/list.txt",
]);

const BOOT_LINES: TerminalLine[] = [
  { text: "[  OK  ] Mounted /home filesystem", tone: "success" },
  { text: "[  OK  ] Initialized nishanth.service", tone: "success" },
  { text: "[  OK  ] Started chronogram-terminal.target", tone: "success" },
  { text: "[INFO ] Loading project index...", tone: "muted" },
  { text: "[INFO ] Loading journey logs...", tone: "muted" },
  { text: "[  OK  ] Shell ready. type 'help' for commands", tone: "success" },
];

function toPath(segments: string[]) {
  if (segments.length === 0) return "/";
  return `/${segments.join("/")}`;
}

function splitPath(value: string) {
  return value.split("/").filter(Boolean);
}

function formatPromptPath(path: string) {
  const homePath = "/home/nishanth";
  if (path === homePath) return "~";
  if (path.startsWith(`${homePath}/`)) return `~${path.slice(homePath.length)}`;
  return path;
}

function resolvePath(inputPath: string, cwdSegments: string[]) {
  const target = inputPath.trim();
  const start = target.startsWith("/") ? [] : [...cwdSegments];
  const parts = splitPath(target.startsWith("/") ? target : target);

  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      start.pop();
      continue;
    }
    start.push(part);
  }
  return start;
}

function isProjectFile(path: string) {
  if (!path.startsWith("/projects/") || !path.endsWith(".md")) return false;
  const fileName = path.replace("/projects/", "").replace(".md", "");
  return missions.some((mission) => mission.id === fileName);
}

function isJourneyFile(path: string) {
  if (!path.startsWith("/journey/") || !path.endsWith(".md")) return false;
  const fileName = path.replace("/journey/", "").replace(".md", "");
  return journeyStories.some((story) => story.id === fileName);
}

function isDirectory(path: string) {
  return STATIC_DIRS.has(path);
}

function isFile(path: string) {
  return STATIC_FILES.has(path) || isProjectFile(path) || isJourneyFile(path);
}

function listDirectory(path: string) {
  if (path === "/") return ["home/", "projects/", "journey/"];
  if (path === "/home") return ["nishanth/"];
  if (path === "/home/nishanth") {
    return ["readme.txt", "profile.txt", "resume.txt", "contact.txt"];
  }
  if (path === "/projects") {
    return ["list.txt", ...missions.map((mission) => `${mission.id}.md`)];
  }
  if (path === "/journey") {
    return ["list.txt", ...journeyStories.map((story) => `${story.id}.md`)];
  }
  return [];
}

function findMission(query: string): Mission | undefined {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return undefined;
  const index = Number(normalized);
  if (!Number.isNaN(index) && index > 0) return missions[index - 1];
  return missions.find(
    (mission) =>
      mission.id.toLowerCase().includes(normalized) ||
      mission.title.toLowerCase().includes(normalized) ||
      mission.domain.toLowerCase().includes(normalized)
  );
}

function findStory(query: string): JourneyStory | undefined {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return undefined;
  const index = Number(normalized);
  if (!Number.isNaN(index) && index > 0) return journeyStories[index - 1];
  return journeyStories.find(
    (story) =>
      story.id.toLowerCase().includes(normalized) ||
      story.title.toLowerCase().includes(normalized) ||
      story.tags.some((tag) => tag.toLowerCase().includes(normalized))
  );
}

function buildProjectLines(project: Mission): TerminalLine[] {
  return [
    { text: `title: ${project.title}`, tone: "accent" },
    { text: `domain: ${project.domain}` },
    { text: `role: ${project.role}` },
    { text: `duration: ${project.duration}` },
    { text: `challenge: ${project.challenge}` },
    { text: `outcome: ${project.headlineMetric}`, tone: "success" },
    { text: `stack: ${project.stack.join(", ")}` },
    { text: "timeline:" },
    ...project.phases.map((phase, index) => ({
      text: `  - T${index} ${phase.label}: ${phase.metricDelta}`,
    })),
  ];
}

function buildStoryLines(story: JourneyStory): TerminalLine[] {
  return [
    { text: `title: ${story.title}`, tone: "accent" },
    { text: `period: ${story.period}` },
    { text: `context: ${story.context}` },
    { text: `challenge: ${story.challenge}` },
    { text: `role: ${story.role}` },
    { text: `result: ${story.result}`, tone: "success" },
    { text: `tags: ${story.tags.join(", ")}` },
    { text: "lessons:" },
    ...story.lessons.map((lesson) => ({ text: `  - ${lesson}` })),
  ];
}

function readFile(path: string): TerminalLine[] {
  if (path === "/home/nishanth/readme.txt") {
    return [
      { text: "NISHANTH.OS terminal portfolio", tone: "accent" },
      { text: "Use Linux-like commands for navigation and data exploration." },
      { text: "Try: ls, cd /projects, cat list.txt, open rag, man project" },
    ];
  }
  if (path === "/home/nishanth/profile.txt") {
    return [
      { text: profile.name, tone: "accent" },
      { text: profile.title },
      { text: "strengths:" },
      ...profile.strengths.map((item) => ({ text: `  - ${item.name}: ${item.proof}` })),
    ];
  }
  if (path === "/home/nishanth/resume.txt") {
    return [
      { text: "Resume summary", tone: "accent" },
      { text: "- Role focus: AI/ML Engineer, Data Scientist" },
      { text: "- Specialties: RAG systems, distributed systems, vision, research" },
      { text: "- Download PDF: /resume.pdf", tone: "success" },
    ];
  }
  if (path === "/home/nishanth/contact.txt") {
    return [
      { text: "Contact channels", tone: "accent" },
      { text: "- email: nishanthgopi2002@gmail.com" },
      { text: "- github: github.com/GNishanth7" },
      { text: "- linkedin: linkedin.com/in/nishanth-gopinath" },
    ];
  }
  if (path === "/projects/list.txt") {
    return [
      { text: `projects (${missions.length})`, tone: "accent" },
      ...missions.map((mission, index) => ({
        text: `${index + 1}. ${mission.id}.md  # ${mission.title}`,
      })),
    ];
  }
  if (path === "/journey/list.txt") {
    return [
      { text: `stories (${journeyStories.length})`, tone: "accent" },
      ...journeyStories.map((story, index) => ({
        text: `${index + 1}. ${story.id}.md  # ${story.title}`,
      })),
    ];
  }
  if (isProjectFile(path)) {
    const id = path.replace("/projects/", "").replace(".md", "");
    const match = missions.find((mission) => mission.id === id);
    if (!match) return [{ text: "file not found", tone: "error" }];
    return buildProjectLines(match);
  }
  if (isJourneyFile(path)) {
    const id = path.replace("/journey/", "").replace(".md", "");
    const match = journeyStories.find((story) => story.id === id);
    if (!match) return [{ text: "file not found", tone: "error" }];
    return buildStoryLines(match);
  }
  return [{ text: "file not found", tone: "error" }];
}

function neofetchLines(cwd: string): TerminalLine[] {
  return [
    { text: "nishanth@portfolio", tone: "accent" },
    { text: "------------------", tone: "muted" },
    { text: "OS: NISHANTH.OS Linux 3.1" },
    { text: "Shell: zsh" },
    { text: "Terminal: chrono-term" },
    { text: `PWD: ${cwd}` },
    { text: `Projects: ${missions.length}` },
    { text: `Stories: ${journeyStories.length}` },
  ];
}

function helpLines(): TerminalLine[] {
  const lines: TerminalLine[] = [{ text: "commands:", tone: "accent" }];
  for (const doc of COMMAND_DOCS) {
    lines.push({
      text: `- ${doc.usage} -> ${doc.description}`,
      tone: "muted",
    });
  }
  lines.push({
    text: "Use: man <command> for examples.",
    tone: "success",
  });
  return lines;
}

function manLines(commandName: string): TerminalLine[] {
  const command = commandName.toLowerCase();
  const doc = COMMAND_DOCS.find((item) => item.name === command);
  if (!doc) {
    return [{ text: `man: no manual entry for ${commandName}`, tone: "error" }];
  }
  const lines: TerminalLine[] = [
    { text: `${doc.name.toUpperCase()} MANUAL`, tone: "accent" },
    { text: `usage: ${doc.usage}` },
    { text: `description: ${doc.description}` },
  ];
  if (doc.examples?.length) {
    lines.push({ text: "examples:" });
    lines.push(
      ...doc.examples.map<TerminalLine>((example) => ({
        text: `  - ${example}`,
        tone: "muted",
      }))
    );
  }
  return lines;
}

function toneClass(tone?: LineTone) {
  if (tone === "muted") return "text-[#5d8a5b]";
  if (tone === "success") return "text-[#5aff8d]";
  if (tone === "error") return "text-[#ff6b8f]";
  if (tone === "accent") return "text-[#57f7ff]";
  return "text-[#b8ffb2]";
}

function allProjectAndStoryKeywords() {
  return [
    ...missions.map((mission) => mission.id),
    ...missions.map((mission) => mission.title.toLowerCase()),
    ...journeyStories.map((story) => story.id),
    ...journeyStories.map((story) => story.title.toLowerCase()),
  ];
}

export default function TerminalShell() {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState("");
  const [cwdSegments, setCwdSegments] = useState<string[]>(HOME_SEGMENTS);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [bootLog, setBootLog] = useState<TerminalLine[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);

  const cwdPath = useMemo(() => toPath(cwdSegments), [cwdSegments]);
  const promptPath = useMemo(() => formatPromptPath(cwdPath), [cwdPath]);
  const commandHistory = useMemo(
    () => entries.map((entry) => entry.command).filter(Boolean),
    [entries]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = "night";
    localStorage.setItem(THEME_STORAGE_KEY, "night");
  }, []);

  useEffect(() => {
    let index = 0;
    let cancelled = false;
    let timer: number | undefined;

    const tick = () => {
      if (cancelled) return;

      const nextLine = BOOT_LINES[index];
      if (!nextLine) {
        timer = window.setTimeout(() => {
          if (!cancelled) setIsBooting(false);
        }, 180);
        return;
      }

      setBootLog((previous) => [...previous, nextLine]);
      index += 1;
      timer = window.setTimeout(tick, 220);
    };

    timer = window.setTimeout(tick, 220);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!viewportRef.current) return;
    viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
  }, [entries, bootLog, isBooting]);

  const append = (command: string, lines: TerminalLine[]) => {
    setEntries((previous) => [
      ...previous,
      { command, cwdAtRun: formatPromptPath(cwdPath), lines },
    ]);
  };

  const getPathSuggestions = (partial: string, forCommand: "cd" | "ls" | "cat") => {
    const baseSuggestions =
      forCommand === "cat"
        ? [...STATIC_FILES, ...missions.map((m) => `/projects/${m.id}.md`), ...journeyStories.map((s) => `/journey/${s.id}.md`)]
        : [...STATIC_DIRS];

    const cwdItems = listDirectory(cwdPath).map((item) => {
      const normalized = item.endsWith("/") ? item.slice(0, -1) : item;
      return partial.startsWith("/") ? `${cwdPath}/${normalized}`.replace("//", "/") : normalized;
    });

    const union = Array.from(new Set([...baseSuggestions, ...cwdItems]));
    if (!partial) return union.slice(0, 20);

    if (partial.startsWith("/")) {
      return union.filter((item) => item.startsWith(partial)).slice(0, 20);
    }

    return union
      .filter((item) => item.toLowerCase().startsWith(partial.toLowerCase()))
      .slice(0, 20);
  };

  const autocomplete = () => {
    const trimmedStart = input.trimStart();
    if (!trimmedStart) return;

    const hasTrailingSpace = /\s$/.test(input);
    const tokens = trimmedStart.split(/\s+/);
    const command = tokens[0].toLowerCase();

    if (tokens.length === 1 && !hasTrailingSpace) {
      const commandMatches = COMMAND_DOCS
        .map((doc) => doc.name)
        .filter((name) => name.startsWith(command));

      if (commandMatches.length === 1) {
        setInput(`${commandMatches[0]} `);
        return;
      }
      if (commandMatches.length > 1) {
        append(`tab-complete ${command}`, [
          { text: commandMatches.join("  "), tone: "success" },
        ]);
      }
      return;
    }

    const argPrefix = hasTrailingSpace ? "" : tokens[tokens.length - 1];
    let suggestions: string[] = [];

    if (command === "cd" || command === "ls" || command === "cat") {
      suggestions = getPathSuggestions(argPrefix, command);
    } else if (command === "project" || command === "open" || command === "story") {
      suggestions = allProjectAndStoryKeywords().filter((item) =>
        item.toLowerCase().startsWith(argPrefix.toLowerCase())
      );
    } else if (command === "theme") {
      suggestions = themeOptions.filter((item) =>
        item.startsWith(argPrefix.toLowerCase())
      );
    } else if (command === "man") {
      suggestions = COMMAND_DOCS.map((doc) => doc.name).filter((name) =>
        name.startsWith(argPrefix.toLowerCase())
      );
    }

    if (suggestions.length === 0) return;

    if (suggestions.length === 1) {
      const prefix = tokens.slice(0, -1).join(" ");
      const replacement = hasTrailingSpace ? `${trimmedStart}${suggestions[0]} ` : `${prefix} ${suggestions[0]} `;
      setInput(replacement.trimStart());
      return;
    }

    append(`tab-complete ${command}`, [{ text: suggestions.join("  "), tone: "success" }]);
  };

  const execute = (rawInput: string) => {
    const commandText = rawInput.trim();
    if (!commandText) return;

    const [name, ...rest] = commandText.split(/\s+/);
    const command = name.toLowerCase();
    const args = rest.join(" ").trim();

    if (command === "clear") {
      setEntries([]);
      return;
    }

    if (command === "help" || command === "commands") {
      append(commandText, helpLines());
      return;
    }

    if (command === "man") {
      if (!args) {
        append(commandText, [{ text: "usage: man <command>", tone: "error" }]);
        return;
      }
      append(commandText, manLines(args));
      return;
    }

    if (command === "whoami") {
      append(commandText, [{ text: "nishanth", tone: "success" }]);
      return;
    }

    if (command === "neofetch") {
      append(commandText, neofetchLines(cwdPath));
      return;
    }

    if (command === "pwd") {
      append(commandText, [{ text: cwdPath }]);
      return;
    }

    if (command === "ls") {
      const targetSegments = args ? resolvePath(args, cwdSegments) : cwdSegments;
      const targetPath = toPath(targetSegments);

      if (isFile(targetPath)) {
        append(commandText, [
          { text: targetPath.split("/").pop() || "", tone: "success" },
        ]);
        return;
      }
      if (!isDirectory(targetPath)) {
        append(commandText, [
          {
            text: `ls: cannot access '${args}': No such file or directory`,
            tone: "error",
          },
        ]);
        return;
      }

      const content = listDirectory(targetPath);
      append(
        commandText,
        content.length
          ? [{ text: content.join("  "), tone: "success" }]
          : [{ text: "(empty)", tone: "muted" }]
      );
      return;
    }

    if (command === "cd") {
      const target = args || "/home/nishanth";
      const targetSegments = resolvePath(target, cwdSegments);
      const targetPath = toPath(targetSegments);

      if (!isDirectory(targetPath)) {
        append(commandText, [
          { text: `cd: no such file or directory: ${target}`, tone: "error" },
        ]);
        return;
      }
      setCwdSegments(targetSegments);
      append(commandText, [{ text: `moved to ${targetPath}`, tone: "muted" }]);
      return;
    }

    if (command === "cat") {
      if (!args) {
        append(commandText, [{ text: "cat: missing file operand", tone: "error" }]);
        return;
      }
      const fileSegments = resolvePath(args, cwdSegments);
      const filePath = toPath(fileSegments);

      if (isDirectory(filePath)) {
        append(commandText, [{ text: `cat: ${args}: Is a directory`, tone: "error" }]);
        return;
      }
      if (!isFile(filePath)) {
        append(commandText, [{ text: `cat: ${args}: No such file`, tone: "error" }]);
        return;
      }
      append(commandText, readFile(filePath));
      return;
    }

    if (command === "projects") {
      append(commandText, readFile("/projects/list.txt"));
      return;
    }

    if (command === "project") {
      if (!args) {
        append(commandText, [
          { text: "usage: project <id|number|keyword>", tone: "error" },
        ]);
        return;
      }
      const match = findMission(args);
      if (!match) {
        append(commandText, [{ text: `project not found: ${args}`, tone: "error" }]);
        return;
      }
      append(commandText, buildProjectLines(match));
      return;
    }

    if (command === "journey") {
      append(commandText, readFile("/journey/list.txt"));
      return;
    }

    if (command === "story") {
      if (!args) {
        append(commandText, [
          { text: "usage: story <id|number|keyword>", tone: "error" },
        ]);
        return;
      }
      const match = findStory(args);
      if (!match) {
        append(commandText, [{ text: `story not found: ${args}`, tone: "error" }]);
        return;
      }
      append(commandText, buildStoryLines(match));
      return;
    }

    if (command === "open") {
      if (!args) {
        append(commandText, [{ text: "usage: open <keyword>", tone: "error" }]);
        return;
      }
      const projectMatch = findMission(args);
      if (projectMatch) {
        append(commandText, buildProjectLines(projectMatch));
        return;
      }
      const storyMatch = findStory(args);
      if (storyMatch) {
        append(commandText, buildStoryLines(storyMatch));
        return;
      }
      append(commandText, [{ text: `no match found for: ${args}`, tone: "error" }]);
      return;
    }

    if (command === "profile") {
      append(commandText, readFile("/home/nishanth/profile.txt"));
      return;
    }

    if (command === "resume") {
      append(commandText, readFile("/home/nishanth/resume.txt"));
      return;
    }

    if (command === "contact") {
      append(commandText, readFile("/home/nishanth/contact.txt"));
      return;
    }

    if (command === "theme") {
      const themeName = args.toLowerCase();
      if (!themeOptions.includes(themeName as (typeof themeOptions)[number])) {
        append(commandText, [
          {
            text: `invalid theme '${args}', use: ${themeOptions.join(", ")}`,
            tone: "error",
          },
        ]);
        return;
      }
      document.documentElement.dataset.theme = themeName;
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
      append(commandText, [{ text: `theme switched to ${themeName}`, tone: "success" }]);
      return;
    }

    if (command === "sudo") {
      if (!args) {
        append(commandText, [{ text: "usage: sudo <command>", tone: "error" }]);
        return;
      }
      if (args.toLowerCase() === "hire nishanth") {
        append(commandText, [
          { text: "[sudo] password for nishanth: ********", tone: "muted" },
          { text: "Access granted. Offer letter generated.", tone: "success" },
        ]);
        return;
      }
      if (args.toLowerCase().startsWith("rm -rf")) {
        append(commandText, [
          { text: "[sudo] password for nishanth: ********", tone: "muted" },
          { text: "Permission denied. Critical system protected.", tone: "error" },
        ]);
        return;
      }
      append(commandText, [
        { text: "[sudo] password for nishanth: ********", tone: "muted" },
        {
          text: "nishanth is not in the sudoers file. This incident will be reported.",
          tone: "error",
        },
      ]);
      return;
    }

    append(commandText, [
      { text: `${command}: command not found`, tone: "error" },
      { text: `type "help" to list available commands`, tone: "muted" },
    ]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBooting) return;
    execute(input);
    setInput("");
    setHistoryIndex(null);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      autocomplete();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (commandHistory.length === 0 || historyIndex === null) return;
      const nextIndex = Math.min(commandHistory.length, historyIndex + 1);
      if (nextIndex === commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
        return;
      }
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }
  };

  return (
    <main className="min-h-screen bg-[#060a06] py-4 px-3 md:py-8 md:px-6">
      <section
        className="mx-auto max-w-6xl border rounded-xl overflow-hidden shadow-[0_0_50px_rgba(90,255,141,0.08)]"
        style={{ borderColor: "rgba(90,255,141,0.32)" }}
      >
        <header className="px-4 py-3 border-b flex items-center justify-between gap-3 bg-[#0a120a]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <p className="text-xs text-[#78bd78] cc-mono">
            nishanth@portfolio:{promptPath}
          </p>
          <p className="text-xs text-[#58f58e] cc-mono">Linux Terminal</p>
        </header>

        <div className="relative">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(90,255,141,0.08)_2px,rgba(90,255,141,0.08)_4px)]" />

          <div
            ref={viewportRef}
            className="relative z-10 p-4 md:p-6 max-h-[70vh] overflow-y-auto cc-mono text-sm space-y-4 bg-[#060a06]"
          >
            {bootLog.map((line, idx) =>
              line ? (
                <p key={`boot-${idx}`} className={toneClass(line.tone)}>
                  {line.text}
                </p>
              ) : null
            )}

            {!isBooting && entries.length === 0 && (
              <p className="text-[#57f7ff]">
                terminal ready {"->"} try: help, man project, ls, cd /projects, cat list.txt, open rag
              </p>
            )}

            {entries.map((entry, idx) => (
              <div key={`${entry.command}-${idx}`} className="space-y-1">
                <p className="text-[#58f58e]">
                  nishanth@portfolio:{entry.cwdAtRun}$ {entry.command}
                </p>
                {entry.lines.map((line, lineIdx) => (
                  <p key={`${entry.command}-${idx}-${lineIdx}`} className={toneClass(line.tone)}>
                    {line.text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="border-t px-4 py-3 flex items-center gap-2 bg-[#0a120a]"
          style={{ borderColor: "rgba(90,255,141,0.28)" }}
        >
          <span className="text-[#58f58e] cc-mono">
            nishanth@portfolio:{promptPath}$
          </span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onInputKeyDown}
            className="flex-1 bg-transparent outline-none cc-mono text-[#b8ffb2] placeholder:text-[#4d734d]"
            placeholder="type command... (help for all commands)"
            aria-label="terminal input"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            disabled={isBooting}
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded border text-xs cc-mono text-[#58f58e] hover:bg-[#123012] disabled:opacity-50"
            style={{ borderColor: "rgba(90,255,141,0.3)" }}
            disabled={isBooting}
          >
            exec
          </button>
        </form>
      </section>
    </main>
  );
}
