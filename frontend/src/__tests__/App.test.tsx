import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../components/App'

describe('Rendering', () => {
  it('Should render Hello World', () => {
    render(<App />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
