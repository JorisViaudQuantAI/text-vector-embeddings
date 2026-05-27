export const GITHUB_ISSUE_OR_PULL_URL_REGEX = /^https:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/(?:issues|pull)\/(\d+)\/?(?:[?#].*)?$/i;

export function parseGitHubUrl(url: string) {
  const match = url.trim().match(GITHUB_ISSUE_OR_PULL_URL_REGEX);
  if (!match) {
    throw new Error(`[parseGitHubUrl] Invalid url: [${url}]`);
  }
  return {
    owner: match[1],
    repo: match[2],
    issue_number: Number(match[3]),
  };
}
