/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-11-28 15:30:27
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-18 14:57:27
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
      style, closable = true,
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
Modal.propTypes = {
  title: PropTypes.any,
  children: PropTypes.any.isRequired,
  footer: PropTypes.any,
  closable: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleEnsure: PropTypes.func,
  style: PropTypes.object
}
