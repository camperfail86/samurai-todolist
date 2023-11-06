import React, {memo} from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export type ButtonDeleteType = {
    callback:()=> void
}

export const ButtonDelete = memo(({callback}: ButtonDeleteType) => {
    return (
        <IconButton onClick={callback} aria-label="delete" size="small">
            <DeleteIcon fontSize="small" />
        </IconButton>
    );
});
