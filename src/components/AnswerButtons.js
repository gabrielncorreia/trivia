import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';

class AnswerButtons extends Component {
  checkAnswer(event) {
    const { showResults } = this.props;
    // console.log(event.target);
    const { className } = event.target;
    console.log(className);
    const n = 10;
    if (className === 'correct-answer') {
      const pontuacao = JSON.parse(localStorage.getItem('state')).player;
      const assertions = pontuacao.assertions + 1;
      let scoreUpdate = Number(pontuacao.score);
      const { difficulty, currentTimer } = this.props;
      scoreUpdate += n + (currentTimer * this.checkDif(difficulty));
      const player = { ...pontuacao, score: scoreUpdate, assertions };
      localStorage
        .setItem('state', JSON.stringify({ player }));
    }
    showResults();
  }

  checkDif(dif) {
    const magic3 = 3;
    if (dif === 'hard') {
      return magic3;
    }
    if (dif === 'medium') {
      return 2;
    }
    return 1;
  }

  render() {
    const { answers, disabled, correctAnswer } = this.props;
    return (
      <div className="answers-div">
        {answers.map((el, index) => {
          const answer = el === correctAnswer ? (
            <Button
              key={ index }
              index={ index }
              answerType="correct-answer"
              handleAnswer={ (e) => this.checkAnswer(e) }
              isDisabled={ disabled }
              element={ el }
            />
          ) : (
            <Button
              key={ index }
              index={ index }
              answerType="wrong-answer"
              handleAnswer={ (e) => this.checkAnswer(e) }
              isDisabled={ disabled }
              element={ el }
            />
          );
          return answer;
        })}
      </div>
    );
  }
}

AnswerButtons.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  showResults: PropTypes.func.isRequired,
  currentTimer: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentTimer: state.userScoreReducer.timer,
});

export default connect(mapStateToProps)(AnswerButtons);
