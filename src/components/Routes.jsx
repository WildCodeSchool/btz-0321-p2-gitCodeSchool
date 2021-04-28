import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import AllRepos from './AllRepos/AllRepos';
import Toolbox from './Toolbox/Toolbox';
import Repo from './Repo/Repo';

function Routes({ isLogged, handleClickLogin, pseudo }) {
  return (
    <>
      <Route exact path="/">
        <Home isLogged={isLogged} handleClickLogin={handleClickLogin} pseudo={pseudo} />
      </Route>
      <Route path="/profile/:username" component={Profile} />
      <Route path="/repos/:username" component={AllRepos} />
      <Route path="/toolbox" component={Toolbox} />
      <Route path="/repo/:username/:repo" component={Repo} />
    </>
  );
}

Routes.propTypes = {
  isLogged: PropTypes.bool,
  handleClickLogin: PropTypes.func,
  pseudo: PropTypes.string,
};

export default Routes;