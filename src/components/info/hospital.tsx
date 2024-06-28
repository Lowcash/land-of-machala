import React from 'react'
import { api } from '@/trpc/react'

import { Label } from '@radix-ui/react-label'
import { Button } from '../ui/button'
import { Hospital as ModelHospital } from '@prisma/client'
import { Alert, AlertDescription } from '../ui/alert'
import { SketchLogoIcon } from '@radix-ui/react-icons'

type Props = Partial<ModelHospital>

export function Hospital(p: Props) {
  const { player } = api.useUtils()
  const heal = api.hospital.heal.useMutation({
    onSuccess: () => {
      player.info.invalidate()
    }
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
      <Label>
        Uzdravení za <b>{p.price ?? 0}</b> zlaťáků{' '}
        <Button variant='destructive' onClick={handleHeal}>
          To chci!
        </Button>
      </Label>
      <br /> <br />
      {heal.data?.success !== undefined && (
        <Alert variant='default'>
          <SketchLogoIcon className='h-4 w-4' />
          <AlertDescription>
            {heal.data?.success
              ? 'Teď jsi jako rybička (vyléčen)'
              : 'Bude potřeba lepšího pojištění kamaráde..tady tě vyléčit nemůžeme (nedostatek peněz)'}{' '}
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
