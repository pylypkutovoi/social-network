import React from 'react';
import styles from './forms-controls.module.css'

const FormControl = ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + " "+ (hasError ? styles.error : '')}>
      <div>
        {props.children}
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )   
}
        
// export const Textarea = (props) => {
//   return <FormControl {...props} element={"textarea"}/>
// }
export const Textarea = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><textarea {...input} {...restProps}></textarea></FormControl>
}
// export const Input = (props) => {
//   return <FormControl {...props} element={"input"}/>
// }
export const Input = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><input {...input} {...restProps}></input></FormControl>
}
