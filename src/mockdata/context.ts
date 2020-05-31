import Mock from 'mockjs'
import * as Dot from '../dotprop/dotprop'
import consola from 'consola'

export class MockContext {
  static getInstance(): MockContext {
    if (this._instance == null) {
      this._instance = new MockContext()
    }

    return this._instance
  }
  private static _instance: MockContext

  globalData = {}

  globalDistData = {}

  init() {
    this.globalData = {}
    const _this = this
    ;(Mock.Random as any).extend({
      global(key, type: string) {
        let wrapperkey = 'value'
        let wrapperValue = _this.getGlobalData(key)

        if (!wrapperValue) {
          return ''
        }

        if (!type) {
          wrapperkey = 'value'
        } else if (type.toUpperCase() === 'ONE') {
          wrapperkey = `value|1`
        } else if (type.toUpperCase() === 'ANY') {
          wrapperValue = _this.getRandomArrayElements(
            _this.getGlobalData(key),
            _this.getRandom(0, _this.getGlobalData(key).length)
          )
        } else if (type.toUpperCase() === 'SOME') {
          wrapperValue = _this.getRandomArrayElements(
            _this.getGlobalData(key),
            _this.getRandom(1, _this.getGlobalData(key).length)
          )
        } else if (type.toUpperCase() === 'ALL') {
          wrapperkey = 'value'
          // tslint:disable-next-line: ban
        } else if (!isNaN(parseInt(type, 10))) {
          wrapperkey = `value|${type}`
        }
        const wrapperTemp = {}
        wrapperTemp[wrapperkey] = wrapperValue
        const wrapperObj = Mock.mock(wrapperTemp)
        return wrapperObj.value
      },
    })
    ;(Mock.Random as any).extend({
      lookup(lookupType, type: string) {
        let wrapperkey = 'value'
        let wrapperValue = _this.getDistData(lookupType)
        if (!wrapperValue && type.toUpperCase() === 'ANY') {
          return ''
        } else if (!wrapperValue && type.toUpperCase() === 'SOME') {
          return []
        }

        if (type && type.toUpperCase() === 'ANY') {
          wrapperValue = _this
            .getRandomArrayElements(
              _this.getDistData(lookupType),
              _this.getRandom(0, _this.getDistData(lookupType).length)
            )
            .map((lookupValue) => {
              return lookupValue.code
            })
        } else if (!type || type.toUpperCase() === 'ONE') {
          wrapperkey = 'value|1'
          wrapperValue = _this
            .getRandomArrayElements(
              _this.getDistData(lookupType),
              _this.getRandom(1, 1)
            )
            .map((lookupValue) => {
              return lookupValue.code
            })
        }
        const wrapperTemp = {}
        wrapperTemp[wrapperkey] = wrapperValue
        const wrapperObj = Mock.mock(wrapperTemp)
        return wrapperObj.value
      },
    })
    ;(Mock.Random as any).extend({
      lookupMeaning(lookupCode, lookupType?) {
        // 获取数据对应的值
        const keys = Object.keys(_this.globalDistData)
        if (!lookupType) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < keys.length; i++) {
            const lookUpValues = _this.globalDistData[keys[i]]
            const lookupValue = (lookUpValues as any).find((lookUpValue) => {
              return lookUpValue.code === lookupCode
            })
            if (lookupValue) {
              return lookupValue.meaning
            }
          }
        } else {
          const lookUpValues = _this.globalDistData[lookupType]
          const lookupValue = (lookUpValues as any).find((lookUpValue) => {
            return lookUpValue.code === lookupCode
          })
          if (lookupValue) {
            return lookupValue.meaning
          }
          if (lookupValue) {
            return lookupValue.meaning
          }
        }

        return lookupCode
      },
    })
  }

  registerGlobalData(key, value) {
    Dot.set(this.globalData, key, value)
  }

  clearGlobalData(key) {
    Dot.remove(this.globalData, key)
  }

  getGlobalData(key) {
    return Dot.get(this.globalData, key)
  }

  registerDistData(lookUpType, lookUpValues) {
    Dot.set(this.globalDistData, lookUpType, lookUpValues)
  }

  clearDistData(lookUpType) {
    return Dot.remove(this.globalDistData, lookUpType)
  }

  getDistData(lookUpType) {
    return Dot.get(this.globalDistData, lookUpType)
  }

  private getRandomArrayElements(arr, count) {
    if (!arr) {
      arr = []
      return arr
    }
    // tslint:disable-next-line: one-variable-per-declaration
    const shuffled = arr.slice(0)
    let i = arr.length
    const min = i - count
    let temp
    let index
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(min)
  }

  private getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }
}
