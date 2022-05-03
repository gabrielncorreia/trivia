import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import actions from '../redux/actions/index';

class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfQuestions: 5,
    };
  }

  componentDidMount() {
    const { dispatchQuestions } = this.props;
    const { numberOfQuestions } = this.state;

    dispatchQuestions(numberOfQuestions);
  }

  render() {
    return (
      <main className="main-config-div">
        <div className="configs-div">
          <div className="voltar-div">
            <Link to="/">
              <BiArrowBack />
              <span>Voltar</span>
            </Link>
          </div>
          <div className="login-title">
            <h2 data-testid="settings-title">Configurações</h2>
          </div>
          <div className="form-div">
            <select name="" id="">
              <option value="" hidden>Número de Questões</option>
              <option value="">5</option>
              <option value="">10</option>
              <option value="">15</option>
            </select>
            <select name="" id="">
              <option value="" hidden>Categoria</option>
              <option value="">Video-Game</option>
              <option value="">Programação</option>
            </select>
            <select name="" id="">
              <option value="" hidden>Dificuldade</option>
              <option value="">Fácil</option>
              <option value="">Intermediário</option>
              <option value="">Difícil</option>
            </select>
            {/* Futuramente podemos salvar toda a configuração quando a pessoa
             clicar neste botão */}
            <button
              type="button"
              data-testid="btn-play"
            >
              Salvar
            </button>
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (numOfQuestions) => dispatch(
    actions.addNumberOfQuestions(numOfQuestions),
  ),
});

export default connect(null, mapDispatchToProps)(Config);

Config.propTypes = {
  dispatchQuestions: PropTypes.func.isRequired,
};
