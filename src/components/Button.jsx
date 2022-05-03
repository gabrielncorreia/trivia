import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { index, answerType, handleAnswer, isDisabled, element } = this.props;
    const cor = 'correct-answer';
    return (
      <button
        type="button"
        data-testid={ answerType === cor ? answerType : `${answerType}-${index}` }
        className={ answerType }
        onClick={ handleAnswer }
        disabled={ isDisabled }
      >
        {element}
      </button>
    );
  }
}

Button.propTypes = {
  index: PropTypes.number.isRequired,
  answerType: PropTypes.string.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  element: PropTypes.string.isRequired,
};
