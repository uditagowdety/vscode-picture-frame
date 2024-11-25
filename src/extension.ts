// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-picture-frame" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vscode-picture-frame.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from picture frame!');
	});

	context.subscriptions.push(disposable);

	// Register a Webview View Provider for the Screensaver Sidebar
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		  ScreensaverViewProvider.viewType,
		  new ScreensaverViewProvider(context.extensionUri)
		)
	  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

// Webview View Provider for the Screensaver
class ScreensaverViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'screensaverView';
  
	constructor(private readonly extensionUri: vscode.Uri) {}
  
	// Called when the sidebar view is opened
	resolveWebviewView(webviewView: vscode.WebviewView) {
	  webviewView.webview.options = {
		enableScripts: true, // Allow running JavaScript in the WebView
	  };
  
	  // Add HTML content for the screensaver
	  webviewView.webview.html = this.getHtmlForWebview();
	}
  
	private getHtmlForWebview(): string {
		const imageUri = vscode.Uri.joinPath(this.extensionUri, 'media', 'picture.jpg');
		return `
		  <!DOCTYPE html>
		  <html lang="en">
		  <head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Picture Frame</title>
			<style>
			  body {
				margin: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100vh;
				background-color: #2e3440;
			  }
			  img {
				max-width: 100%;
				max-height: 100%;
				border: 5px solid #88c0d0;
				border-radius: 10px;
			  }
			</style>
		  </head>
		  <body>
			<img src="${imageUri}" alt="Picture Frame" />
		  </body>
		  </html>
		`;
	  }
}	  