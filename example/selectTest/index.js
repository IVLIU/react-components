import React, { Component } from 'react'
// import {
//   Select
// } from '../../src/index';
// import {
//   Select
// } from '../../dist/static/js/lib';
const options = [
  {
    label: "111",
    value: "111"
  },
  {
    label: "222",
    value: "222"
  },
  {
    label: "333",
    value: "333"
  }
];
export default class SelectTest extends Component {
  static propTypes = {}
  onChange(val) {
    console.log("val", val)
  }
  render () {
    return (
       <div className="container" style={{width: '1200px'}}>
        <div>
          <p>多选</p>
          <div className="row">
            <div className="col-6 mgb20">
              <Select onChange={console.log} options={options} multi />
            </div>
          </div>
        </div>;
      </div>
    )
  }
}

