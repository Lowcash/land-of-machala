import type { Decorator } from '@storybook/nextjs-vite'

/**
 * Wraps story in a div with the given className. Useful when a component's
 * visual behaviour only becomes apparent with a defined container —
 * constrained width, explicit background, padding context, etc.
 */
export function withCanvasWidth(className: string): Decorator {
  return function CanvasWidth(Story) {
    return (
      <div className={className}>
        <Story />
      </div>
    )
  }
}
