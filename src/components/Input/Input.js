/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:50:52
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-22 17:29:45
 */
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import ControledInput from '../Common/ControledInput'
import Icon from '../Icon'
import searchIcon from '@/images/svg/search.svg'

@ControledInput(
  v => v,
  e => e.target.value
)
export default class Input extends PureComponent {
  render() {
    const { type, isSearch, hasError, className, props: controled, ...others } = this.props
    const classes = classNames(
      'input',
      {
        error: hasError
      },
      className
    )
    if (isSearch) {
      return <div className="input-wrapper">
        <input className={classes} placeholder={isSearch ? '搜索相关内容' : ''} type={type} {...others} {...controled} />
        <Icon className="search-icon" link={searchIcon}/>
      </div>
    }
    return <input className={classes} placeholder={isSearch ? '搜索相关内容' : ''} type={type} {...others} {...controled} />
  }
}
