import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RCPagination from 'rc-pagination'
import classNames from 'classnames'
import 'rc-pagination/assets/index.css'

/**
 * rc-pagination的二次封装
 * @see https://github.com/react-component/pagination
 */
export default class Pagination extends Component {
  render () {
    const { className, ...others } = this.props
    const classes = classNames('tip-pagination', className)
    return <RCPagination className={classes} {...others} />
  }
}
Pagination.propTypes = {
  /** 当前的在第几页，比如一共5页面，current=1，则显示当前在第一页 */
  current: PropTypes.number.isRequired,
  /** 点击切换分页的时候，调用的函数 */
  onChange: PropTypes.func.isRequired,
  /** 当前分页所有的总数目 */
  total: PropTypes.number.isRequired,
  /** 每页显示多少条数据，默认是10 */
  pageSize: PropTypes.number
}
