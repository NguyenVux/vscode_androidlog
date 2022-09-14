import * as vscode from "vscode";
import {} from "./stream-parser/delimiter-parser";
import {adb, adbDevice_t} from "./ADBDriver";
import { ADBDevicesDataProvider } from "./adbDataProvider";
import { LogcatDataProvider } from "./logcatDataProvider";

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
		vscode.commands.registerCommand("logcat.device-entry-action",async (device:adbDevice_t)=>{
			vscode.window.showInformationMessage(device);
			const uri = vscode.Uri.from({scheme:LogcatDataProvider.scheme,path:device});
			const editor = await vscode.window.showTextDocument(uri,{});
			editor.edit(builder=>{
				const pos = new vscode.Position(editor.document.lineCount-1,editor.document.);
				builder.insert(pos,`${editor.document.eol}123`);
			});
		}),
		LogcatDataProvider.register(context)
	];


	disposable.forEach((disposable)=>context.subscriptions.push(disposable));
}

// this method is called when your extension is deactivated
export function deactivate() {}
