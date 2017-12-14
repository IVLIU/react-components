import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Button, Input, MultiInput, Select,
  Radio, Checkbox
} from '../src/index'
const RadioGroup = Radio.RadioGroup
const CheckboxGroup = Checkbox.CheckboxGroup
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
  handleChange (value) {
    console.log(value)
  }
  render () {
    const handleChange = this.handleChange
    const dfValue = { a: 1 }
    return (
      <div className="container" style={{width: '1200px'}}>
        <div className="row mgb20">
          <Button>按钮</Button>
          <Button type="primary">按钮</Button>
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
            <Select onChange={handleChange} options={options} />
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
      </div>
    )
  }
}
App.propTypes = {}
