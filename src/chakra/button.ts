import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: "0px",
        border: "1px solid ",
        borderColor: "brand.100"

    },
    variants: {
        light: {
            bg: "dark",
            color: "lightYellow",
            _hover:{
                bg: "gray.700",
                border: "1px solid",
                borderColor: "gray.50"
            }
        },
        homeL: {
            size: "lg",
            height: "3.5rem",
            fontSize: "1.2rem",
            bg: "dark",
            color: "lightYellow",
            _hover:{
                bg: "gray.700",
                border: "1px solid",
                borderColor: "gray.50"
            }
        },

    },
    sizes: {
        sm: {
            fontSize: "6px"
        },
        md:{
            fontsize: "20pt"
        },
        lg:{
            height: "3.5rem",
            fontSize: "1.2rem",
        }
    }
}