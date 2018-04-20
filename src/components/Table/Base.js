import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import classNames from 'classnames'
import Row from './ChildRows'
import SelectTable from './SelectTable'
import LimitTable from './LimitTable'

/**
 * 基本的表格
 */
@LimitTable
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
  getColSpan (index) {
    const { hasChild, select } = this.props

    if (!hasChild) {
      return 1
    }
    if (select) {
      return index === 1 ? 2 : 1
    }
    return index === 0 ? 2 : 1
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
  renderColGroup (columns, isScrollHeader) {
    const { hasChild } = this.props
    return (
      <colgroup>
        { hasChild ? <col style={{ width: 60, minWidth: 60 }}/> : null }
        {
          columns.map((column, index) => {
            const subWidth = index === columns.length - 1 && isScrollHeader ? 10 : 0
            const width = column.width + subWidth
            return (<col
              key={column.key + index}
              style={{
                width: width,
                minWidth: width
              }}>
            </col>)
          })
        }
      </colgroup>
    )
  }
  renderHeader () {
    const { scrollHeight, columns } = this.props

    const tableHead = (
      <thead className="table-head">
        <tr>
          {
            columns.map((column, index) => {
              const cls = classNames('table-head-item')
              return (<th
                key={column.key + index}
                colSpan={this.getColSpan(index)}
                className={cls}>
                {column.title}
                {column.sortable ? this.renderSortIcon(column) : null}
              </th>)
            })
          }
        </tr>
      </thead>
    )
    return scrollHeight
      ? <div className="table-header-wrap">
        <table>
          {this.renderColGroup(columns, true)}
          {tableHead}
        </table>
      </div>
      : tableHead
  }
  renderBody () {
    const {
      data, columns, hasChild,
      select, clickable, expandRowRender,
      defaultRenderExpand, lineHeight,
      scrollHeight, hasMore, showMore } = this.props
    const tableBody = <tbody className="table-body">
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
              style={{ height: lineHeight + 'px' }} />
          )
        })
      }
      {
        hasMore ? <tr className="table-body-row table-show-more" onClick={showMore}>
          <td colSpan={hasChild ? columns.length + 1 : columns.length}>
            显示更多
          </td>
        </tr> : null
      }
    </tbody>

    return scrollHeight
      ? <div className="table-body-wrap" style={{
        maxHeight: scrollHeight
      }}>
        <table>
          {this.renderColGroup(columns)}
          {tableBody}
        </table>
      </div>
      : tableBody
  }
  render () {
    const { columns, border,
      hover, showHeader, className,
      background, striped, style,
      scrollHeight
    } = this.props
    const classes = classNames({
      'table': true,
      border,
      hover,
      background: background && !striped,
      striped
    }, className)
    const tableContent = <Fragment>
      {!scrollHeight ? this.renderColGroup(columns) : null}
      {showHeader ? this.renderHeader() : null}
      {this.renderBody()}
    </Fragment>
    return scrollHeight
      ? <div className={classes} style={style}>
        {tableContent}
      </div>
      : <table className={classes} style={style}>
        {tableContent}
      </table>
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
  /**
   * 列的规则
   * {
   *   title: '列标题',
   *   key: '字段',
   *   render: '渲染函数，可进行自定义渲染',
   *   width: '设置宽度',
   *   align: '对齐',
   *   limit: '设置是否单元格不换行处理'
   * }
   */
  /** 前端分页，用于限制一次展示多少条 */
  pageLimit: PropTypes.number,
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
  /** 是否为多选表格 */
  select: PropTypes.bool,
  /** 点击行的回调 */
  handleRowClick: PropTypes.func,
  /** 每行的高度 */
  lineHeight: PropTypes.number,
  /** 可展开表格的渲染 */
  expandRowRender: PropTypes.func,
  /** 默认展开第一行 */
  defaultRenderExpand: PropTypes.bool,
  /** 改变排序时的回调 */
  handleSortChange: PropTypes.func,
  /** 当前排序的key */
  sortKey: PropTypes.string,
  /** 当前排序的顺序 */
  sortFlag: PropTypes.oneOf(['asc', 'desc'])
}
