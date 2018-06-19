/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:50:52
 * @Last Modified by: zsj
 * @Last Modified time: 2018-06-11 16:03:32
 */
import React from 'react'
import ControledInput from '../Common/ControledInput'
import classNames from 'classnames'

const mapDefaultToValue = v => v
const mapValueToValue = e => {
  return e.target.value
}

const Input = props => {
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

export default ControledInput(Input, mapDefaultToValue, mapValueToValue)
