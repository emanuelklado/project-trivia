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
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { userToken } = this.props;
    const errorCode = 3;
    const firstToken = await fetchApiGame(userToken);
    console.log(firstToken);
    if (firstToken.response_code === errorCode) {
      this.getNewtoken(firstToken.response_code);
      return;
    }
    this.setState({ questions: firstToken.results }, () => console.log(this.state));
  }

  getNewtoken = async (error) => {
    const { userToken, setToken } = this.props;
    const newToken = await fetchToken();
    setToken(newToken.token);
    console.log(userToken);
    const errorCode = 3;
    if (error === errorCode) this.componentDidMount();
  }

  render() {
    return (
      <div>
        <Header />
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
