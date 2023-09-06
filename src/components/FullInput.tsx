import React, { KeyboardEvent, useRef } from "react";

type FullInputType = {
  addTask:(title: string) => void
}
export const FullInput = (props: FullInputType) => {
  let onChangeRef = useRef<HTMLInputElement>(null)
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onChangeRef.current) {
        props.addTask(onChangeRef.current.value);
        onChangeRef.current.value = ''
      }
    }
  }

  const onClickHandler = () => {
    if (onChangeRef.current) {
      props.addTask(onChangeRef.current.value);
      onChangeRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        onKeyPress={onKeyPressHandler}
        ref={onChangeRef}
      />
      <button onClick={onClickHandler}>+</button>
    </div>
  )
}
