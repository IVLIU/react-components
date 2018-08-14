import React, { Component } from 'react'
// import { Form, Input, Radio, Select, MultiInput, Button } from '../../src/index'
import {
  Form,
  Input,
  Radio,
  Select,
  MultiInput,
  Button
} from '../../dist/static/js/lib.js'
const FormItem = Form.Item
const RadioGroup = Radio.RadioGroup
const field = {
  name: {
    value: 'ddss',
    validators: [
      {
        required: true
      },
      {
        length: [0, 4]
      }
    ]
  },
  sex: {
    value: 'male'
  },
  fuzzy_asset_name: {
    value: '',
    validators: [
      {
        length: [0, 200]
      }
    ]
  },
  phone: {
    value: 'dd',
    validators: [
      {
        required: true
      }
    ]
  },
  phone_ensure: {
    value: 'ddsd',
    validators: [
      {
        required: true
      },
      {
        fn(item, data) {
          return true
        }
      }
    ],
    trigger: 'blur'
  },
  hobby: {
    value: 'basketball',
    options: [
      {
        label: '篮球',
        value: 'basketball'
      },
      {
        label: '足球',
        value: 'football'
      },
      {
        label: '乒乓球',
        value: 'pingpang'
      }
    ]
  },
  emails: {
    value: [],
    validators: [
      {
        required: true
      },
      {
        type: 'email'
      }
    ]
  }
}
export default class InputTest extends Component {
  static propTypes = {}
  Submit() {
    const res = this.refs.input.validateAndSubmit()
    console.log(res)
  }
  reset() {
    this.refs.input.reset()
  }
  renderForm() {
    return (
      <Form data={field} ref="input">
        <div className="row mgb20">
          <FormItem label="姓名" field="name" placeholder="填写您的姓名">
            <Input />
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="性别" field="sex">
            <RadioGroup>
              <Radio label="男" value="male" />
              <Radio label="女" value="female" />
            </RadioGroup>
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="爱好" field="hobby">
            <Select options={field.hobby.options} />
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem
            label="自我介绍"
            placeholder="填写您的姓名"
            field="fuzzy_asset_name"
          >
            <Input type="textarea" max="200" />
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="电话" placeholder="填写您的电话" field="phone">
            <Input />
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem label="邮箱" placeholder="填写您的邮箱" field="emails">
            <MultiInput />
          </FormItem>
        </div>
        <div className="row mgb20">
          <FormItem
            label="电话"
            placeholder="填写您的邮箱"
            field="phone_ensure"
          >
            <Input />
          </FormItem>
        </div>
        <Button onClick={this.Submit.bind(this)} type="secondary">
          提交
        </Button>
        <Button onClick={this.reset.bind(this)} type="primary">
          重置
        </Button>
      </Form>
    )
  }
  render() {
    return (
      <div className="container" style={{ width: '1200px' }}>
        {this.renderForm()}
      </div>
    )
  }
}
