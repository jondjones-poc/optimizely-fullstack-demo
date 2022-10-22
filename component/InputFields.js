import styles from '../styles/inputfield.module.css';
import React, { useEffect, useState } from 'react'

const InputFields = ({placeholder, componentId, display, defaultValue}) => {

const [displayField, setDisplayField] = useState(false)

useEffect(() => {
    setDisplayField(display)
    }, [display])

  return (
    <div className={displayField ? styles.formInput : styles.hidden} >
        <input
            type="text"
            id={componentId}
            className={styles.textBox}
            placeholder={placeholder}
            defaultValue={defaultValue}
        />
    </div>
    );
}

export default InputFields;