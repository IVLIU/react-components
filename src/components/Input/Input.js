/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:50:52
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-07-30 19:52:02
 */
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import ControledInput from '../Common/ControledInput'

@ControledInput(
  v => v,
  e => e.target.value
)
export default class Input extends PureComponent {
  render() {
    const { type, hasError, className, props: controled, ...others } = this.props
    const classes = classNames(
      'input',
      {
        error: hasError
      },
      className
    )
    return <input className={classes} type={type} {...others} {...controled} />
  }
}
