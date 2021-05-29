import React from 'react'
import {render, cleanup, fireEvent} from "@testing-library/react"
import ReactDOM from 'react-dom'
import HomePage from './index'

afterEach(cleanup)
test('should render without crashing', () => {
    const div = document.createElement("div")
    ReactDOM.render(<HomePage label = "Click me"/>,div)
})

