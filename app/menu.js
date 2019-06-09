import { app, Menu } from 'electron'

export default class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow
  }

  buildMenu() {
    const template = process.platform === 'darwin'
      ? this.buildDarwinTemplate()
      : this.buildDefaultTemplate()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'Electron',
      submenu: [
        { label: '關於', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator'},
        {
          label: '關閉視窗',
          accelerator: 'Command+W',
          click: () => {
            this.mainWindow.close()
          },
        },
        {
          label: '關閉',
          accelerator: 'Command+Q',
          role: 'quit'
        },
      ],
    }
  
    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        { label: '復原', accelerator: 'Command+Z', selector: 'redo' },
        { label: '取消復原', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: '剪下', accelerator: 'Command+X', selector: 'cut:' },
        { label: '複製', accelerator: 'Command+C', selector: 'copy:' },
        { label: '貼上', accelerator: 'Command+V', selector: 'paste:' },
        { label: '全選', accelerator: 'Command+A', selector: 'selectAll:' },
      ],
    }
    
    return [subMenuAbout, subMenuEdit]
  }

  buildDefaultTemplate() {
    return []
  }
}
