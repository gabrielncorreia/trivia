import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

export default class RankingButton extends Component {
  render() {
    return (
      <Link to="/ranking">
        <button data-testid="btn-ranking" type="button">
          <BiArrowBack />
          <span>Ver Ranking</span>
        </button>
      </Link>
    );
  }
}
