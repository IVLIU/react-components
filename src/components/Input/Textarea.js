/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:51:08
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-07-26 17:21:11
 */
import React from 'react'
import classNames from 'classnames'

export default (props) => {
  const { type, hasError, className, props: controled, ...others } = props
  const classes = classNames('input', 'textarea', {
    error: hasError
  }, className)
  return (
    <textarea className={classes}
      type="textarea"
      {...others}
      {...controled} />
  )
}
