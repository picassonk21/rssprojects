import React from 'react';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';
import { CategoryEditorBodyType } from '../../../../types/types';
import '../adminCategory.scss';
import { Input } from '../../../../components/utils/formControls/FormControls';
import { required } from '../../../../components/utils/validators/validators';

type PropsType = {
  setEditMode: (value: React.SetStateAction<boolean>) => void;
};

const AdminCategoryEditor: React.FC<PropsType & InjectedFormProps<CategoryEditorBodyType, PropsType>> = ({ setEditMode, handleSubmit }) => (
  <form className="admin__category-editor" onSubmit={handleSubmit}>
    <div className="admin__category-editor__input">
      <label className="admin__category-editor__title">Category Name: </label>
      <Field component={Input} name="name" type="text" validate={[required]} />
    </div>
    <div className="admin__category-buttons">
      <button className="admin__category-cancel-btn"
        onClick={() => setEditMode(false)}>Cancel</button>
      <button className="admin__category-confirm-btn">update</button>
    </div>
  </form>
);

export default reduxForm<CategoryEditorBodyType, PropsType>({ form: 'categoryEditor' })(AdminCategoryEditor);
