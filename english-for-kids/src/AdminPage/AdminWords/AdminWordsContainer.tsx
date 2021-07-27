import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { StoreStateType } from '../../redux/store';
import { CardDataType } from '../../types/types';
import AdminWords from './AdminWords';
import './adminWords.scss';
import { adminGetCards } from '../../redux/adminReducer';
import { adminAPI } from '../../api/api';

type PropsType = {
  category: string;
  cards: CardDataType[];
  serverURL: string;
  adminGetCards: () => Promise<void>;
};

class AdminWordsContainer extends React.Component<PropsType> {
  async createCard(card: CardDataType, image?: File, audio?: File): Promise<void> {
    await adminAPI.createCard(card);
    if (image) {
      await adminAPI.setCardImage(image, card.word);
    }
    if (audio) {
      await adminAPI.setCardAudio(audio, card.word);
    }
    this.props.adminGetCards();
  }

  async updateCard(word: string, card: CardDataType, image?: File, audio?: File): Promise<void> {
    await adminAPI.updateCard(card, word);
    if (image) {
      await adminAPI.setCardImage(image, card.word);
    }
    if (audio) {
      await adminAPI.setCardAudio(audio, card.word);
    }
    this.props.adminGetCards();
  }

  async removeCard(word: string) {
    await adminAPI.removeCard(word);
    this.props.adminGetCards();
  }

  render() {
    return (
      <div>
        {!this.props.category && <Redirect to="/" />}
        <AdminWords
          category={this.props.category}
          cards={this.props.cards.filter((card) => card.category === this.props.category)}
          serverURL={this.props.serverURL}
          createCard={this.createCard.bind(this)}
          removeCard={this.removeCard.bind(this)}
          updateCard={this.updateCard.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  serverURL: state.app.serverURL,
  category: state.adminPage.activeCategory,
  cards: state.adminPage.cards,
});

export default connect(mapStateToProps, { adminGetCards })(AdminWordsContainer);
