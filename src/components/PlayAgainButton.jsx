import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

export default class PlayAgainButton extends Component {
  render() {
    return (
      <Link to="/">
        <button data-testid="btn-play-again" type="button">
          <BiArrowBack />
          <span>Jogar novamente</span>
        </button>
      </Link>
    );
  }
}
