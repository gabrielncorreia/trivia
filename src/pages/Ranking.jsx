import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rank from '../components/Rank';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        {ranking.map((el, index) => (<Rank
          key={ `k${index}` }
          nome={ el.name }
          gravatar={ el.gravatarEmail }
          score={ el.score }
          index={ index }
        />
        ))}
        <Link to="/">
          <button data-testid="btn-go-home" type="button">
            Inicio
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
