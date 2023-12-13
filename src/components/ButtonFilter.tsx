import Button from "@mui/material/Button";
import React, { memo, useCallback } from "react";

type ButtonPropsType = {
    name: string;
    callback: () => void;
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
    variant: "text" | "outlined" | "contained" | undefined;
};

export const ButtonFilter = memo(({ name, callback, color, variant }: ButtonPropsType) => {
    const onclickHandler = useCallback(() => {
        callback();
    }, [callback]);

    return (
        <Button onClick={onclickHandler} variant={variant} color={color}>
            {name}
        </Button>
    );
});
