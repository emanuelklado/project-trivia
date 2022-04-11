import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './header.css';

class Header extends React.Component {
  render() {
    const { userName, userEmail, userScore } = this.props;
    // add userAssertions -> no this.props;
    return (
      <header className="header_container">
        <section className="header_section_container">
          <img
            src={ `https://www.gravatar.com/avatar/${md5(userEmail)}` }
            alt={ `Foto de perfil de ${userName}` }
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">
            Nome do usuário:
            {' '}
            {userName}
          </h2>
        </section>
        <h2 data-testid="header-score">
          Pontuação:
          {' '}
          { userScore }
        </h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.userName,
  userEmail: state.player.userEmail,
  userScore: state.player.score,
  userAssertions: state.player.assertions,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
