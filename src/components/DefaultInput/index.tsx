import styles from './styles.module.css'

type DefaultInput = {
  id: string
  labelText?: string
} & React.ComponentProps<'input'>

export function DefaultInput({ id, type, labelText, ...rest }: DefaultInput) {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input className={styles.input} id={id} type={type} {...rest} />
    </>

  )
}