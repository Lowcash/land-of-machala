import React from 'react'

import { DIRECTIONS, WEARABLES } from '@/const'

export type Direction = (typeof DIRECTIONS)[number]

export type Wearable = (typeof WEARABLES)[number]

export type PropsWithChildrenAndClassName<P = unknown> = React.PropsWithChildren<P> & {
  className?: string;
}