import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { fetchApiGame, fetchToken } from '../service/api';
import { getToken, sendScore, sendAssertion } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0, // Indice da pergunta atual
      options: [], // Opções da pergunta atual
      correct: '', // Resposta correta
      answered: false, // Se foi respondida a pergunta
      time: 30, // Contador para a resposta
    };
  }

  componentDidMount() {
    this.answersShuffle(0);
  }

  timer = () => {
    const COUNTDOWN = 1000;
    const TIMEOUT = 30;
    let counter = TIMEOUT;
    let intervalID = null;
    const countdown = () => {
      const { answered } = this.state;
      if (counter !== 0 && !answered) {
        counter -= 1;
      } else {
        clearInterval(intervalID);
        this.setState({ answered: true });
      }
      this.setState({ time: counter });
    };
    intervalID = setInterval(countdown, COUNTDOWN);
  }

  answersShuffle = (questionIndex) => {
    console.log(questionIndex);

    const randomChance = 0.5;

    const { sessionQuestions: { results } } = this.props;

    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[questionIndex];

    const output = [...incorrectAnswers, correctAnswer];

    const expect = output.sort(() => Math.random() - randomChance);

    this.setState({ options: expect, correct: correctAnswer });
    this.timer();
  }

  score = ({ target }) => {
    console.log(target.textContent);
    const base = 10;
    const { questionIndex, time } = this.state;
    const {
      sessionQuestions: { results },
      dispatchScore,
      dispatchAssertion,
    } = this.props;

    const { correct_answer: correctAnswer } = results[questionIndex];
    if (target.textContent === correctAnswer) {
      const questionTypeScore = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      const { difficulty } = results[questionIndex];
      const total = base + (time * questionTypeScore[difficulty]);
      console.log(total);
      dispatchScore(total);
      dispatchAssertion();

      // Falta descobrir pra que a chave assertions serve.
    }
  }

  changeColor = (option) => {
    const { answered, correct } = this.state;
    if (answered) {
      return (
        option === correct && answered
          ? { border: '3px solid rgb(6, 240, 15)' }
          : { border: '3px solid rgb(255, 0, 0)' }
      );
    }
  }

  render() {
    const { options, correct, answered, time } = this.state;
    console.log(answered);

    let { questionIndex } = this.state;

    const { sessionQuestions: { results }, history } = this.props;

    const MAX_QUESTIONS = 5; // Usado na linha 137 para o if

    // Linha 130 mostra o tempo na tela.

    /* IMPORTANTE: as vezes o requisito das opções aleatórias não passa,
        Deve ser devido a chance de mudar na linha 45 */

    return (
      <div>
        <Header />
        {results !== undefined && (
          <div>
            <p data-testid="question-category">
              { results[questionIndex].category }
            </p>
            <p data-testid="question-text">
              { results[questionIndex].question }
            </p>
          </div>
        )}
        <div data-testid="answer-options">
          {options.map((option, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                option === correct
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
              style={
                this.changeColor(option)
              }
              onClick={ (event) => {
                this.setState(
                  {
                    answered: true,
                  },
                );

                this.score(event);
              } }
              disabled={ answered }
            >
              { option }
            </button>
          ))}
        </div>
        <p>{ time }</p>
        { answered
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => {
                this.setState({
                  questionIndex: questionIndex += 1, answered: false, time: 30,
                });
                if (questionIndex !== MAX_QUESTIONS) {
                  this.answersShuffle(questionIndex);
                  return;
                }
                history.push({ pathname: ('/feedback') });
              } }
            >
              Proxima
            </button>)
          : ('')}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch(getToken(payload)),
  dispatchScore: (payload) => dispatch(sendScore(payload)),
  dispatchAssertion: () => dispatch(sendAssertion()),
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
