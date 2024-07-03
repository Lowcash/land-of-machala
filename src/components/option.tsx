import { Text } from '@/styles/text'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
  options: string[]
} & Pick<ControllerRenderProps, 'disabled' | 'onChange' | 'value'>

export function Option(p: Props) {
  return (
    <div>
      <RadioGroup defaultValue={p.value} onValueChange={p.onChange}>
        {p.options.map((x, idx) => (
          <div key={`Option_${idx}`} className='flex items-center space-x-2'>
            <RadioGroupItem value={x} id={x} />
            <Text htmlFor={x.toString()}>{x}</Text>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
