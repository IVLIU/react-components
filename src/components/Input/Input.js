/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:50:52
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-07-26 17:21:39
 */
import React from 'react'
import classNames from 'classnames'

export default props => {
  const { type, hasError, className, props: controled, ...others } = props
  const classes = classNames(
    'input',
    {
      error: hasError
    },
    className
  )
  return <input className={classes} type={type} {...others} {...controled} />
}
