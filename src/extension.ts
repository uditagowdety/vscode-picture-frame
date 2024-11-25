import * as vscode from 'vscode';

// Called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-picture-frame" is now active!');

  // Register a Webview View Provider for the Screensaver Sidebar
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ScreensaverViewProvider.viewType,
      new ScreensaverViewProvider(context.extensionUri)
    )
  );
}

// Called when the extension is deactivated
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
