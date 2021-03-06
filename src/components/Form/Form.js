/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:00:25
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-15 17:37:23
 */
import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FormItem from './FormItem'
import formDataMap from './formDataMap'

/**
 * 表单封装
 * 包含默认样式，表单验证的功能
 */
let id = 0
export default class Form extends Component {
  state = {
    reset: false
  }
  componentWillMount () {
    const { data } = this.props
    let dataMap = {}
    Object.keys(data).forEach(key => {
      dataMap[key] = {
        value: data[key].value,
        isOk: true
      }
    })
    this.id = `form-id-${++id}`
    formDataMap.set(this.id, dataMap)
  }
  /**
   * 验证当前内容并返回表单的值
   * @public
   */
  validateAndSubmit () {
    const dataMap = formDataMap.get(this.id)
    const hasFalse = Object.keys(dataMap).some(key => {
      const item = dataMap[key]

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

    return this.getCurData(dataMap)
  }
  /**
   * 重新初始化表单
   * @public
   */
  reset () {
    const { data } = this.props
    let dataMap = {}
    Object.keys(data).forEach(key => {
      dataMap[key] = {
        value: data[key].value,
        isOk: true
      }
    })
    formDataMap.set(this.id, dataMap)
    this.setState({
      reset: true
    }, () => {
      this.setState({
        reset: false
      })
    })
  }
  getCurData (dataMap) {
    let ret = {}
    Object.keys(dataMap).forEach(key => {
      ret[key] = dataMap[key].value
    })
    return ret
  }
  renderChildrens (children) {
    const { data, showInfo } = this.props
    const { reset } = this.state
    if (Array.isArray(children)) {
      return Children.map(children, child => {
        return this.renderChildrens(child)
      })
    }
    // 遇到FormItem,则绑定id
    if (children.type && children.type.name === FormItem.name) {
      return cloneElement(children, {
        id: this.id,
        data,
        showInfo,
        reset
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
    const { children, className, style } = this.props
    const classes = classNames('form', className)
    return (
      <div className={classes} style={style}>
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
  data: PropTypes.object.isRequired,
  /** 以信息形式展示表单 */
  showInfo: PropTypes.string
}
