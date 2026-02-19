import React from 'react'

/**
 * Next.js Template for global page transitions.
 * Templates re-run their logic on every navigation, ensuring the animation
 * triggers when moving between different pages of the same level.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in flex flex-1 flex-col">{children}</div>
}
