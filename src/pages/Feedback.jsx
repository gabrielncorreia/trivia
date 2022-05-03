import React, { Component } from 'react';
import PlayAgainButton from '../components/PlayAgainButton';
import Header from '../components/Header';
import RankingButton from '../components/RankingButton';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage(assertions) {
    const minValue = 3;
    if (assertions < minValue) return 'Podia ser melhor...';
    if (assertions >= minValue) return 'Mandou bem!';
  }

  render() {
    const { player: { name, gravatarEmail, assertions, score } } = JSON.parse(localStorage
      .getItem('state'));
    const gravatar = `https://www.gravatar.com/avatar/${gravatarEmail}`;
    return (
      <main className="main-feedback-div">
        <Header img={ gravatar } playerName={ name } score={ score } />
        <div className="feedback-div">
          <header className="feedback-header">
            <PlayAgainButton />
            <RankingButton />
            <h4 data-testid="header-player-name">{ name }</h4>
            <img
              src={ gravatar }
              alt="user avatar"
              data-testid="header-profile-picture"
            />
          </header>
          <div className="login-title">
            <span>Pontuação total</span>
            <h2 data-testid="feedback-total-score">{ score }</h2>
          </div>
          <div className="login-title">
            <span>Questões corretas</span>
            <h2 data-testid="feedback-total-question">{ assertions }</h2>
          </div>
          <div data-testid="feedback-text">
            <h3>{ this.feedbackMessage(assertions) }</h3>
          </div>
        </div>
      </main>
    );
  }
}
