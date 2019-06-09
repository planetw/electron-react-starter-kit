import React from 'react'
import ReactDOM from 'react-dom'

const el = document.getElementById('app')

const render = component => { ReactDOM.render(component, el) }

render(<div>Electron</div>)
