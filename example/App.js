import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Button, Input, MultiInput, Select,
  Radio, Checkbox, Form, Modal
} from '../src/index'
const RadioGroup = Radio.RadioGroup
const CheckboxGroup = Checkbox.CheckboxGroup
const FormItem = Form.Item
const options = [{
  label: '111',
  value: '111'
}, {
  label: '222',
  value: '222'
}, {
  label: '333',
  value: '333'
}]
export default class App extends Component {
  constructor () {
    super()
    this.state = {
      showModal: false
    }
  }
  handleChange (value) {
    console.log(value)
  }
  Submit () {
    const res = this.refs.input.validateAndSubmit()
    console.log(res)
  }
  renderForm () {
    const field = {
      name: {
        value: '王卫新',
        validators: [{
          required: true
        }, {
          length: [0, 4]
        }]
      },
      sex: {
        value: 'male'
      },
      description: {
        value: '这是描述',
        validators: [{
          length: [0, 200]
        }]
      },
      phone: {
        value: '13022423521',
        validators: [{
          required: true
        }, {
          type: 'phone'
        }]
      },
      hobby: {
        value: 'football',
        options: [{
          label: '篮球',
          value: 'basketball'
        }, {
          label: '足球',
          value: 'football'
        }, {
          label: '乒乓球',
          value: 'pingpang'
        }]
      },
      emails: {
        value: ['11@qq.com'],
        validators: [{
          required: true
        }, {
          type: 'email'
        }]
      }
    }
    return (
      <Form data={field} ref="input">
        <div className="row mgb20">
          <FormItem label="姓名" field="name" placeholder="填写您的姓名" defaultValue={field.name.value} validators={field.name.validators}>
            <Input/>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="性别" field="sex" defaultValue={field.sex.value}>
            <RadioGroup>
              <Radio label="男" value="male" />
              <Radio label="女" value="female" />
            </RadioGroup>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="爱好" field="hobby" defaultValue={field.hobby.value}>
            <Select options={field.hobby.options}></Select>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="自我介绍" placeholder="填写您的姓名" field="description" defaultValue={field.description.value} validators={field.description.validators}>
            <Input type="textarea" max="200"/>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="电话" placeholder="填写您的电话" field="phone" defaultValue={field.phone.value} validators={field.phone.validators}>
            <Input />
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="邮箱" placeholder="填写您的邮箱" field="emails" defaultValue={field.emails.value} validators={field.emails.validators}>
            <MultiInput />
          </FormItem>
        </div>
        <Button onClick={this.Submit.bind(this)} type="secondary">提交</Button>
      </Form>
    )
  }
  showModal () {
    this.setState({
      showModal: true
    })
  }
  closeModal () {
    this.setState({
      showModal: false
    })
  }
  renderModal () {
    const { showModal } = this.state
    return (
      <div className="row mgb20">
        <button onClick={this.showModal.bind(this)} className="btn btn-secondary">
          点我显示Modal
        </button>
        <Modal isOpen={showModal} title="测试Modal"
          handleEnsure={this.closeModal.bind(this)}
          handleCancel={this.closeModal.bind(this)}
          contentLabel="TestModal">
          <div>
            这是Modal里面的内容
          </div>
        </Modal>
      </div>
    )
  }
  render () {
    const handleChange = this.handleChange
    const dfValue = { a: 1 }
    return (
      <div className="container" style={{width: '1200px'}}>
        <div className="row mgb20">
          <Button>按钮</Button>
          <Button type="primary" className="test">按钮</Button>
          <Button type="secondary">按钮</Button>
          <Button type="cancel">按钮</Button>
          <Button type="link">按钮</Button>
        </div>
        <p>input</p>
        <div className="row mgb20">
          <div className="col-6 mgb20"><Input onChange={handleChange} /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} defaultValue="默认值，disabled" disabled /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} hasError /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" hasError /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} disabled defaultValue="默认值，disabled" type="textarea" /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" max="200" /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" max="200" hasError /></div>
          <div className="col-6 mgb20"><Input onChange={handleChange} type="textarea" max="200" disabled defaultValue="默认值，disabled" /></div>
        </div>
        <p>multiInput</p>
        <div className="row mgb20">
          <div className="col-6 mgb20">
            <MultiInput onChange={handleChange} defaultValue={[]}></MultiInput>
          </div>
          <div className="col-6 mgb20">
            <MultiInput onChange={handleChange} hasError></MultiInput>
          </div>
          <div className="col-6 mgb20">
            <MultiInput onChange={handleChange} disabled defaultValue={['aaa']}></MultiInput>
          </div>
          <div className="col-6 mgb20">
            <MultiInput onChange={handleChange} disabled></MultiInput>
          </div>
        </div>
        <p>Select</p>
        <div className="row mgb20">
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} clearable={false} />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} multi />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} hasError />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} disabled />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} disabled defaultValue="111" />
          </div>
          <div className="col-6 mgb20">
            <Select onChange={handleChange} options={options} multi disabled defaultValue={['111', '222']} />
          </div>
        </div>
        <p>Radio</p>
        <div className="row mgb20">
          <div className="col-6 mgb20">
            <Radio label="选择1" name="a" value="1" onChange={handleChange} />
            <Radio label="选择2" name="a" value="2" defaultChecked onChange={handleChange} />
          </div>
          <div className="col-6 mgb20">
            <RadioGroup defaultValue={dfValue} onChange={handleChange}>
              <Radio label="选择1" value={dfValue} />
              <Radio label="选择2" value={{ a: 2 }} />
            </RadioGroup>
          </div>
        </div>
        <p>Checkbox</p>
        <div className="row mgb20">
          <div className="col-6 mgb20">
            <Checkbox label="选择1" name="a" value="1" onChange={handleChange} />
            <Checkbox label="选择2" name="a" value="2" defaultChecked onChange={handleChange} />
          </div>
          <div className="col-6 mgb20">
            <CheckboxGroup defaultValue={['2']} onChange={handleChange}>
              <Checkbox label="选择1" value="1" />
              <Checkbox label="选择2" value="2" />
            </CheckboxGroup>
          </div>
        </div>
        <p>Form</p>
        <div className="row mgb20">
          <div className="col-8">
            {
              this.renderForm()
            }
          </div>
        </div>
        { this.renderModal()}
      </div>
    )
  }
}
App.propTypes = {}
