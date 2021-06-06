import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/Home/index';
import Profile from '../pages/Profile/index';

function Routes(){
  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:username" component={Profile} />
      </Switch>
    </div>
  )
}

export default Routes