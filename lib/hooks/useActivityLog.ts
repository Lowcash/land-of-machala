'use client'

import { getCharacterActivityLog } from '@/lib/actions/activity-log'
import { useEffect, useState } from 'react'

export function useActivityLog(characterId: string, refreshInterval = 30000) {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const fetchLogs = async () => {
      try {
        const data = await getCharacterActivityLog(characterId)
        if (mounted) {
          setLogs(data)
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
