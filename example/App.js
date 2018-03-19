import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from "./home/index"
import TabTest from "./tabTest/index"
import TableTest from "./tableTest/index"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/tab' component={TabTest}/>
        <Route path='/table' component={TableTest}/>
      </Switch>)
  }
}
export default App