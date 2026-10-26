import { NextResponse } from "next/server";
import { profile } from "@/content/profile";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = new URL(profile.github).pathname.split("/").filter(Boolean)[0];

  if (!username) {
    console.error("Unable to fetch GitHub statistics: the profile URL has no username.");
    return NextResponse.json({ error: "GitHub profile is not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (!response.ok) {
      console.error(`GitHub statistics request failed with HTTP ${response.status}.`);
      return NextResponse.json(
        { error: "Unable to fetch GitHub statistics" },
        { status: response.status === 404 ? 404 : 502 },
      );
    }

    const data: unknown = await response.json();
    if (
      typeof data !== "object" ||
      data === null ||
      !("login" in data) ||
      typeof data.login !== "string" ||
      !("public_repos" in data) ||
      typeof data.public_repos !== "number" ||
      !Number.isSafeInteger(data.public_repos) ||
      data.public_repos < 0 ||
      !("html_url" in data) ||
      typeof data.html_url !== "string"
    ) {
      console.error("GitHub statistics response did not include valid public user data.");
      return NextResponse.json(
        { error: "Invalid GitHub statistics response" },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        username: data.login,
        publicRepos: data.public_repos,
        profileUrl: data.html_url,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("GitHub statistics service is unavailable.", error);
    return NextResponse.json(
      { error: "GitHub service is temporarily unavailable" },
      { status: 502 },
    );
  }
}
