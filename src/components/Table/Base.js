import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import classNames from 'classnames'
import Row from './ChildRows'
import SelectTable from './SelectTable'

/**
 * 基本的表格
 */
@SelectTable
export default class BaseTable extends Component {
  state = {
    activeIndex: 0
  }
  componentWillMount () {
    const { data, clickable } = this.props
    clickable && this.changeActive(data[0], 0)
  }
  @autobind
  changeActive (row, index) {
    this.setState({
      activeIndex: index
    })
    this.props.handleRowClick && this.props.handleRowClick(row, index)
  }
  renderSortIcon (column) {
    const { handleSortChange, sortKey, sortFlag } = this.props
    const change = sort => {
      handleSortChange && handleSortChange(column.key, sort)
    }
    const active = sort => {
      return column.key === sortKey && sort === sortFlag
        ? 'active'
        : ''
    }
    return (
      <div className="table-sort-button">
        <span className={`topTriangle ${active('asc')}`} onClick={() => { change('asc') }}></span>
        <span className={`bottomTriangle ${active('desc')}`} onClick={() => { change('desc') }}></span>
      </div>
    )
  }
  renderHeader (columns) {
    const { hasChild, select } = this.props
    const getColSpan = index => {
      if (!hasChild) {
        return 1
      }
      if (select) {
        return index === 1 ? 2 : 1
      }
      return index === 0 ? 2 : 1
    }
    return (
      <thead className="table-head">
        <tr>
          {
            columns.map((column, index) => {
              const cls = classNames('table-head-item')
              return (<th
                key={column.key + index}
                colSpan={getColSpan(index)}
                className={cls}
                width={column.width}>
                {column.title}
                {column.sortable ? this.renderSortIcon(column) : null}
              </th>)
            })
          }
        </tr>
      </thead>
    )
  }
  render () {
    const { columns, data, border,
      hover, lineHeight, showHeader,
      className, expandRowRender,
      sortKey, sortFlag,
      handleSortChange,
      select,
      clickable,
      defaultRenderExpand,
      background,
      striped,
      hasChild, ...others
    } = this.props
    const classes = classNames({
      'table': true,
      border,
      hover,
      background: background && !striped,
      striped
    }, className)
    return (
      <table className={classes} {...others}>
        {
          showHeader
            ? this.renderHeader(columns)
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
                  select={select}
                  clickable={clickable}
                  expandRowRender={expandRowRender}
                  defaultRenderExpand={defaultRenderExpand && index === 0}
                  changeActive={this.changeActive}
                  lineHeight={lineHeight}
                  active={index === this.state.activeIndex}
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
  background: true,
  showHeader: true,
  lineHeight: 50,
  defaultRenderExpand: false
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
  /** 是否带有背景色 */
  background: PropTypes.bool,
  /** 是否各行换色 */
  striped: PropTypes.bool,
  /** 是否展示头 */
  showHeader: PropTypes.bool,
  /** 是否行可点击 */
  clickable: PropTypes.bool,
  /** 点击行的回调 */
  handleRowClick: PropTypes.func,
  /** 每行的高度 */
  lineHeight: PropTypes.number,
  /** 可展开表格的渲染 */
  expandRowRender: PropTypes.func,
  /** 改变排序时的回调 */
  handleSortChange: PropTypes.func,
  /** 当前排序的key */
  sortKey: PropTypes.string,
  /** 当前排序的顺序 */
  sortFlag: PropTypes.oneOf(['asc', 'desc'])
}
