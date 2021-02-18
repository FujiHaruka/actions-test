"use strict";

const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  try {
    const issues = core
      .getInput("issues")
      .split(",")
      .map(Number)
      .filter(Boolean);
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    for (const issue of issues) {
      await octokit.issues.addLabels({
        owner: "FujiHaruka",
        repo: "actions-test",
        issue_number: issue,
        labels: "pr-merged",
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
