import path from 'path'

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const OWNER = process.env.OWNER || 'Electron'
export const port = process.env.PORT || 1212

export const rootPath = path.resolve(__dirname, '..')
export const appPath = path.join(rootPath, 'app')
export const distPath = path.join(rootPath, 'dist')
export const dllPath = path.join(rootPath, 'dll')
