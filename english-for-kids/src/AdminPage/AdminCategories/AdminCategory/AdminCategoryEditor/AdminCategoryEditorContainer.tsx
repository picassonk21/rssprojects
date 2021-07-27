import React from 'react';
import { connect } from 'react-redux';
import { adminAPI } from '../../../../api/api';
import { CategoryEditorBodyType } from '../../../../types/types';
import AdminCategoryEditor from './AdminCategoryEditor';
import { getCategoriesNames } from '../../../../redux/appReducer';
import { adminGetCards } from '../../../../redux/adminReducer';

type PropsType = {
  category: string;
  setEditMode: (value: React.SetStateAction<boolean>) => void;
  getCategoriesNames: () => Promise<void>;
  adminGetCards: () => Promise<void>;
};

class AdminCategoryEditorContainer extends React.Component<PropsType> {
  async onSubmit(body: CategoryEditorBodyType) {
    await adminAPI.updateCategoryName(this.props.category, body.name);
    await this.props.getCategoriesNames();
    await this.props.adminGetCards();
    this.props.setEditMode(false);
  }

  render() {
    return (
      <>
        <AdminCategoryEditor setEditMode={this.props.setEditMode} onSubmit={this.onSubmit.bind(this)} />
      </>
    );
  }
}

export default connect(null, { getCategoriesNames, adminGetCards })(AdminCategoryEditorContainer);
