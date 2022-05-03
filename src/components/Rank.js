import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Rank extends Component {
  render() {
    const { name, index, score, gravatar } = this.props;
    return (
      <div>
        <span>
          {index}
          <img src={ `https://www.gravatar.com/avatar/${gravatar}` } alt="gravatarImage" />
          { name }
          { score }
        </span>
      </div>
    );
  }
}

Rank.propTypes = {
  gravatar: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
