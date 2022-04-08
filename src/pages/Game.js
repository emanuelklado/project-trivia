import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { fetchApiGame, fetchToken } from '../service/api';
import { getToken, actionLogin } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
  }

  // Esse component funcional pode ser feito em outro arquivo;
  answersShuffle = () => {
    const { questionIndex } = this.state;

    const randomChance = 0.75;

    const { sessionQuestions: { results } } = this.props;

    if (results !== undefined) {
      const { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } = results[questionIndex];

      const output = [...incorrectAnswers, correctAnswer];

      output.sort(() => Math.random() - randomChance);

      return (
        <div data-testid="answer-options">
          {output.map((option, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                option === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
            >
              { option }
            </button>
          ))}
        </div>
      );
    }
  }

  render() {
    const { questionIndex } = this.state;

    // Questions Index será usado para mudar ir para  proxima questão

    const { sessionQuestions: { results } } = this.props;

    return (
      <div>
        <Header />
        {results !== undefined && (
          <div>
            {console.log(results[questionIndex])}
            <p data-testid="question-category">
              { results[questionIndex].category }
            </p>
            <p data-testid="question-text">
              { results[questionIndex].question }
            </p>
          </div>
        )}
        {this.answersShuffle()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch(getToken(payload)),
  dispatchScore: (payload) => dispatch(actionLogin(payload)),
});

const mapStateToProps = (state) => ({
  userToken: state.token,
  sessionQuestions: state.questions,
});

Game.propTypes = {
  userToken: PropTypes.string,
  setToken: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
