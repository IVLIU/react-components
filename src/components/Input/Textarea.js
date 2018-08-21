/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:51:08
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-15 17:38:20
 */
import React from 'react'
import classNames from 'classnames'

export default (props) => {
  const { hasError, className, props: controled, style } = props
  const classes = classNames('input', 'textarea', {
    error: hasError
  }, className)
  return (
    <textarea className={classes}
      type="textarea"
      style={style}
      {...controled} />
  )
}
