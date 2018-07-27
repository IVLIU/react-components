/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-11-30 15:11:38
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-07-26 19:47:53
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../Icon'
import successIcon from '@/images/svg/success.svg'
import warningIcon from '@/images/svg/alert.svg'
import noticeIcon from '@/images/svg/notice.svg'
import errorIcon from '@/images/svg/error.svg'

const typeMap = {
  success: successIcon,
  warning: warningIcon,
  notice: noticeIcon,
  error: errorIcon
}

/**
 * 基本的消息提示
 * 目前用于表单提示后的信息
 * 注： 目前只封装了success, error两种样式，待设计完善
 */
export default class Alert extends PureComponent {
  render() {
    const { message, description, type, className, ...others } = this.props
    const classes = classNames(
      'base-alert',
      `base-alert-${type}`,
      className
    )
    return (
      <div data-show="true" className={classes} {...others}>
        {
          typeMap[type]
            ? <Icon className="base-alert-icon" link={typeMap[type]} />
            : ''
        }
        <div className="base-alert-content">
          <p className="base-alert-message">{message}</p>
          <p className="base-alert-description">{description}</p>
        </div>
      </div>
    )
  }
}
Alert.defaultProps = {
  type: 'success'
}
Alert.propTypes = {
  /** 提示标题 */
  message: PropTypes.string,
  /** 提示描述 */
  description: PropTypes.string,
  /** 提示类型 */
  type: PropTypes.oneOf(['success', 'error'])
}
