import { render } from '@redwoodjs/testing/web'

import GraphPieCustom from './GraphPieCustom'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GraphPieCustom', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GraphPieCustom />)
    }).not.toThrow()
  })
})
