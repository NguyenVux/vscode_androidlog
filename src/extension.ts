import * as vscode from "vscode";
import {} from "./stream-parser/delimiter-parser";
import {adb} from "./ADBDriver";


// const adbDriver = new ADBDriver({});
export function activate(context: vscode.ExtensionContext) {
	
	console.log("Congratulations, your extension \"logcat-viewer\" is now active!");
	let disposable = vscode.commands.registerCommand("logcat-viewer.helloWorld", () => {
		adb.getDevices().then((list)=>{
			vscode.window.showInformationMessage(list.toString());
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
