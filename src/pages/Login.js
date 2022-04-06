import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    isDisabled: true,
    nameInput: '',
    emailInput: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validateBtn());
  }

  validateBtn = () => {
    const { nameInput, emailInput } = this.state;
    const emailCheck = /^.*@.*\.com$/.test(emailInput);
    const nameCheck = nameInput.length >= 1;
    if (emailCheck && nameCheck) {
      this.setState({ isDisabled: false });
      return;
    }
    this.setState({ isDisabled: true });
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
            // value={ value }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail
          <input
            type="text"
            name="emailInput"
            // value={ value }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <Link to="/game">
          <button type="button" data-testid="btn-play" disabled={ isDisabled }>
            Play
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
