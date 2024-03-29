// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

const dockMenu = Menu.buildFromTemplate([
  {
    label: '语雀'
  }
])

app.dock.setMenu(dockMenu)

function createWindow () {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: '语雀',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'images/appIcon.png')
  })

  if (process.platform === 'darwin') {
    app.dock.setIcon(path.join(__dirname, 'images/appIcon.png'))
  }

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    event.preventDefault()
    mainWindow.loadURL(url)
  })

  mainWindow.loadURL('https://www.yuque.com/dashboard/books')
  mainWindow.maximize()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.allowRendererProcessReuse = true

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
