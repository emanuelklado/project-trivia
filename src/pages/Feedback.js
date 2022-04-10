import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  validateAssertions = (assetions) => {
    const minHits = 3;
    if (assetions < minHits) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    const { assertions } = this.props;
    console.log(assertions);

    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{this.validateAssertions(assertions)}</h2>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.redirectToHome }
        >
          Play Again

        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.redirectToRanking }
        >
          Ranking

        </button>
      </div>

    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(Feedback);
