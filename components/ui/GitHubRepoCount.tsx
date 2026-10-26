"use client";

import { useEffect, useState } from "react";

const REFRESH_INTERVAL = 5 * 60 * 1000;
const countClassName =
  "font-mono text-2xl font-medium tracking-[-0.02em] text-white sm:text-[1.75rem]";

export function GitHubRepoCount() {
  const [count, setCount] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    let timeout: ReturnType<typeof setTimeout>;

    const refreshCount = async () => {
      try {
        const response = await fetch("/api/github-stats", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`GitHub statistics endpoint returned HTTP ${response.status}.`);
        }

        const data: unknown = await response.json();
        if (
          typeof data !== "object" ||
          data === null ||
          !("publicRepos" in data) ||
          typeof data.publicRepos !== "number" ||
          !Number.isSafeInteger(data.publicRepos) ||
          data.publicRepos < 0
        ) {
          throw new Error("GitHub statistics endpoint returned an invalid repository count.");
        }

        if (active) {
          setCount(data.publicRepos);
          setUnavailable(false);
        }
      } catch (error) {
        console.error("Unable to load the GitHub public repository count.", error);
        if (active) {
          setUnavailable(true);
        }
      } finally {
        if (active) {
          timeout = setTimeout(refreshCount, REFRESH_INTERVAL);
        }
      }
    };

    void refreshCount();

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  if (count === null && unavailable) {
    return (
      <dd
        className={countClassName}
        aria-label="GitHub repository count unavailable"
        title="GitHub repository count unavailable"
      >
        Unavailable
      </dd>
    );
  }

  return (
    <dd
      className={countClassName}
      aria-label={count === null ? "Loading GitHub repository count" : `${count} public repositories`}
    >
      {count ?? "…"}
    </dd>
  );
}
