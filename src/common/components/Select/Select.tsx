import s from './Select.module.css'
import { ChangeEvent } from 'react'

type SelectPropsType = {
  onChange: (lang: string) => void
  options: string[]
  lang: string
}

const Select = (props: SelectPropsType) => {
  const onItemClick = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget
    props.onChange(value)
  }

  return (
    <>
      <select value={props.lang} className={s.select} onChange={onItemClick}>
        {props.options.map((el, index) => {
          return (
            <option key={el[index]} selected={el === props.lang}>
              {el}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default Select
