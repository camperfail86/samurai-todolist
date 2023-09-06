type ButtonPropsType = {
  name: string
  callback:() => void
}

export const Button = (props: ButtonPropsType) => {

  const onclickHandler = () => {
    props.callback()
  }

  return (
    <button className={'active'} onClick={onclickHandler}>{props.name}</button>
  )
}