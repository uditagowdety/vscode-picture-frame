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
	  return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
		  <meta charset="UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <title>Screensaver</title>
		  <style>
			body {
			  margin: 0;
			  background-color: black;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  height: 100vh;
			}
			canvas {
			  display: block;
			}
		  </style>
		</head>
		<body>
		  <canvas id="screensaver"></canvas>
		  <script>
			const canvas = document.getElementById('screensaver');
			const ctx = canvas.getContext('2d');
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
  
			function drawCircle() {
			  ctx.clearRect(0, 0, canvas.width, canvas.height);
			  const x = Math.random() * canvas.width;
			  const y = Math.random() * canvas.height;
			  const radius = Math.random() * 50;
			  ctx.beginPath();
			  ctx.arc(x, y, radius, 0, Math.PI * 2);
			  ctx.fillStyle = \`hsl(\${Math.random() * 360}, 100%, 50%)\`;
			  ctx.fill();
			  requestAnimationFrame(drawCircle);
			}
  
			drawCircle();
		  </script>
		</body>
		</html>
	  `;
	}
  }
