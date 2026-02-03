'use client'

import { useState } from 'react'

import { Landmark, type LucideIcon } from 'lucide-react'

import { BANK_CONFIG } from '@/lib/game/constants/interactive'
import { useBankActions } from '@/lib/hooks/game'

import { Card } from '@/components/ui/card'
import { StatDisplay } from '@/components/ui/display'
import { Input } from '@/components/ui/input'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, Label, MutedText, Span } from '@/components/ui/typography'

import { LocationAction } from '../Shared/components/LocationAction'
import { LocationLayout } from '../Shared/components/LocationLayout'

interface BankActionsProps {
  gold: number
  balance: number
}

export function BankActions({ gold, balance }: BankActionsProps) {
  // 1. Hooks
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const { handleDeposit, handleWithdraw, isPending } = useBankActions({
    onSuccess: () => {
      setDepositAmount('')
      setWithdrawAmount('')
    },
  })

  // 2. Navigation State - None currently

  // 3. Handlers
  const onDeposit = () => handleDeposit(Number(depositAmount))
  const onWithdraw = () => handleWithdraw(Number(withdrawAmount))

  // 4. Sub-components (Render helpers)
  const BankOperationRow = ({
    title,
    amount,
    setAmount,
    maxAmount,
    onAction,
    actionConfig,
  }: {
    title: string
    amount: string
    setAmount: (val: string) => void
    maxAmount: number
    onAction: () => void
    actionConfig: { title: string; icon: LucideIcon }
  }) => (
    <VStack gap="xs">
      <Label color="muted">{title}</Label>
      <HStack gap="sm">
        <Input
          type="number"
          variant="subtle"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Množství..."
        />
        <LocationAction
          title={actionConfig.title}
          icon={actionConfig.icon}
          onClick={onAction}
          disabled={!amount || Number(amount) <= 0 || Number(amount) > maxAmount || isPending}
          loading={isPending}
        />
      </HStack>
    </VStack>
  )

  return (
    <LocationLayout
      title="Strážnice pokladů"
      description="Tvé zlato je u nás v bezpečí, poutníku. Žádné poplatky, čistá důvěra."
    >
      <VStack gap="md">
        <Card variant="muted" textured>
          <Card.Content>
            <VStack gap="xs">
              <MutedText uppercase letterSpacing="wider" size="xs">
                Zůstatek v bance
              </MutedText>
              <StatDisplay icon={Landmark} value={balance} label="zl" color="gold" />
            </VStack>
          </Card.Content>
        </Card>

        <VStack gap="md">
          <VStack gap="xs">
            <BankOperationRow
              title={BANK_CONFIG.depositTitle}
              amount={depositAmount}
              setAmount={setDepositAmount}
              maxAmount={gold}
              onAction={onDeposit}
              actionConfig={BANK_CONFIG.depositAction}
            />
            <HStack justify="end">
              <Caption color="muted">
                V měšci: <Span color="gold">{gold}g</Span>
              </Caption>
            </HStack>
          </VStack>

          <BankOperationRow
            title={BANK_CONFIG.withdrawTitle}
            amount={withdrawAmount}
            setAmount={setWithdrawAmount}
            maxAmount={balance}
            onAction={onWithdraw}
            actionConfig={BANK_CONFIG.withdrawAction}
          />
        </VStack>
      </VStack>
    </LocationLayout>
  )
}
