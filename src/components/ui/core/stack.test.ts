import { describe, expect, it } from 'vitest'

import { splitLayoutProps } from './stack'

describe('splitLayoutProps', () => {
  it('correctly separates Box and Stack props from standard HTML attributes', () => {
    const props = {
      p: 'md',
      gap: 'sm',
      direction: 'col',
      className: 'custom-class',
      onClick: () => {},
      'data-testid': 'test-element',
    }

    const { layoutProps, restProps } = splitLayoutProps(props)

    // Layout props should contain padding (Box) and flex properties (Stack)
    expect(layoutProps).toEqual({
      p: 'md',
      gap: 'sm',
      direction: 'col',
    })

    // Rest props should contain standard HTML attributes and handlers
    expect(restProps).toEqual({
      className: 'custom-class',
      onClick: expect.any(Function),
      'data-testid': 'test-element',
    })
  })

  it('correctly extracts breakpoint keys', () => {
    const props = {
      md: { p: 'lg', display: 'none' },
      xl: { gap: 'xl' },
      id: 'my-element',
    }

    const { layoutProps, restProps } = splitLayoutProps(props)

    expect(layoutProps).toEqual({
      md: { p: 'lg', display: 'none' },
      xl: { gap: 'xl' },
    })

    expect(restProps).toEqual({
      id: 'my-element',
    })
  })

  it('keeps the `as` prop inside layoutProps for headless component resolution', () => {
    const props = {
      as: 'button',
      type: 'submit',
      m: 'none',
    }

    const { layoutProps, restProps } = splitLayoutProps(props)

    expect(layoutProps).toEqual({
      as: 'button',
      m: 'none',
    })

    expect(restProps).toEqual({
      type: 'submit',
    })
  })
})
