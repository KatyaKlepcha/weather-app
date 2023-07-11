import s from './Select.module.css'

type SelectPropsType = {
    onChange: (lang: string) => void
    options: string[]
    lang: string
}

const Select = (props: SelectPropsType) => {

    const onItemClick = (event: any) => {
        const {value} = event.currentTarget
        props.onChange(value)
    }


    return (
        <>
            <select className={s.select} onChange={onItemClick}>
                {props.options.map((el, index)=> {
                    const selected = el === props.lang
                    return <option key={el[index]} selected={selected}>{el}</option>
                })}
            </select>
        </>

    );
};

export default Select;