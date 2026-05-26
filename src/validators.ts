import * as v from "valibot";
import { GITHUB_ISSUE_OR_PULL_URL_REGEX } from "./helpers/github";

export const urlSchema = v.pipe(v.string(), v.url(), v.regex(GITHUB_ISSUE_OR_PULL_URL_REGEX, "Expected a GitHub issue or pull request URL."));

export const querySchema = v.object({
  issueUrls: v.union([v.array(urlSchema), urlSchema]),
  users: v.optional(v.union([v.array(v.string()), v.string()])),
});

export const responseSchema = v.record(
  v.string(),
  v.union([
    v.object({
      matchResultArray: v.record(v.string(), v.array(v.string())),
      similarIssues: v.array(
        v.object({
          id: v.string(),
          issue_id: v.string(),
          similarity: v.number(),
        })
      ),
      sortedContributors: v.array(
        v.object({
          login: v.string(),
          matches: v.array(v.string()),
          maxSimilarity: v.number(),
        })
      ),
    }),
    v.null(),
  ])
);
