import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { userName, userEmail } = this.props;
    const { score } = this.state;

    return (
      <header>
        <h1>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(userEmail)}` }
            alt={ `Foto de perfil de ${userName}` }
            data-testid="header-profile-picture"
          />
          <div data-testid="header-player-name">{userName}</div>
          <div data-testid="header-score">{ score }</div>
        </h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.userName,
  userEmail: state.player.userEmail,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
