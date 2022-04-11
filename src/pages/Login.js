import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getToken, actionLogin, getQuestions } from '../redux/actions';
import { fetchToken, fetchApiGame } from '../service/api';
import './login.css';
import logo from '../assets/trivia.png';

class Login extends Component {
  state = {
    isDisabled: true,
    nameInput: '',
    emailInput: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => this.validateBtn(),
    );
  };

  validateBtn = () => {
    const { nameInput, emailInput } = this.state;
    const emailCheck = /^.*@.*\.com$/.test(emailInput);
    const nameCheck = nameInput.length >= 1;
    if (emailCheck && nameCheck) {
      this.setState({ isDisabled: false });
      return;
    }
    this.setState({ isDisabled: true });
  };

  handleDispatches = async () => {
    const { history } = this.props;
    const { nameInput, emailInput } = this.state;
    const { dispatchScore, setToken, dispatchQuestions } = this.props;

    const data = await fetchToken();
    const questionsData = await fetchApiGame(data.token);

    dispatchScore({
      userName: nameInput,
      userEmail: emailInput,
    });

    setToken(data.token);
    dispatchQuestions(questionsData);
    history.push('/game');
  }

  render() {
    const { isDisabled } = this.state;

    return (
      <div className="login_container">
        <img className="logo" src={ logo } alt="logo do jogo trivia" />
        <form className="login_form_container">
          <label className="label_input" htmlFor="input-player-name">
            Nome
            <input
              type="text"
              name="nameInput"
              onChange={ this.handleChange }
              data-testid="input-player-name"
              className="login_input"
              autoComplete="off"
            />
          </label>
          <label className="label_input" htmlFor="input-gravatar-email">
            E-mail
            <input
              type="text"
              name="emailInput"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              className="login_input"
              autoComplete="off"
            />
          </label>
          <button
            className="login_button"
            type="button"
            data-testid="btn-play"
            onClick={ this.handleDispatches }
            disabled={ isDisabled }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              className="settings_button"
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch(getToken(payload)),
  dispatchScore: (payload) => dispatch(actionLogin(payload)),
  dispatchQuestions: (payload) => dispatch(getQuestions(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
