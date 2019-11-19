import React from 'react';
import Login from './containers/login';
import Admin from './containers/admin';
import {BrowserRouter,Switch,Route} from 'react-router-dom';


function App() {
  return (
     <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Admin}/>
        </Switch>
     </BrowserRouter>
  );
}

export default App;
