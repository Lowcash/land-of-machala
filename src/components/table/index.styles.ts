import tw from 'twin.macro'
import styled from '@emotion/styled/macro'

export const Table = styled('table')`
  ${tw`w-full border-collapse`}

  th, td {
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
  }
`