import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { img, playerName, score } = this.props;
    return (
      <div className="trivia-header">
        <div className="img-name-points-div">
          <div className="img-name-div">
            <img
              data-testid="header-profile-picture"
              src={ img }
              alt="Avatar"
            />
            <p>
              Jogador:
              <span data-testid="header-player-name">{ playerName }</span>
            </p>
          </div>
          <div className="points-div">
            <p>
              Pontos:
              <span data-testid="header-score">{ score }</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  img: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default Header;
