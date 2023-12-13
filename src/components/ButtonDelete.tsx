import React, { memo } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export type ButtonDeleteType = {
    callback: () => void;
    disabled?: boolean;
};

export const ButtonDelete = memo(({ callback, disabled }: ButtonDeleteType) => {
    return (
        <IconButton onClick={callback} aria-label="delete" size="small" disabled={disabled}>
            <DeleteIcon fontSize="small" />
        </IconButton>
    );
});
