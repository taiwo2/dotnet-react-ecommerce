import React from "react";
import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    multiline?: boolean;
    rows?: number; 
    type?: string;
}

const AppTextInput = (props: Props) =>{
    const {fieldState, field} = useController({...props, defaultValue: ''})

    return (
        <TextField 
            {...props}
            {...field}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error && fieldState.error.message}
        />
    )
}
export default AppTextInput;