import { render } from '@redwoodjs/testing/web'

import ExpensesLinearGraph from './ExpensesLinearGraph'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExpensesLinearGraph', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExpensesLinearGraph />)
    }).not.toThrow()
  })
})
