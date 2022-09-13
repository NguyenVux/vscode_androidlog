import * as vscode from "vscode";
import { adb } from "./ADBDriver";

export class adbDevicesDataProvider implements vscode.TreeDataProvider<string>{
	onDidChangeTreeData?: vscode.Event<string | void | string[] | null | undefined> | undefined;
	private _onDidChangeTreeData: vscode.EventEmitter<string[] | undefined | void> = new vscode.EventEmitter<string[] | undefined | void>();
	getTreeItem(element: string): vscode.TreeItem | Thenable<vscode.TreeItem> {
		throw new Error("Method not implemented.");
	}
	getChildren(element?: string | undefined): vscode.ProviderResult<string[]> {
		return adb.getDevices();
	}

	constructor()
	{
		
	}

}