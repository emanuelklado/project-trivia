import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import './feedback.css';
import feedbackSVG from '../assets/feedbackSVG.svg';

class Feedback extends Component {
  componentDidMount() {
    this.setLocalStorage();
  }

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

  setLocalStorage = () => {
    const { userScore, userName, userEmail } = this.props;
    const getStorage = localStorage.getItem('ranking');
    const urlPicture = `https://www.gravatar.com/avatar/${md5(userEmail)}`;
    if (getStorage !== null) {
      const ranking = JSON.parse(getStorage);
      const newPlayer = { score: userScore, name: userName, picture: urlPicture };
      const newRanking = [...ranking, newPlayer];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    } else {
      const newPlayer = { score: userScore, name: userName, picture: urlPicture };
      const newRanking = [newPlayer];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  render() {
    const { assertions, userScore } = this.props;

    return (
      <>
        <Header />
        <div className="feedback_container">
          <section className="feedback_svg_item">
            <img src={ feedbackSVG } alt="imagem de feedback" />
          </section>
          <section className="feedback_card">
            <h1 data-testid="feedback-text">
              Nosso Feedback:
              {' '}
              {this.validateAssertions(assertions)}
            </h1>
            <h1 data-testid="feedback-total-question">
              Respostas Certas:
              {' '}
              {assertions}
            </h1>
            <h1 data-testid="feedback-total-score">
              Pontua????o Total:
              {' '}
              {userScore}
            </h1>
          </section>
          <button
            className="myButtonNext"
            data-testid="btn-play-again"
            type="button"
            onClick={ this.redirectToHome }
          >
            Play Again

          </button>
          <button
            className="myButtonNext"
            data-testid="btn-ranking"
            type="button"
            onClick={ this.redirectToRanking }
          >
            Ranking

          </button>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  userScore: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  userScore: state.player.score,
  userName: state.player.userName,
  userEmail: state.player.userName,
});

export default connect(mapStateToProps, null)(Feedback);
