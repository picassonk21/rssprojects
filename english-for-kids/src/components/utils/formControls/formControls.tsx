import React, { FormEventHandler } from 'react';
import { WrappedFieldProps } from 'redux-form';
import s from './formControls.module.scss';

type PropsType = {
  type: string;
};

export const Input: React.ComponentType<PropsType & WrappedFieldProps> = ({
  input, type, meta, ...props
}) => (
  <div className={s.input}>
    {meta.touched && meta.error && <div className={s.inputError}>{meta.error}</div>}
    <input {...input} {...props} placeholder={input.name} type={type} className={`${(meta.touched && meta.error) ? s.error : ''}`} />
  </div>
);
