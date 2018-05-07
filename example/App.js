import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from "./home/index"
import TabTest from "./tabTest/index"
import TableTest from "./tableTest/index"
import PaginationTest from "./paginationTest/"
import ModalTest from "./modalTest/"
import DropDownListTest from "./dropDownListTest/"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/dropdownlist' component={DropDownListTest}/>
        <Route path='/table' component={TableTest}/>
        <Route path='/pagination' component={PaginationTest}/>
        <Route path='/modal' component={ModalTest}/>
      </Switch>)
  }
}
export default App