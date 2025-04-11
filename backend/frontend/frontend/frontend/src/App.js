import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/user/:userId" component={ProductList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;