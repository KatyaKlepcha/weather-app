import {useState} from "react";
import s from './Select.module.css'

type SelectPropsType = {
    onChange: (value: any) => void
}

const Select = (props: SelectPropsType) => {
    const [active, setActive] = useState(false)

    const onItemClick = (value: any) => {
        props.onChange(value)
    }


    return (
        <>
            <select className={s.select}>
                <option value="1" selected>EN</option>
                <option value="2">UA</option>
                <option value="3">RUS</option>
            </select>
        </>

    );
};

export default Select;