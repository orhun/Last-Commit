const vscode = require("vscode");
const { exec } = require("child_process");
const { setTimeout } = require("timers");

/**
 * Get the command that prints the last commit.
 *
 * @return {string} command
 */
function getGitCommand() {
  let command = `cd ${vscode.workspace.rootPath} && git log --oneline -n 1`;
  if (vscode.env.shell.includes(".exe")) {
    command = `${vscode.workspace.rootPath.substring(0, 2)} && ${command}`;
  }
  return command;
}

/**
 * Show the last commit on the given item.
 *
 * @param {vscode.StatusBarItem} item
 */
function showLastCommit(item) {
  exec(getGitCommand(), null, (error, stdout, stderr) => {
    if (stdout) {
      item.text = `$(git-commit) ${stdout}`;
      item.show();
    } else {
      console.error(`${error} ${stderr}`);
    }
  });
}

/**
 * Activate the extension.
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  if (vscode.workspace.rootPath !== undefined) {
    const gitLogItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      -1
    );
    showLastCommit(gitLogItem);
    vscode.workspace
      .createFileSystemWatcher(`**/.git/COMMIT_EDITMSG`)
      .onDidChange(() => {
        setTimeout(showLastCommit.bind(null, gitLogItem), 5000);
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
