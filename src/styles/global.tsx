export const GlobalStyle = `
  :root {
    --unit: 8px;
  }

  // Chrome/Safari scroll
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-corner {
    background: black;
  }

  ::-webkit-scrollbar-track {
    background: black;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(221, 223, 228, 0.4);
  }

  // Firefox scroll
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(221, 223, 228, 0.4) black;
  }

  // Fix autofill yellow background color
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 60px black inset !important;
    background-clip: content-box !important;
  }
`

export default GlobalStyle

// import { Global, css } from '@emotion/react'
// import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

// const red = theme`colors.red.500`
// const customStyles = css`
//   html {
//     height: 100%;
//     font-family: Inter, 'system-ui';
//   }

//   h1,
//   h2,
//   h3,
//   h4,
//   h5,
//   h6,
//   p,
//   span {
//     font-family: Inter, 'system-ui';
//   }

//   @supports (font-variation-settings: normal) {
//     html {
//       font-family: Inter, 'system-ui';
//     }
//   }

//   body {
//     height: 100%;
//     -webkit-tap-highlight-color: ${red};
//     font-family: Inter, 'system-ui';
//     ${tw`antialiased`}
//   }

//   #__next {
//     height: 100%;
//   }

//   [multiple],
//   [type='date'],
//   [type='datetime-local'],
//   [type='email'],
//   [type='tel'],
//   [type='text'],
//   [type='time'],
//   [type='url'],
//   [type='week'],
//   [type='month'],
//   [type='number'],
//   [type='password'],
//   [type='search'],
//   select,
//   textarea {
//     ${tw`appearance-none`}
//     ${tw`bg-white`}
//     ${tw`border-gray-600`}
//     ${tw`border-solid`}
//     ${tw`border`}
//     ${tw`p-2`}
//   }
// `

// const GlobalStyles = () => (
//   <>
//     <BaseStyles />
//     <Global styles={customStyles} />
//   </>
// )

// export default GlobalStyles
