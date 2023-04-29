// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <ExpensesLinearGraph {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ExpensesLinearGraph from './ExpensesLinearGraph'

export const generated = () => {
  return <ExpensesLinearGraph />
}

export default {
  title: 'Components/ExpensesLinearGraph',
  component: ExpensesLinearGraph,
}
