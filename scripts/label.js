"use strict";

const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  const {
    context: {
      repo: { owner, repo },
    },
  } = github;
  const { REF_ISSUES = "", GITHUB_TOKEN = "" } = process.env;
  try {
    const issues = REF_ISSUES.split(",").map(Number).filter(Boolean);
    const octokit = github.getOctokit(REF_ISSUES);
    for (const issue of issues) {
      await octokit.issues.addLabels({
        owner,
        repo,
        issue_number: issue,
        labels: "pr-merged",
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
