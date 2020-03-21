import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  Menu,
  Container
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

import Create from './views/create'
import List from './views/list'
import ShowFindings from './views/showFindings'

function App() {
  return (
    <BrowserRouter>
      <Container style={{ padding: "20px" }}> 
          <Menu>
            <Menu.Item link>
              <Link to="/create">Create</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to="/result">List</Link>
            </Menu.Item>
          </Menu>  
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/result/:id">
            <ShowFindings />
          </Route>
          <Route path="/result">
            <List />
          </Route>
          <Route path="/">
            <Redirect to="/create" />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
