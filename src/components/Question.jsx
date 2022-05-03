import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unescape } from 'underscore';
import Counter from './Counter';
import AnswerButtons from './AnswerButtons';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled: false,
      answers: [],
      isCounterRunning: true,
      counter: 0,
    };
    this.showResults = this.showResults.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.resetColor = this.resetColor.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
    this.disableCounter = this.disableCounter.bind(this);
    this.enableCounter = this.enableCounter.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.setCounter = this.setCounter.bind(this);
  }

  componentDidMount() {
    this.setAnswers();
    // this.hideNextBtn();
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (question !== prevProps.question) {
      this.setAnswers();
    }
  }

  setCounter(number) {
    this.setState({ counter: number });
  }

  setAnswers() {
    const { correctAnswer, incorrectAnswers } = this.props;
    const answers = [...incorrectAnswers, correctAnswer].some((el) => el === 'True') ? (
      ['True', 'False']
    ) : (
      this.shuffleArray([...incorrectAnswers, correctAnswer])
    );
    this.setState((prevState) => ({
      ...prevState,
      answers,
    }));
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  disableButton() {
    this.setState({
      isButtonDisabled: true,
    });
  }

  enableButton() {
    this.setState({
      isButtonDisabled: false,
    });
  }

  disableCounter() {
    this.setState((prevState) => ({
      ...prevState,
      isCounterRunning: false,
    }));
  }

  enableCounter() {
    this.setState((prevState) => ({
      ...prevState,
      isCounterRunning: true,
    }));
  }

  showResults() {
    const { isCounterRunning } = this.state;
    const wrongAnswers = document.querySelectorAll('.wrong-answer');
    const correctAnswer = document.querySelector('.correct-answer');
    correctAnswer.style.border = ('3px solid rgb(6, 240, 15)');
    for (let i = 0; i < wrongAnswers.length; i += 1) {
      wrongAnswers[i].style.border = ('3px solid rgb(255, 0, 0)');
    }
    this.disableButton();
    this.showButton();
    if (isCounterRunning) this.disableCounter();
  }

  showButton() {
    document.getElementById('next').style.display = 'block';
  }

  hideButton() {
    document.getElementById('next').style.display = 'none';
  }

  nextButton() {
    const { nextQuestion } = this.props;
    this.hideButton();
    this.resetColor();
    nextQuestion();
    this.setAnswers();
    this.enableButton();
    this.enableCounter();
  }

  resetColor() {
    const wrongAnswers = document.querySelectorAll('.wrong-answer');
    const correctAnswer = document.querySelector('.correct-answer');

    correctAnswer.style.border = ('1px solid grey');
    for (let i = 0; i < wrongAnswers.length; i += 1) {
      wrongAnswers[i].style.border = ('1px solid grey');
    }
  }

  render() {
    const { answers, isCounterRunning, isButtonDisabled } = this.state;
    const { question, correctAnswer, category, difficulty } = this.props;
    return (
      <main className="question-all-div">
        <p
          className="category-div"
          data-testid="question-category"
        >
          {`Categoria: ${category}`}
        </p>
        <div className="question-answers-div">
          <h3
            className="question-div"
            data-testid="question-text"
          >
            {unescape(question)}
          </h3>
          <AnswerButtons
            answers={ answers }
            correctAnswer={ correctAnswer }
            disabled={ isButtonDisabled }
            showResults={ this.showResults }
            difficulty={ difficulty }
          />
          <button
            type="button"
            onClick={ this.nextButton }
            data-testid="btn-next"
            style={ { display: 'none' } }
            id="next"
          >
            Próxima
          </button>
        </div>
        <Counter
          showResults={ this.showResults }
          isRunning={ isCounterRunning }
        />
      </main>
    );
  }
}

Question.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentTimer: state.userScoreReducer.timer,
});

export default connect(mapStateToProps)(Question);
