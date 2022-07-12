import * as vscode from 'vscode';
import {} from './stream-parser/delimiter-parser';
export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "logcat-viewer" is now active!');
	let disposable = vscode.commands.registerCommand('logcat-viewer.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from logcat viewer!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
