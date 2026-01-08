/**
 * ServiceTable - Unified table component for game services (smith, healer, tavern, etc.)
 * Combines best of both smith table and healer card-based layouts
 */

'use client'

import { ReactNode } from 'react'

export type ServiceTableMode = 'table' | 'cards'

interface ServiceTableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  render?: (item: any) => ReactNode
}

interface ServiceTableAction {
  label: string
  onClick: (item: any) => void
  variant?: 'primary' | 'secondary'
  disabled?: (item: any) => boolean
}

interface ServiceTableProps {
  items: any[]
  columns: ServiceTableColumn[]
  actions?: ServiceTableAction[]
  mode?: ServiceTableMode
  emptyMessage?: string
  rowIcon?: (item: any) => ReactNode
}

export function ServiceTable({
  items,
  columns,
  actions = [],
  mode = 'table',
  emptyMessage = 'Žádné položky k zobrazení',
  rowIcon,
}: ServiceTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded border border-[#8b6f47] bg-black/60 p-3">
        <p className="py-4 text-center text-xs text-[#8b7355] italic">{emptyMessage}</p>
      </div>
    )
  }

  // Table mode - for browsing/purchasing (smith style)
  if (mode === 'table') {
    return (
      <div className="relative flex max-h-full flex-col overflow-hidden rounded border border-[#8b6f47] bg-black/60">
        <div className="scrollbar-custom overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 z-10 bg-black/80">
              <tr className="border-b border-[#8b6f47]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-2 py-1.5 text-${col.align || 'left'} text-[#d4a574]`}
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {col.label}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th
                    className="px-2 py-1.5 text-right text-[#d4a574]"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    Akce
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-b border-[#8b6f47]/30 hover:bg-black/20">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-2 py-2 text-${col.align || 'left'}`}>
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-2 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {actions.map((action, actionIdx) => {
                          const isDisabled = action.disabled?.(item) ?? false
                          return (
                            <button
                              key={actionIdx}
                              onClick={() => !isDisabled && action.onClick(item)}
                              disabled={isDisabled}
                              className={`rounded border px-2 py-1 text-xs transition-colors ${
                                action.variant === 'secondary'
                                  ? 'border-[#8b6f47] bg-black/60 text-[#d4a574] hover:border-[#d4a574] hover:bg-black/80'
                                  : 'border-[#ffd700] bg-linear-to-r from-[#8b6f47] to-[#6d5a3e] text-white hover:from-[#a8865d] hover:to-[#a8865d]'
                              } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                              {action.label}
                            </button>
                          )
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Cards mode - for services with descriptions (healer style)
  if (mode === 'cards') {
    return (
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-3 transition-colors hover:bg-black/60"
          >
            <div className="flex items-center gap-3">
              {rowIcon && (
                <div className="rounded-full bg-linear-to-br from-[#ffd700]/20 to-[#8b6f47]/20 p-2">
                  {rowIcon(item)}
                </div>
              )}
              <div>
                {columns.map((col, colIdx) => (
                  <div key={col.key}>
                    {colIdx === 0 ? (
                      <div className="text-sm text-[#f5e6d3]">
                        {col.render ? col.render(item) : item[col.key]}
                      </div>
                    ) : (
                      <div className="text-[10px] text-[#8b7355]">
                        {col.render ? col.render(item) : item[col.key]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {actions.length > 0 && (
              <div className="flex items-center gap-2">
                {actions.map((action, actionIdx) => {
                  const isDisabled = action.disabled?.(item) ?? false
                  return (
                    <button
                      key={actionIdx}
                      onClick={() => !isDisabled && action.onClick(item)}
                      disabled={isDisabled}
                      className={`rounded border px-3 py-1.5 text-xs transition-colors ${
                        action.variant === 'secondary'
                          ? 'border-[#8b6f47] bg-black/60 text-[#d4a574] hover:border-[#d4a574] hover:bg-black/80'
                          : 'border-[#d4a574]/50 bg-[#8b6f47] text-white hover:border-[#ffd700] hover:bg-[#a8865d]'
                      } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      {action.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return null
}
