import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      imagemGravatar: '',
      name: '',
      idQuestion: 0,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.addQuestionsToState = this.handleEmail.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.handleEmail();
  }

  handleEmail() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const email = md5(player.gravatarEmail).toString();
    const { name } = player;
    this.setState({
      imagemGravatar: `https://www.gravatar.com/avatar/${email}`,
      name,
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      idQuestion: prevState.idQuestion + 1,
    }));
  }

  render() {
    const { questions } = this.props;
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    const { imagemGravatar, name, idQuestion } = this.state;
    const currentQuestion = questions[idQuestion];
    if (questions.length === 0) return <Redirect to="/" />;
    if (currentQuestion === undefined) {
      const { player } = JSON.parse(localStorage.getItem('state'));
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const d = ranking ? (
        localStorage.setItem('ranking', JSON.stringify([...ranking, player]))
      ) : localStorage.setItem('ranking', JSON.stringify([player]));
      console.log(d);
      return <Redirect to="/feedback" />;
    }
    const {
      question,
      correct_answer: correctAnswers,
      incorrect_answers: incorrectAnswers,
      category,
      difficulty,
    } = currentQuestion;
    // console.log(currentQuestion);
    return (
      <main>
        <Header img={ imagemGravatar } playerName={ name } score={ score } />
        <Question
          question={ question }
          correctAnswer={ correctAnswers }
          incorrectAnswers={ incorrectAnswers }
          category={ category }
          difficulty={ difficulty }
          nextQuestion={ () => this.nextQuestion() }
        />
        <div
          className="next-button-div"
        >
          {/* <button
            type="button"
            onClick={ this.nextQuestion }
            data-testid="btn-next"
            display={ buttonDisplay }
          >
            Próxima
          </button> */}
        </div>
      </main>
    );
  }
}

Trivia.propTypes = {
  // score: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any),
};

Trivia.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  // score: state.userScoreReducer.score,
  questions: state.questionsReducer.triviaQuestions,
});

export default connect(mapStateToProps)(Trivia);
