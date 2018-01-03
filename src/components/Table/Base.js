import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Row from './ChildRows'

/**
 * 基本的表格
 */
export default class BaseTable extends Component {
  render () {
    const { columns, data, border,
      hover, lineHeight, showHeader,
      className, expandRowRender,
      hasChild, ...others
    } = this.props
    const classes = classNames({
      'table': true,
      border,
      hover
    }, className)
    return (
      <table className={classes} {...others}>
        {
          showHeader
            ? <thead className="table-head">
              <tr>
                {
                  columns.map((column, index) => (<th
                    key={column.key + index}
                    colSpan={hasChild && index === 0 ? 2 : 1}
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
                <Row key={'table-body-row-' + index}
                  row={row}
                  index={index}
                  columns={columns}
                  hasChild={hasChild}
                  expandRowRender={expandRowRender}
                  lineHeight={lineHeight}
                  style={{ height: lineHeight + 'px' }}/>
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
  /** 内容数据 */
  data: PropTypes.array,
  /** 列的规则 */
  columns: PropTypes.array,
  /** 是否带边框 */
  border: PropTypes.bool,
  /** 是否带有hover样式 */
  hover: PropTypes.bool,
  /** 是否展示头 */
  showHeader: PropTypes.bool,
  /** 每行的高度 */
  lineHeight: PropTypes.number,
  /** 可展开表格的渲染 */
  expandRowRender: PropTypes.func
}
