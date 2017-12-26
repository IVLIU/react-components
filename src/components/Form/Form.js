/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:00:25
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-26 19:46:07
 */
import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import event from '../../lib/eventProxy'
import classNames from 'classnames'

/**
 * 表单封装
 * 包含默认样式，表单验证的功能
 */
let id = 0
export default class Form extends Component {
  constructor () {
    super()
    this.dataMap = {}
  }
  componentWillMount () {
    const { data } = this.props
    Object.keys(data).forEach(key => {
      this.dataMap[key] = {
        value: data[key].value,
        isOk: true
      }
    })
    this.id = `form-id-${++id}`
    event.on(`form-field-change-${this.id}`, ({key, config, context}) => {
      this.dataMap[key] = {
        value: config.value,
        isOk: config.isOk,
        context
      }
    })
  }
  /**
   * 验证当前内容并返回表单的值
   * @public
   */
  validateAndSubmit () {
    const hasFalse = Object.keys(this.dataMap).some(key => {
      const item = this.dataMap[key]

      if (!item.isOk) {
        item.context.setState({
          hasError: true
        })
      }
      return !item.isOk
    })
    if (hasFalse) {
      return false
    }

    let ret = {}
    Object.keys(this.dataMap).forEach(key => {
      ret[key] = this.dataMap[key].value
    })
    return ret
  }
  renderChildrens (children) {
    const { data } = this.props
    if (Array.isArray(children)) {
      return Children.map(children, child => {
        return this.renderChildrens(child)
      })
    }

    // 遇到FormItem,则绑定id
    if (children.type && children.type.name === 'FormItem') {
      return cloneElement(children, {
        id: this.id,
        data
      })
    }

    // 循环处理
    if (children.props && children.props.children) {
      const props = Object.assign({}, children.props, {
        children: this.renderChildrens(children.props.children)
      })
      return Object.assign({}, children, {
        props
      })
    }
    return children
  }
  render () {
    const { children, className, ...others } = this.props
    const classes = classNames('form', className)
    return (
      <div className={classes} {...others}>
        {this.renderChildrens(children)}
      </div>
    )
  }
}
Form.propTypes = {
  /**
   * 表单对应的数据
   * 针对该数据会生成最终的表单数据
   */
  data: PropTypes.object.isRequired
}
