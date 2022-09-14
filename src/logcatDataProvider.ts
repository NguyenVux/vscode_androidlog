import * as vscode from "vscode";


export class LogcatDataProvider implements vscode.TextDocumentContentProvider{
	onDidChange?: vscode.Event<vscode.Uri> | undefined;
	provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
		vscode.window.showInformationMessage(uri.toString());
		return "123";
	}
	static scheme:string = "logcat";
	public static register(context : vscode.ExtensionContext): vscode.Disposable{
		const logcatDataProvider = new LogcatDataProvider();
		let disposable = vscode.workspace.registerTextDocumentContentProvider(LogcatDataProvider.scheme,logcatDataProvider);
		return disposable;
	}
}