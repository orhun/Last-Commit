const vscode = require("vscode");
const { exec } = require("child_process");
const { setTimeout } = require("timers");

/**
 * Show the last commit on the given item.
 *
 * @param {vscode.StatusBarItem} item
 */
function showLastCommit(item) {
  exec(
    `cd ${vscode.workspace.rootPath} && git log --oneline -n 1`,
    null,
    (error, stdout, stderr) => {
      if (stdout) {
        item.text = `$(git-commit) ${stdout}`;
        item.show();
      } else {
        console.error(`${error} ${stderr}`);
      }
    }
  );
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
