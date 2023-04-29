import { render } from '@redwoodjs/testing/web'

import CategoriesBarChart from './CategoriesBarChart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CategoriesBarChart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategoriesBarChart />)
    }).not.toThrow()
  })
})
