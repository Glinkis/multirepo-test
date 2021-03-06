import React from 'react'
import { createGlobalStyle, ThemeProvider } from '../utils/styled'
import themeA from '../themes/theme-a'
import themeB from '../themes/theme-b'

const GlobalStyle = React.memo(
  createGlobalStyle`
    body {
      font-family: sans-serif;
      background-color: rgb(41, 45, 62);
    }

    * {
      margin: 0;
      padding: 0;
    }
  `,
)

const useThemeTransition = () => {
  const [theme, setTheme] = React.useState(themeA)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTheme(theme === themeB ? themeA : themeB)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [theme, setTheme])

  return theme
}

interface Props {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const theme = useThemeTransition()

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  )
}

export default Layout
