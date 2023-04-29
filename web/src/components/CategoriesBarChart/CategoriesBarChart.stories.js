// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <CategoriesBarChart {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import CategoriesBarChart from './CategoriesBarChart'

export const generated = () => {
  return <CategoriesBarChart />
}

export default {
  title: 'Components/CategoriesBarChart',
  component: CategoriesBarChart,
}
