export default {
  dataMap: {},
  set (formKey, data) {
    this.dataMap[formKey] = data
  },
  setByItemKey (formKey, key, data) {
    this.dataMap[formKey][key] = data
  },
  get (formKey) {
    return this.dataMap[formKey] || {}
  },
  getByItemKey (formKey, key) {
    return this.dataMap[formKey][key] || {}
  },
  clear () {
    this.dataMap = {}
  }
}
