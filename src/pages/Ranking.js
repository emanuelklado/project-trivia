import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const getStorage = localStorage.getItem('ranking');
    const ranking = JSON.parse(getStorage);
    // método sort em array de objetos feito com base em:
    // https://www.horadecodar.com.br/2021/01/11/como-ordenar-um-array-de-objetos-em-javascript/
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.redirectToHome }
        >
          Inicio

        </button>

        {ranking.map((player, index) => (
          <div key={ player.name }>
            <img src={ player.picture } alt={ `Imagem de ${player.name}` } />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}

      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
