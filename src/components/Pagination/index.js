import React from 'react'
import RCPagination from 'rc-pagination'
import classNames from 'classnames'
import 'rc-pagination/assets/index.css'

/**
 * rc-pagination的二次封装
 * @see https://github.com/react-component/pagination
 */
export default function Pagination (props) {
  const { className, ...others } = props
  const classes = classNames('tip-pagination', className)
  return <RCPagination className={classes} {...others} />
}
