import React from 'react';
import { connect } from 'react-redux';
import { StoreStateType } from '../../../redux/store';
import { CardDataType, DBRecordType } from '../../../types/types';
import Card from './Card';
import { statsAPI } from '../../../api/api';

type PropsType = {
  serverURL: string;
  card: CardDataType;
  trainingMode: boolean;
  activeCard?: CardDataType;
  isPlaying: 'pending' | 'playing' | 'won' | 'lost';
  cardHandleClick: (card: CardDataType) => Promise<void>;
};

class CardContainer extends React.Component<PropsType> {
  async updateTrainedCount(): Promise<void> {
    const cardData = await statsAPI.getAnswer(this.props.card.word);
    const newData: DBRecordType = {
      ...cardData,
      trained: cardData.trained + 1,
    };
    await statsAPI.updateAnswer(newData);
  }

  render() {
    return (
      <div className="card__container">
        <Card
          serverURL={this.props.serverURL}
          card={this.props.card}
          trainingMode={this.props.trainingMode}
          activeCard={this.props.activeCard}
          isPlaying={this.props.isPlaying}
          cardHandleClick={this.props.cardHandleClick}
          updateTrainedCount={this.updateTrainedCount.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  serverURL: state.app.serverURL,
  trainingMode: state.app.trainingMode,
  activeCard: state.game.activeCard,
  isPlaying: state.game.isPlaying,
});

export default connect(mapStateToProps, {})(CardContainer);
