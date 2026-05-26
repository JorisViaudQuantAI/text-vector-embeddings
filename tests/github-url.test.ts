import { describe, expect, it } from "bun:test";
import * as v from "valibot";
import { parseGitHubUrl } from "../src/helpers/github";
import { urlSchema } from "../src/validators";

describe("GitHub URL helpers", () => {
  it("accepts www, trailing slash, query, and fragment variants", () => {
    const url = "https://www.github.com/ubiquity-os-marketplace/text-vector-embeddings/issues/92/?utm_source=test#issuecomment-1";

    expect(v.safeParse(urlSchema, url).success).toBe(true);
    expect(parseGitHubUrl(url)).toEqual({
      owner: "ubiquity-os-marketplace",
      repo: "text-vector-embeddings",
      issue_number: 92,
    });
  });

  it("rejects non-GitHub issue URLs", () => {
    expect(v.safeParse(urlSchema, "https://example.com/foo/bar/issues/1").success).toBe(false);
  });
});
