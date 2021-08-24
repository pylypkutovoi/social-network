import React from 'react';
import { WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import styles from './forms-controls.module.css'

const FormControl: React.FC<WrappedFieldProps> = ({meta, children}) => {
  const hasError = meta.touched && meta.error;
  
  return (
    <div className={styles.formControl + " "+ (hasError ? styles.error : '')}>
      <div>
        {children}
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )   
}
        
// export const Textarea = (props) => {
//   return <FormControl {...props} element={"textarea"}/>
// }
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><textarea {...input} {...restProps}></textarea></FormControl>
}
// export const Input = (props) => {
//   return <FormControl {...props} element={"input"}/>
// }
export const Input: React.FC<WrappedFieldProps >= (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><input {...input} {...restProps}></input></FormControl>
}
