import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import todolist from "./todolist/Todolist";

const inputStyle = {
    maxHeight: "25px",
    minHeight: "25px",
};

const btnStyle = {
    maxWidth: "40px",
    minWidth: "40px",
    maxHeight: "39px",
    minHeight: "39px",
    marginLeft: "5px",
    backgroundColor: "black",
};

export type FullInputType = {
    callback: (title: string) => void;
    disabled?: boolean;
};
export const FullInput = memo((props: FullInputType) => {
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (title.trim() !== "") {
                setError(false);
                props.callback(title);
                setTitle("");
            } else {
                setError(true);
            }
        }
    };

    const onClickHandler = () => {
        if (title.trim() !== "") {
            setError(false);
            props.callback(title);
            setTitle("");
        } else {
            setError(true);
        }
    };

    return (
        <div>
            <TextField
                id="outlined-basic"
                label={error ? "Введите текст" : "Писать тут"}
                variant="outlined"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                onKeyPress={onKeyPressHandler}
                error={error}
                helperText={error ? "Title is required" : ""}
                size="small"
                disabled={props.disabled}
            />
            <Button style={btnStyle} onClick={onClickHandler} variant="contained" disabled={props.disabled}>
                +
            </Button>
        </div>
    );
});
