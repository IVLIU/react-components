import React, { Component } from 'react'
import {
  Pagination
} from '../../src/index'

class PaginationTest extends Component {
  constructor () {
    super()
    this.state = {
      current: 0
    }
  }
  static propTypes = {
  }
  static defaultProps = {
    name: ''
  }
  handlePageChange (current) {
    this.setState({
      current
    })
  }
  render () {
    const { current } = this.state
    return (
      <div className="container" style={{width: '1200px'}}>
      <Pagination current={current} onChange={this.handlePageChange.bind(this)} total={100} pageSize={20}/>
      </div>
    )
  }
}
export default PaginationTest