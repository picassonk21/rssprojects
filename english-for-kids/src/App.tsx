import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { NavLink, Redirect, Route } from 'react-router-dom';
import {
  initializeApp,
  InitializeAppActionType,
  getCategoriesNames,
  toggleAppMode,
  ToggleAppModeType,
  toggleSidebarIsOpened,
  ToggleSidebarIsOpenedType,
  toggleNeedToRedirect,
  ToggleNeedToRedirectType,
} from './redux/appReducer';
import { StoreStateType } from './redux/store';
import GameBoardContainer from './components/Game/GameContainer';
import GameStatsContainer from './components/gameStats/GameStatsContainer';
import MainPageContainer from './components/mainPage/MainPageContainer';
import {
  resetGameProcess, ResetGameProcessType, getCards, SetCardsType, setCards,
} from './redux/gameReducer';
import { CardDataType } from './types/types';
import rssLogo from './assets/rss.png';
import SidebarContainer from './components/sidebar/SidebarContainer';
import LoginContainer from './components/Login/LoginContainer';
import AdminPageContainer from './AdminPage/AdminPageContainer';

type PropsType = {
  trainingMode: boolean;
  category: string;
  initialized: boolean;
  cards: CardDataType[];
  sidebarIsOpened: boolean;
  isAuthorised: boolean;
  needToRedirect: boolean;
  initializeApp: (initialized: boolean) => InitializeAppActionType;
  getCategoriesNames: () => Promise<void>;
  toggleAppMode: () => ToggleAppModeType;
  resetGameProcess: () => ResetGameProcessType;
  getCards: (categoryName: string) => Promise<CardDataType[]>;
  setCards: (cards: CardDataType[]) => SetCardsType;
  toggleSidebarIsOpened: () => ToggleSidebarIsOpenedType;
  toggleNeedToRedirect: (needToRedirect: boolean) => ToggleNeedToRedirectType;
};

class App extends React.Component<PropsType> {
  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.isAuthorised !== this.props.isAuthorised) {
      this.props.toggleNeedToRedirect(true);
    } else {
      this.props.toggleNeedToRedirect(false);
    }
  }

  async componentDidMount() {
    await this.props.getCategoriesNames();
    this.props.initializeApp(true);
  }

  render() {
    return (
      <>
        {this.props.needToRedirect && <Redirect to="/" />}
        {this.props.isAuthorised && <AdminPageContainer />}
        {!this.props.isAuthorised && <div className="app">
          <div className="container">
            <header className="header">
              <div
                className={`sidebar-btn ${this.props.sidebarIsOpened ? ' open' : ''} ${this.props.trainingMode ? '' : 'play-mode'}`}
                onClick={() => {
                  this.props.toggleSidebarIsOpened();
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <button
                className={`switch__mode-btn ${this.props.trainingMode ? '' : 'play-mode'}`}
                onClick={() => {
                  this.props.toggleAppMode();
                  this.props.resetGameProcess();
                  if (this.props.category !== 'training' && this.props.category) {
                    this.props.getCards(this.props.category);
                  } else {
                    const cards = this.props.cards.map((card) => ({ ...card, guessed: false }));
                    this.props.setCards(cards);
                  }
                }}
              >
                <span></span>
              </button>
            </header>
            <LoginContainer />
            <SidebarContainer />
            <Route exact path={'/'} render={() => <MainPageContainer />} />
            <Route path="/game" render={() => <GameBoardContainer />} />
            <Route path="/stats" render={() => <GameStatsContainer />} />
          </div>
          <footer className="footer">
            <h4 className="footer__title">English for kids, 2021</h4>
            <div className="footer__links">
              <a href="https://github.com/picassonk21">github</a>
              <span><a href="https://rs.school/js/"><img src={rssLogo} alt="" /></a></span>
            </div>
            <NavLink to="./stats" className="footer__link">
              Game Stats
            </NavLink>
          </footer>
        </div>}
      </>
    );
  }
}

const mapStateToProps = (state: StoreStateType) => ({
  trainingMode: state.app.trainingMode,
  needToRedirect: state.app.needToRedirect,
  initialized: state.app.initialized,
  category: state.game.activeCategory,
  cards: state.game.cards,
  sidebarIsOpened: state.app.sidebarIsOpened,
  isAuthorised: state.auth.isAuthorised,
});

export default connect(mapStateToProps, {
  initializeApp,
  getCategoriesNames,
  toggleAppMode,
  resetGameProcess,
  getCards,
  setCards,
  toggleSidebarIsOpened,
  toggleNeedToRedirect,
})(App);
