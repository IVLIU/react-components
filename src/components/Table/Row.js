import React, { Component } from 'react'
import classNames from 'classnames'
import pureRender from 'pure-render-decorator'

import CollapseRow from './CollapseRow'
import HasChild from './HasChildRow'
import autobind from 'autobind-decorator'

@pureRender
@HasChild
@CollapseRow
export default class Row extends Component {
  @autobind
  handleRowClick () {
    const { rowData, rowIndex, onClick } = this.props
    onClick && onClick(rowData, rowIndex)
  }

  renderColumn (column, columnIndex) {
    const { key, render, align, limit, width } = column
    const { rowData, rowIndex, expandShow, lineHeight } = this.props
    const columnData = rowData[key]
    const otherStatus = {
      rowIndex,
      columnIndex,
      expandShow
    }
    const content = render ? render(columnData, rowData, otherStatus) : columnData
    const classes = classNames({
      'table-row-item': true,
      'pdl20': align === 'left',
      'pdr20': align === 'right',
      limit
    })
    return (
      <td className={classes}
        style={{
          height: lineHeight,
          textAlign: align || 'center',
          maxWidth: width
        }}
        key={`row-${rowIndex}-${columnIndex}`}>
        {content}
      </td>
    )
  }

  render () {
    const { columns, active, className, lineHeight, striped } = this.props
    const classes = classNames({
      'table-body-row': true,
      active,
      striped
    }, className)
    return (
      <tr className={classes} onClick={this.handleRowClick}
        style={{ height: lineHeight }}>
        { columns.map((column, i) => this.renderColumn(column, i)) }
      </tr>
    )
  }
}
