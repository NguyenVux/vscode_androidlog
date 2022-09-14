import * as vscode from "vscode";
import {} from "./stream-parser/delimiter-parser";
import {adb} from "./ADBDriver";
import { ADBDevicesDataProvider } from "./adbDataProvider";

// const adbDriver = new ADBDriver({});
export async function activate(context: vscode.ExtensionContext) {
	
	console.log("\"logcat-viewer\" is now active!");
	adb.startADBServer();
	const adbDevicesDataProvider = new ADBDevicesDataProvider();
	
	let disposable:vscode.Disposable[] = [
		vscode.window.registerTreeDataProvider("adbDevices", adbDevicesDataProvider),
		vscode.commands.registerCommand("logcat-viewer.refresh-devices-entry", () => {
			adbDevicesDataProvider.refresh();
		}),
	];

	disposable.forEach((disposable)=>context.subscriptions.push(disposable));
}

// this method is called when your extension is deactivated
export function deactivate() {}
