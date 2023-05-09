import { render } from '@redwoodjs/testing/web'

import GraphAreaCustom from './GraphAreaCustom'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GraphAreaCustom', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GraphAreaCustom />)
    }).not.toThrow()
  })
})
