import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {battle} from '../utils/api';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile(props) {
  const {
    info:{
      login,
      avatar_url,
      name, location,
      company, followers, following,
      public_repos,
      blog
      }
    } = props;
  return (
    <PlayerPreview username={login} avatar={avatar_url}>
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player(props) {
  return (
    <div>
      <h1 className='header'>
        {props.label}
      </h1>
      <h3 style={{textAlign: 'center'}}>
        Score: {props.score}
      </h3>
      <Profile info={props.profile}/>
    </div>
  );
}
Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  async componentDidMount() {
    var players = queryString.parse(this.props.location.search);

    try {
      const results = await battle([
        players.playerOneName,
        players.playerTwoName
      ]);

      if (results === null) {
        return this.setState(() => {
          return {
            error: 'Looks like there is an error. Please check both users exist on Github',
            loading: false
          }
        })
      }
      this.setState(() => {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      });
    } catch (error) {
      console.warn("Error on the Results container");
    }
  }

  render() {
    const {error, winner, loser, loading} = this.state;

    if (loading) {
      return (<Loading />);
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>);
    }

    return (
      <div>
        <div className='row'>
          <Player label='Winner'
                  score={winner.score}
                  profile={winner.profile}/>
          <Player label='Loser'
                  score={loser.score}
                  profile={loser.profile}/>
        </div>

      </div>
    );
  }
}

export default Results;