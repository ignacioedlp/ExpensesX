import { render } from '@redwoodjs/testing/web'

import GraphBarCustom from './GraphBarCustom'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GraphBarCustom', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GraphBarCustom />)
    }).not.toThrow()
  })
})
