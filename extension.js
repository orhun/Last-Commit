const vscode = require("vscode");
const { execSync } = require("child_process");
const { setTimeout } = require("timers");
const { watch } = require("fs");

/**
 * Execute a git command.
 *
 * @param  {string} command
 * @return {string} output
 */
function execGit(command) {
  let cmd = `cd ${vscode.workspace.rootPath} && git ${command}`;
  if (vscode.env.shell.includes(".exe")) {
    cmd = `${vscode.workspace.rootPath.substring(0, 2)} && ${cmd}`;
  }
  try {
    return execSync(cmd).toString().trim();
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Activate the extension.
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  if (
    vscode.workspace.rootPath !== undefined &&
    execGit("rev-parse --is-inside-work-tree") === "true"
  ) {
    const gitLogItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      -1
    );
    gitLogItem.text = `$(git-commit) ${execGit("log --oneline -n 1")}`;
    gitLogItem.show();
    watch(`${execGit("rev-parse --show-toplevel")}/.git/logs/`, () => {
      setTimeout(() => {
        gitLogItem.text = `$(git-commit) ${execGit("log --oneline -n 1")}`;
      }, 5000);
    });
    context.subscriptions.push(gitLogItem);
  }
}
exports.activate = activate;

/* Deactivate the extension. */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
