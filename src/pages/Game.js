import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import Header from '../components/Header';
import { getToken, sendScore, sendAssertion, resetAssertion } from '../redux/actions';
import './game.css';

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
    this.resetState();
  }

  resetState = () => {
    const { score, dispatchScore, dispatchResetAssertion } = this.props;
    dispatchResetAssertion();
    dispatchScore(-score);
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
      dispatchScore(total);
      dispatchAssertion();
    }
  }

  changeColor = (option) => {
    const { answered, correct } = this.state;
    if (answered) {
      return (
        option === correct
          ? (
            { border: '3px solid rgb(6, 240, 15)' }
          )
          : { border: '3px solid rgb(255, 0, 0)' }
      );
    }
  }

  render() {
    const { options, correct, answered, time } = this.state;

    let { questionIndex } = this.state;

    const { sessionQuestions: { results }, history } = this.props;

    const MAX_QUESTIONS = 5; // Usado na linha 137 para o if

    const cleanQuestions = sanitizeHtml(results[questionIndex].question);

    return (
      <>
        <Header />
        <div className="game_container">
          <div className="card">
            {results !== undefined && (
              <div className="game_perguntas_container">
                <p data-testid="question-category">
                  {`Categoria: ${results[questionIndex].category}` }
                </p>
                <p data-testid="question-text">
                  {`Pergunta: ${cleanQuestions}` }
                </p>
              </div>
            )}
            <div className="game_respostas_container" data-testid="answer-options">
              <h3>Alternativas:</h3>
              {options.map((option, index) => (
                <button
                  className="myButton"
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
                  { sanitizeHtml(option) }
                </button>
              ))}
            </div>
          </div>
          <div className="div_tempo_restante">
            <p className="tempo_restante">
              {' '}
              Tempo Restante:
              {' '}
              { time }
            </p>
          </div>

          { answered
            ? (
              <button
                className="myButtonNext"
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
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch(getToken(payload)),
  dispatchScore: (payload) => dispatch(sendScore(payload)),
  dispatchAssertion: () => dispatch(sendAssertion()),
  dispatchResetAssertion: () => dispatch(resetAssertion()),
});

const mapStateToProps = (state) => ({
  userToken: state.token,
  sessionQuestions: state.questions,
  score: state.player.score,
  assertions: state.player.assertions,
});

Game.propTypes = {
  userToken: PropTypes.string,
  setToken: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
