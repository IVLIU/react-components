/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:51:08
 * @Last Modified by:   wangweixin@threatbook.cn
 * @Last Modified time: 2018-01-18 17:51:08
 */
import React from 'react'
import ControledInput from '../Common/ControledInput'
import classNames from 'classnames'

const mapDefaultToValue = v => v
const mapValueToValue = e => e.target.value

const Textarea = (props) => {
  const { type, hasError, className, props: controled, ...others } = props
  const classes = classNames('input', 'textarea', {
    error: hasError
  }, className)
  return (
    <textarea className={classes}
      {...others}
      type="textarea"
      {...others}
      {...controled} />
  )
}

export default ControledInput(Textarea, mapDefaultToValue, mapValueToValue)
