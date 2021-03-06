import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './home/index'
import TabTest from './tabTest/index'
import TableTest from './tableTest/index'
import PaginationTest from './paginationTest/'
import ModalTest from './modalTest/'
import InputTest from './inputTest/'
import SelectTest from './selectTest/'
import FormTest from './FormTest/'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={FormTest} />
        <Route path="/pagination" component={PaginationTest} />
        <Route path="/modal" component={ModalTest} />
      </Switch>
    )
  }
}
export default App
