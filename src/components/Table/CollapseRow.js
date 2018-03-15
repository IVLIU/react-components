import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Row extends Component {
  constructor (props) {
    super(props)
    const { show = false } = this.props
    this.state = {
      show: show
    }
    this.toggleRow = this.toggleRow.bind(this)
  }
  toggleRow (e) {
    const { clickable, expandRowRender, changeActive, row, index } = this.props

    if (clickable) {
      e.stopPropagation()
      e.preventDefault()
      return changeActive(row, index)
    }
    if (!expandRowRender) {
      return
    }
    e.stopPropagation()
    e.preventDefault()

    this.setState({
      show: !this.state.show
    })
  }
  render () {
    const { columns, row, index,
      lineHeight, expandRowRender,
      hasChild, handleChildToggle,
      isChild, showChild, hasChildren,
      select,
      active, clickable,
      ...others
    } = this.props
    const { show } = this.state
    const classes = classNames({
      'table-body-row': true,
      'has-child': hasChild,
      'child-open': showChild,
      'table-body-child-row': isChild,
      'has-expand': expandRowRender,
      active: active && clickable
    })
    return (
      <Fragment>
        <tr className={classes} onClick={this.toggleRow} {...others}>
          {
            columns.map((column, i) => {
              const { key, render, align } = column
              const rowData = row[key]
              const ret = render ? render(rowData, row, {
                rowIndex: index,
                columnIndex: i,
                expandShow: show
              }) : rowData
              const classes = [
                `table-row-item`,
                align === 'left' ? 'pdl20' : '',
                align === 'right' ? 'pdr20' : ''
              ].filter(i => i).join(' ')
              return <td className={classes}
                style={{
                  height: lineHeight + 'px',
                  textAlign: align || 'center'
                }}
                width={column.width}
                key={'row' + index + i}>
                {ret}
              </td>
            })
          }
        </tr >
        {
          show && expandRowRender
            ? <tr className="table-body-expand-row">
              <td colSpan={hasChildren ? columns.length + 1 : columns.length}>
                {expandRowRender(row, index, columns)}
              </td>
            </tr>
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
