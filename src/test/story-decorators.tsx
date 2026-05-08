import type { Decorator } from '@storybook/nextjs-vite'

/**
 * Constrains story canvas to a fixed width. Useful when a component's
 * visual behaviour only becomes apparent with a defined container
 * (e.g. text alignment, wrapping, content-width cards).
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
