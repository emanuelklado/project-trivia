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
      questionIndex: 0, // Indice da pergunta atual
      options: [], // Opções da pergunta atual
      correct: '', // Resposta correta
      answered: false, // Se foi respondida a pergunta
      time: 30, // Contador para a resposta
    };
  }

  componentDidMount() {
    this.answersShuffle();
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

  answersShuffle = () => {
    const { questionIndex } = this.state;

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
    const { sessionQuestions: { results }, dispatchScore } = this.props;
    const { correct_answer: correctAnswer } = results[questionIndex];
    if (target.textContent === correctAnswer) {
      const questionTypeScore = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      const { difficulty } = results[questionIndex];
      const total = base + (time * questionTypeScore[difficulty]);
      dispatchScore({ score: total });

      // Falta descobrir pra que a chave assertions serve.
    }
  }

  render() {
    const { questionIndex, options, correct, answered, time } = this.state;

    const { sessionQuestions: { results }, history } = this.props;

    const MAX_QUESTIONS = 4; // Usado na linha 137 para o if

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
                // Agora fica tudo com a borda vermelha até uma ser escolhida. Precisa verificar.
                option === correct && answered
                  ? { border: '3px solid rgb(6, 240, 15)' }
                  : { border: '3px solid rgb(255, 0, 0)' }
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
                this.setState({ questionIndex: questionIndex + 1 });
                if (questionIndex === MAX_QUESTIONS) {
                  history.push({ pathname: ('/feedback') });
                } else {
                  this.answersShuffle();
                  this.setState({ answered: false, time: 0 });
                }
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
