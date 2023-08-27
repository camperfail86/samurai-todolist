import React, {ChangeEvent} from "react";

type textInputType = {
  getTextInput: (e: ChangeEvent<HTMLInputElement>) => void
  onClickInputHandler:() => void
  textNameInput: string
}

export const FullInput = (props: textInputType) => {
  return (
    <div>
      <input value={props.textNameInput} onChange={props.getTextInput}/>
      <button onClick={props.onClickInputHandler}>click</button>
    </div>
  )
}
