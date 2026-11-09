const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

if (!app.requestSingleInstanceLock()) { app.quit(); }

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 480, height: 860, minWidth: 360, minHeight: 600,
    title: 'AQL tra cứu',
    icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#eaf4ff',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, autoplayPolicy: 'no-user-gesture-required' }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.on('page-title-updated', e => e.preventDefault());
}
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
