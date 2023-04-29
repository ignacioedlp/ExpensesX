// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Navbart {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Navbar from './Navbar'

export const generated = () => {
  return <Navbar />
}

export default {
  title: 'Components/Navbar',
  component: Navbar,
}
