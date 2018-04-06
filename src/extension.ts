'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spinRun } from './spinRun';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "code-spin" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('spin.check', () => {
        spinRun('-a');
    }));

    context.subscriptions.push(vscode.commands.registerCommand('spin.run', () => {
        spinRun('-run');
    }));

    context.subscriptions.push(vscode.commands.registerCommand('spin.random', () => {
        spinRun(vscode.workspace.getConfiguration("spin").get("random"));
    }));

    vscode.workspace.onDidSaveTextDocument(document => {
        if (document.languageId !== "promela") {
            return;
        }
        if (!vscode.workspace.getConfiguration("spin").get("checkOnSave")) {
            return;
        }
        switch (vscode.workspace.getConfiguration("spin").get("onSaveCommand")) {
            case "check":
                spinRun("-a");
                break;
            case "run":
                spinRun("-run");
                break;
            case "random":
                spinRun(vscode.workspace.getConfiguration("spin").get("random"));
                break;
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}