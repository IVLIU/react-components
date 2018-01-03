import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import Row from './CollapseRow'

export default class ChildRows extends Component {
  constructor (props) {
    super(props)
    const { show = false } = this.props
    this.state = {
      show: show
    }
    this.toggleRow = this.toggleRow.bind(this)
  }
  toggleRow (e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      show: !this.state.show
    })
  }
  render () {
    const { columns, row, index, lineHeight, expandRowRender } = this.props
    const { show } = this.state
    return (
      <Fragment>
        <Row key={'table-body-row-' + index}
          row={row}
          index={index}
          columns={columns}
          expandRowRender={expandRowRender}
          lineHeight={lineHeight}
          hasChild={row.children && row.children.length}
          handleChildToggle={this.toggleRow}
          showChild={show}
          style={{ height: lineHeight + 'px' }} />
        {
          row.children && row.children.length && show
            ? row.children.map((child, i) => {
              return (
                <Row key={`table-body-row-${index}-${i}`}
                  row={child}
                  index={i}
                  columns={columns}
                  isChild
                  expandRowRender={expandRowRender}
                  lineHeight={lineHeight}
                  style={{ height: lineHeight + 'px' }} />
              )
            })
            : null
        }
      </Fragment>
    )
  }
}
Row.propTypes = {
  row: PropTypes.object,
  columns: PropTypes.array,
  index: PropTypes.number,
  lineHeight: PropTypes.number,
  expandRowRender: PropTypes.func
}
