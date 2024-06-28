import React from 'react'
import { api } from '@/trpc/react'

import { Label } from '@radix-ui/react-label'
import { Button } from '../ui/button'
import { Alert } from '../alert'
import { Hospital as ModelHospital } from '@prisma/client'

type Props = Partial<ModelHospital>

export function Hospital(p: Props) {
  const { player } = api.useUtils()
  const heal = api.hospital.heal.useMutation({
    onSuccess: () => {
      player.info.invalidate()
    },
  })

  const handleHeal = React.useCallback(() => {
    if (!p.id) return

    heal.mutate({ hospitalId: p.id })
  }, [heal, p.id])

  return (
    <>
      Nacházíš se v <b>{p.name}</b>
      <br />
      <Label>{p.description}</Label>
      <br />
      <br />
      <Label>{p.subdescription}</Label>
      <br />
      <br />
      {heal.data?.success === undefined && (
        <Label>
          Uzdravení za <b>{p.price ?? 0}</b> zlaťáků{' '}
          <Button variant='destructive' onClick={handleHeal}>
            To chci!
          </Button>
        </Label>
      )}
      {heal.data?.success !== undefined && (
        <Alert>
          {heal.data?.success
            ? 'Teď jsi jako rybička (vyléčen)'
            : 'Bude potřeba lepšího pojištění kamaráde..tady tě vyléčit nemůžeme (nedostatek peněz)'}
        </Alert>
      )}
    </>
  )
}
