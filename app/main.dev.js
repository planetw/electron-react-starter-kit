import path from 'path'
import { app, BrowserWindow } from 'electron'

import MenuBuilder from './menu'

const isDev = process.env.NODE_ENV === 'development'

const loadUrl = isDev
   ? 'http://localhost:1212/dist/index.html'
   : `file://${__dirname}/dist/index.html`
let mainWindow = null

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

if (isDev || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')({
    isEnabled: true,
  })
}

const createWindow = async () => {
  if (isDev || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
   },
  })

  mainWindow.loadURL(`file://${path.join(__dirname, '..', 'dist/index.html')}`)

  if (isDev || process.env.DEBUG_PROD === 'true') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
}

app.on('ready', async () => {
  await createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.setAboutPanelOptions({
  applicationName: process.env.OWNER,
})
