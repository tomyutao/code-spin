// import path = require('path');
import vscode = require('vscode');
import cp = require('child_process');
//import { resolve } from 'dns';

let output = vscode.window.createOutputChannel("Spin");

export function spinRun(args: string | undefined) {
  if (args === undefined) {
    return;
  }

  let editor = vscode.window.activeTextEditor;

  // check if there is an active file
  if (!editor) {
    vscode.window.showErrorMessage('No editor is active');
    return;
  }

  // check whether the language is promela 
  if (editor.document.languageId !== 'promela') {
    vscode.window.showErrorMessage('File is not a Promela file');
    return;
  }

  let documentUri = editor.document.uri.fsPath;
  let spin = <string>vscode.workspace.getConfiguration('spin').get('path');
  output.clear();
  output.show();
  output.appendLine(spin + " " + args + " " + documentUri);
  cp.execFile(spin, [args, documentUri], {}, (err, stdout, stderr) => {
    if (err && (<any>err).code === "ENOENT") {
      vscode.window.showInformationMessage("SPIN not found");
      return;
    }
    if (err && stderr) {
      vscode.window.showInformationMessage("Error running");
      output.appendLine("Error running tool");
      output.appendLine(stderr);
      return;
    }
    output.appendLine(stdout);
  });
}
