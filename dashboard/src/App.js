import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Container
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

import Create from './views/create'
import List from './views/list'
import Menu from './components/menu'
import ShowFindings from './views/showFindings'

const renderView = (Component) => {
  return (
    <Container style={{ padding: "20px" }}>
      <Menu />
      <Component />
    </Container>
  )
}

const App = () => {
  return (
    <BrowserRouter>   
        <Switch>
          <Route path="/create">
            { renderView(Create) }
          </Route>
          <Route path="/result/:id">
            { renderView(ShowFindings) }
          </Route>
          <Route path="/result">
            { renderView(List) }
          </Route>
          <Route path="/">
            <Redirect to="/create" />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
