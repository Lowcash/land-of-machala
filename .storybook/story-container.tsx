/**
 * Storybook-only layout helpers.
 * Not for import outside of *.stories.tsx files.
 */

type StoryContainerProps = {
  children: React.ReactNode
  width?: 'full' | 'narrow'
}

const CONTAINER_WIDTH_CLASS: Record<NonNullable<StoryContainerProps['width']>, string> = {
  full: 'w-full',
  narrow: 'w-full max-w-sm',
}

const STORY_CONTAINER_CLASS = 'flex h-full w-full items-center justify-center'

/**
 * Provides a dark surface context for stories that demonstrate
 * tones, text alignment, or width constraints. Use as a `decorators`
 * entry in story meta when `layout: 'centered'` + dark context is needed.
 * Outer frame centers story both axes; inner frame applies width presets.
 */
export function StoryContainer({ children, width = 'full' }: StoryContainerProps) {
  return (
    <div className={STORY_CONTAINER_CLASS}>
      <div className={CONTAINER_WIDTH_CLASS[width]}>{children}</div>
    </div>
  )
}
