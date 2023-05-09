// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <GraphBarCustom {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import GraphBarCustom from './GraphBarCustom'

export const generated = () => {
  return <GraphBarCustom />
}

export default {
  title: 'Components/GraphBarCustom',
  component: GraphBarCustom,
}
