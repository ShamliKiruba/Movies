import { createTheme } from "@mui/material";

export const theme = createTheme({
    components:{
        MuiGrid: {
            variants: [
                {
                    props: { variant: "header" },
                    style: {
                        backgroundColor: "#f7f8fa",
                        padding: '1em'
                    }
                },
            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: "title" },
                    style: {
                        fontWeight: '600',
                        fontSize: '3em'
                    }
                },
            ],
        },
    },
});