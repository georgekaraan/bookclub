import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: "50px",
        border: "2px solid lightYellow"
    },
    variants: {
        light: {
            bg: "dark",
            color: "lightYellow",
            _hover:{
                bg: "gray.700",
                border: "2px solid",
                borderColor: "gray.50"
            }
        }
    },
    sizes: {
        sm: {
            fontSize: "6px"
        },
        md:{
            fontsize: "20pt"
        }
    }
}