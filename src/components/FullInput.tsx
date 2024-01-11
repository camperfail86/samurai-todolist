import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const btnStyle = {
    maxWidth: "40px",
    minWidth: "40px",
    maxHeight: "39px",
    minHeight: "39px",
    marginLeft: "5px",
    backgroundColor: "black",
};

export type FullInputType = {
    callback: (title: string) => Promise<unknown>;
    disabled?: boolean;
};
export const FullInput = memo((props: FullInputType) => {
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (title.trim() !== "") {
                setError(false);
                props.callback(title)
                    .then((res) => {
                        setTitle("");
                    })
                    .catch((e) => {
                    });
            } else {
                setError(true);
            }
        }
    };

    const onClickHandler = () => {
        if (title.trim() !== "") {
            setError(false);
            props.callback(title)
                .then(() => {
                    setTitle("");
                })
                .catch((e) => {
                });
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
