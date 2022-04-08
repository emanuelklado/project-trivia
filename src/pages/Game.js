import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchApiGame, fetchToken } from '../service/api';
import { getToken, actionLogin } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionIndex: 0,
    };
  }

  async componentDidMount() {
    const { userToken } = this.props;
    const errorCode = 3;
    const firstToken = await fetchApiGame(userToken);
    if (firstToken.response_code === errorCode) {
      const newToken = await fetchToken();
      const secondToken = await fetchApiGame(newToken.token);
      this.setState({ questions: secondToken.results });
    }
  }

  render() {
    const { questions, questionIndex } = this.state;
    console.log('here', questions);

    return (
      <div>
        <Header />
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">
              { questions[questionIndex].category }
            </p>
            <p data-testid="question-text">
              { questions[questionIndex].question }
            </p>
          </div>
        )}
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
});

Game.propTypes = {
  userToken: PropTypes.string,
  setToken: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
