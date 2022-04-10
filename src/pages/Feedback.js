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
    const { assertions, userScore } = this.props;
    console.log(assertions);

    return (
      <div>
        <Header />
        <section>
          <h1 data-testid="feedback-text">{this.validateAssertions(assertions)}</h1>
          <div>
            <h3 data-testid="feedback-total-question">{assertions}</h3>
          </div>
          <h3 data-testid="feedback-total-score">{userScore}</h3>
        </section>
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
  userScore: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  userScore: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
