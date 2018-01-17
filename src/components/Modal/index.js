/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-11-28 15:30:27
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-01-17 14:18:21
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import closeIcon from '../../images/svg/close.svg'

const baseModalStyle = {
  overlay: {
    backgroundColor: 'rgba(27, 29, 31, 0.5)',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    bottom: 'auto',
    border: 'none',
    background: '#FFF',
    overflow: 'hidden',
    borderRadius: '2px',
    outline: 'none',
    padding: '0px',
    width: '700px',
    zIndex: 10
  }
}

/**
 * 弹框组件
 */
export default class Modal extends Component {
  getResultStyle (style = {}) {
    const { isOpen } = this.props
    if (!isOpen) {
      return null
    }
    const ret = {}
    Object.keys(baseModalStyle).forEach(key => {
      ret[key] = Object.assign(baseModalStyle[key], style[key])
    })
    return ret
  }
  render () {
    const { title, children, footer,
      handleCancel, handleEnsure,
      style, closable,
      ...other } = this.props
    return (
      <ReactModal className="modal-content" style={this.getResultStyle(style)} {...other}>
        {
          title
            ? <div className="modal-header">
              {title}
              {
                closable
                  ? <svg className="closeIcon" onClick={handleCancel}>
                    <use xlinkHref={closeIcon}></use>
                  </svg>
                  : ''
              }
            </div>
            : ''
        }
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          {
            !footer
              ? <div className="footer-btn-wrap">
                <button className="btn btn-cancel" onClick={handleCancel}>取消</button>
                <button className="btn btn-ensure" onClick={handleEnsure}>确定</button>
              </div>
              : footer
          }
        </div>
      </ReactModal>
    )
  }
}
Modal.defaultProps = {
  closable: true
}
Modal.propTypes = {
  /** 弹框的唯一标识，必填 */
  contentLabel: PropTypes.string.isRequired,
  /** 弹框标题，可以是string, 也可以是节点 */
  title: PropTypes.any,
  /** 自定义底部按钮，假设进行自定义，需要手动为按钮绑定回调事件 */
  footer: PropTypes.any,
  /** 是否展示关闭按钮 */
  closable: PropTypes.bool,
  /** 控制弹窗的展示状态 */
  isOpen: PropTypes.bool,
  /** 取消的回调事件 */
  handleCancel: PropTypes.func,
  /** 确定的回调事件 */
  handleEnsure: PropTypes.func,
  /**
   * 样式设定
   * {
   *   overlay: 蒙版,
   *   content: 内容
   * }
  */
  style: PropTypes.object
}
