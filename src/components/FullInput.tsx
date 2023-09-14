import React, { KeyboardEvent, useRef } from "react";

type FullInputType = {
  addTask:(title: string) => void
  error: boolean
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
        className={props.error ? 'error' : ''}
      />
      <button onClick={onClickHandler}>+</button>
      {props.error && <div className={'error-message'}>Title is required</div>}
    </div>
  )
}
