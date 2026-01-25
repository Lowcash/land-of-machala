'use client'

import { getCharacterActivityLog } from '@/lib/actions/activity-log'
import type { Prisma } from '@prisma/client'
import { useEffect, useState } from 'react'

interface ActivityLogEntry {
  id: string
  timestamp: Date
  message: string
  type: string
  metadata: Prisma.JsonValue
}

export function useActivityLog(characterId: string, refreshInterval = 30000) {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const fetchLogs = async () => {
      try {
        const data = await getCharacterActivityLog(characterId)
        if (mounted) {
          setLogs(data as unknown as ActivityLogEntry[])
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching logs:', error)
      }
    }

    fetchLogs()

    const interval = setInterval(fetchLogs, refreshInterval)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [characterId, refreshInterval])

  return { logs, loading }
}
