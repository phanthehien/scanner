import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {
  Menu,
  Container
} from "semantic-ui-react";

import Create from './View/Create'



function App() {
  return (
    <Router>
      <Container>

          <Menu compact>
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
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
