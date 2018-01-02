import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class BaseTable extends Component {
  render () {
    const { columns, data, border, hover, lineHeight, showHeader, className } = this.props
    const classes = classNames({
      'table': true,
      border,
      hover
    }, className)
    return (
      <table className={classes}>
        {
          showHeader
            ? <thead className="table-head">
              <tr>
                {
                  columns.map((column, index) => (<th
                    key={column.key + index}
                    className="table-head-item"
                    width={column.width}>
                    {column.title}
                  </th>))
                }
              </tr>
            </thead>
            : null
        }
        <tbody className="table-body">
          {
            data.map((row, index) => {
              return (
                <tr className="table-body-row" key={'table-body-row-' + index} style={{ height: lineHeight + 'px' }}>
                  {
                    columns.map((column, i) => {
                      const { key, render, align } = column
                      const rowData = row[key]
                      const ret = render ? render(rowData, row, index, i) : rowData
                      return <td className="table-row-item"
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
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}
BaseTable.defaultProps = {
  data: [],
  columns: [],
  border: true,
  hover: true,
  showHeader: true,
  lineHeight: 50
}
BaseTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  border: PropTypes.bool,
  hover: PropTypes.bool,
  showHeader: PropTypes.bool,
  lineHeight: PropTypes.number
}
