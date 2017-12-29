> 注：没找到比较通用的tab样式，这里并没有对tab做过多样式的封装，后续可以进行添加

#### 基本使用

最单纯的Tab,可以切换各选项卡的内容

``` js
<Tab>
  <TabPanel header="告警明细" keys="1">111</TabPanel>
  <TabPanel header="告警不明细" keys="2">222</TabPanel>
</Tab>
```

#### 定制tabBar

通过header返回节点，定制tabBar的内容，
通过style等定制样式

``` js
<Tab tabStyle={{ color: 'blue', marginRight: '10px' }} activeStyle={{ color: 'red', borderColor: 'orange' }}>
  <TabPanel header="告警明细" keys="1">111</TabPanel>
  <TabPanel header={<div>❤️可疑活动明细</div>} keys="2">222</TabPanel>
</Tab>
```

#### 整合Code组件，进行代码展示
定制tab样式和内容，进行常用的code展示tab

``` js
const code = {
  '@timestamp': '2017-12-27T19:38:39+08:00',
  'input_name': 'sensor_input',
  'input_type': 'sensor',
  'data': '10.10.169.184',
  'data_type': 'ip',
  'behave_uuid': 'sensor-1273069213273718',
  'input_uuid': '1514374719-sensor-93579900-80545624',
  'machine': '10.9.154.22',
  'time': 1514374719,
  'input_time': 1514374719,
  'related_ip': '10.10.169.184',
  'source_ip': '10.9.154.22',
  'event_type': 'net',
  'net': {
    'src_ip': '10.9.154.22',
    'src_port': 42065,
    'dest_ip': '10.10.169.184',
    'dest_port': 1514,
    'proto': 'UDP',
    'type': 'flow',
    'flow': {
      'app_proto': 'failed',
      'pkts_toserver': 1,
      'bytes_toserver': 478,
      'state': 'new'
    }
  }
};
const tabStyle = {
  backgroundColor: '#e8e8e8',
  color: '#1b3247',
  fontSize: '14px',
  border: 'none',
  width: '90px',
  textAlign: 'center',
  fontWeight: 'normal',
  height: '30px',
  lineHeight: '30px',
  padding: 0
};
const activeStyle = {
  backgroundColor: '#394045',
  color: '#fff'
};
<Tab tabStyle={tabStyle} activeStyle={activeStyle}>
  <TabPanel header="表格" keys="table">
    <Code data={code}></Code>
  </TabPanel>
  <TabPanel header="JSON" keys="json">
    <Code data={code} type="json"></Code>
  </TabPanel>
</Tab>
```