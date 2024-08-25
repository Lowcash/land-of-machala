import tw from 'tailwind-styled-components'

export const Table = tw.table`
  w-full border-collapse border

  [&_td, &_th]:border 
  [&_td, &_th]:border-gray-300 
  [&_td, &_th]:p-2 
`