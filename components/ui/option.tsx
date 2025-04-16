import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Text } from '@/styles/typography'

interface Props extends Pick<React.ComponentProps<typeof RadioGroup>, 'id' | 'value' | 'onChange' | 'disabled'> {
  options: Record<number | string, string>
}

export function Option({ value, ...p }: Props) {
  return (
    <RadioGroup {...p} defaultValue={value}>
      {Object.entries(p.options).map(([id, label]) => {
        const optionKey = `Option_${id}_${label}`

        return (
          <div key={optionKey} className='flex items-center space-x-2'>
            <RadioGroupItem value={id} id={optionKey} />

            {/* @ts-ignore */}
            <Text as='label' htmlFor={optionKey}>
              {label}
            </Text>
          </div>
        )
      })}
    </RadioGroup>
  )
}
