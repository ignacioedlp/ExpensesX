// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <GraphAreaCustom {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import GraphAreaCustom from './GraphAreaCustom'

export const generated = () => {
  return <GraphAreaCustom />
}

export default {
  title: 'Components/GraphAreaCustom',
  component: GraphAreaCustom,
}
