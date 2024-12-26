import { ControllerRenderProps } from 'react-hook-form'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Text } from '@/styles/typography'

type Props = {
  options: string[]
} & Pick<ControllerRenderProps, 'disabled' | 'onChange' | 'value'>

export default function Option(p: Props) {
  return (
    <div>
      <RadioGroup defaultValue={p.value} onValueChange={p.onChange}>
        {p.options.map((x, idx) => (
          <div key={`Option_${idx}`} className='flex items-center space-x-2'>
            <RadioGroupItem value={x} id={x} />
            {/* @ts-ignore */}
            <Text as='label' htmlFor={x.toString()}>
              {x}
            </Text>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
