const eventProxy = {
  onObj: {},
  oneObj: {},
  on (key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = []
    }

    this.onObj[key].push(fn)
  },
  one (key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = []
    }

    this.oneObj[key].push(fn)
  },
  off (key) {
    this.onObj[key] = []
    this.oneObj[key] = []
  },
  trigger (...args) {
    if (args.length === 0) {
      return false
    }
    const key = args[0]
    args = [].concat(Array.prototype.slice.call(args, 1))

    if (this.onObj[key] !== undefined
      && this.onObj[key].length > 0) {

      return this.onObj[key].map(fn => {
        return fn.apply(null, args)
      })
    }
    if (this.oneObj[key] !== undefined
      && this.oneObj[key].length > 0) {
      const ret = this.oneObj[key].map(fn => {
        return fn.apply(null, args)
      })
      this.oneObj[key] = []
      return ret
    }
  }
}

export default eventProxy
