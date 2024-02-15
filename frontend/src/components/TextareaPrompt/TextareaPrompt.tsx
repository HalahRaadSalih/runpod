import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import { Textarea } from "@mui/joy";


interface TextareaPromptProps {
    placeholder: string;
    name: string;
    label: string;
    required?: boolean;
    error? : boolean;
    minRows?: number;
}

export const TextareaPrompt = (props: TextareaPromptProps) => {
    const { placeholder, name, required = false, minRows, error , label} = props;
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <FormLabel>{label}</FormLabel>
                <Textarea
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    minRows={minRows || 2}
                    error={error}
                    sx={{
                        mb: 1 ,
                        '--Textarea-focusedInset': 'var(--any, )',
                        '--Textarea-focusedThickness': '0.25rem',
                        '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
                        '&::before': {
                        transition: 'box-shadow .15s ease-in-out',
                        },
                        '&:focus-within': {
                        borderColor: '#86b7fe',
                        },
                    }}
                />
            </FormControl>
        </Grid>

        );
};