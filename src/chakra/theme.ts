// 1. Import `extendTheme`
import "@fontsource/mallanna"
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/700.css"
import { extendTheme } from "@chakra-ui/react"
import { Button } from "./button"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    lightYellow: "#fefefe",
    dark: "#20211f",
    brand: {
        100: "#d6dbff"
    }
  },
  fonts:{
    heading: `'Mallanna',  sans-serif`,
    body: `'Open Sans', sans-serif`
  },
  styles: {
    global: () => ({
        body: {
            bg: "lightYellow",
            color: "dark",
        },
        _dark: {
            bg: "dark",
            color: "lightYellow"
        }
    })
  },
  components: {
    Button
  }
})