import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Spinner from '../../../components/layout/Spinner'

describe('Spinner', () => {
  it('img must have alt', () => {
    render(<Spinner />)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Loading...')
  })
})
