export const GlobalStyle = `
  :root {
    --unit: 8px;
  }

  html,
  body {
    height: var(--app-height);

    width: 100vw;
    height: 100vh;
  }

  html {
    font-size: calc(2*var(--unit));
  }

  body {
    display: flex;
    flex-direction: column;

    height: var(--app-height);
    
    letter-spacing: unset !important;
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
