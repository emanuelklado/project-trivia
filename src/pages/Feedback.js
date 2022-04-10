import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Feedback extends Component {
  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.redirectToHome }
        >
          Play Again

        </button>
      </div>

    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape.isRequired,
};
