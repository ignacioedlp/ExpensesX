// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <GraphPieCustom {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import GraphPieCustom from './GraphPieCustom'

export const generated = () => {
  return <GraphPieCustom />
}

export default {
  title: 'Components/GraphPieCustom',
  component: GraphPieCustom,
}
