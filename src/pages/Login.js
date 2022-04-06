import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getToken } from '../redux/actions';
import fetchToken from '../service/api';

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

  callSetToken = async () => {
    const { setToken } = this.props;
    const data = await fetchToken();
    console.log(typeof data.token);
    setToken(data.token);
  }

  render() {
    const { isDisabled } = this.state;

    return (
      <form>
        <label htmlFor="input-player-name">
          Nome
          <input
            type="text"
            name="nameInput"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail
          <input
            type="text"
            name="emailInput"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.callSetToken }
            disabled={ isDisabled }
          >
            Play
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch(getToken(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
