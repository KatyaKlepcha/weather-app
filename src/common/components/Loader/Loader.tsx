import React from 'react'
import loader from '../../../assets/images/loader.gif'
import s from './Loader.module.css'

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <img src={loader} alt={'Loader'} className={s.loader} />
    </div>
  )
}

export default Loader
