import { render } from '@redwoodjs/testing/web'

import NormalLayout from './NormalLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NormalLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NormalLayout />)
    }).not.toThrow()
  })
})
