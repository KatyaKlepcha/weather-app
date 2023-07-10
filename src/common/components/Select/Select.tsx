import {useState} from "react";
import s from './Select.module.css'

type SelectPropsType = {
    onChange: (value: any) => void
    options: any
}

const Select = (props: SelectPropsType) => {
    const [active, setActive] = useState(false)

    const onItemClick = (value: any) => {
        props.onChange(value)
    }


    return (
        <>
            <select className={s.select}>
                <option value="1" selected>{props.options}</option>
                <option value="2">{props.options}</option>
                <option value="3">{props.options}</option>
            </select>
        </>

    );
};

export default Select;