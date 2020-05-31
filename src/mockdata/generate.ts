import { IS_DEV } from '../environment'
import Mock from 'mockjs'
import {
  isArray,
  isDefined,
  isNull,
  isObject,
  isPlainObject,
  isString,
  isUndefined,
  isBase64,
} from 'ts-util-is'
import { isNumber, isBoolean } from 'util'
import consola from 'consola'

export class MockGenerate {
  static getInstance(): MockGenerate {
    if (this._instance == null) {
      this._instance = new MockGenerate()
    }
    return this._instance
  }
  private static _instance: MockGenerate

  generateMock(template) {
    const mockData = Mock.mock(template)
    /* istanbul ignore next line */
    if (IS_DEV) {
      // tslint:disable-next-line:no-console
      console.log(mockData)
    }

    return mockData
  }

  /**
   * 根据数据生成模板
   */
  generateMockByData(data) {
    // 获取对象类型，生成字符串
    const dataKeys = Object.keys(data)
    const template = {}

    dataKeys.forEach((key) => {
      const value = data[key]

      if (this.isDateTimeString(value)) {
        // 日期+时间生成
        template[key] = '@DateTime'
      } else if (this.isDateString(value)) {
        // 日期+时间生成
        template[key] = '@Date'
      } else if (
        isString(value) &&
        `${value}`.toUpperCase().startsWith('@Global'.toUpperCase())
      ) {
        template[key] = value
      } else if (
        isString(value) &&
        `${value}`.toUpperCase().startsWith('@Lookup'.toUpperCase())
      ) {
        template[key] = value
      } else if (isString(value) && this.hasCNString(value)) {
        // 中文生成
        template[key] = `@CWord(${value.length / 3}, ${value.length * 3})`
      } else if (isNull(value)) {
        // jsonnull 转换成字符串
        template[key] = '@String'
      } else if (Number.isInteger(value)) {
        // 整数
        const valueLength = `${value}`.length
        template[key] = `@Integer(${Math.pow(10, valueLength - 3)}, ${Math.pow(
          10,
          valueLength + 3
        )})`
      } else if (isNumber(value)) {
        // 小数
        template[key] = '@Float(10, 10000000, 1, 2)'
      } else if (isObject(value) && !isArray(value)) {
        // 对象
        template[key] = this.generateMockByData(value)
      } else if (isArray(value) && value.length > 0) {
        // 数组
        template[`${key}|1-20`] = [this.generateMockByData(value[0])]
      } else if (isBoolean(value)) {
        // Boolean值
        template[key] = '@Boolean'
      } else if (isString(value) && value.toUpperCase() === value) {
        // 全大写不做处理
        template[key] = value
      } else if (isString(value) && this.isUrl(value)) {
        // url 生成一个图片的url
        template[key] = '@Image'
      } else if (isString(value) && value.toLowerCase() === value) {
        // 全小写生成随机数
        // consola.error(
        //   new RegExp(`[a-z\d]{${value.length - 3}, ${value.length + 3}}`)
        // )
        template[key] = new RegExp(
          `[a-z\\d]{${value.length - 3},${value.length + 3}}`
        )
      } else if (isString(value)) {
        template[key] = `@Word(${value.length / 3},${value.length * 3})`
      } else {
        template[key] = value
      }
    })

    return template
  }

  isDateString(value) {
    return /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}/.test(value)
  }

  isDateTimeString(value) {
    return /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/.test(
      value
    )
  }

  hasCNString(value) {
    return /.*[\u4e00-\u9fa5]+.*$/.test(value)
  }

  isUrl(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(value)
  }
}
