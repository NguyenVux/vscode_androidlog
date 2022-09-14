import * as vscode from "vscode";
import { adb, adbDevice_t} from "./ADBDriver";

export class ADBDevicesDataProvider implements vscode.TreeDataProvider<adbDevice_t>{
	private _onDidChangeTreeData: vscode.EventEmitter<adbDevice_t[] | undefined | void> = new vscode.EventEmitter<adbDevice_t[] | undefined | void>();
	onDidChangeTreeData: vscode.Event<adbDevice_t | void | adbDevice_t[] | null | undefined> | undefined = this._onDidChangeTreeData.event;
	getTreeItem(element: adbDevice_t): ADBDevicesTreeItem | Thenable<ADBDevicesTreeItem> {
		return new ADBDevicesTreeItem(element);
	}
	getChildren(element?: adbDevice_t | undefined): vscode.ProviderResult<adbDevice_t[]> {
		if(!element)
		{
			return (async()=>{
				const devicesList = await adb.getDevices();
				return devicesList.map(value => value.split("\t")[0]);
			})();
		}
	}

	refresh(){
		this._onDidChangeTreeData.fire();
	}

}

class ADBDevicesTreeItem extends vscode.TreeItem{
	constructor(adbDevice: adbDevice_t)
	{
		super(adbDevice,vscode.TreeItemCollapsibleState.None);
		this.command = {
			command:"",
			arguments:[],
			title:""
		};
	}
}