import { IS_DEV } from '../environment'
import consola from 'consola'
import Mock from 'mockjs'
import {
  isArray,
  isDefined,
  isNull,
  isObject,
  isPlainObject,
  isString,
  isUndefined,
} from 'ts-util-is'
import dayjs from 'dayjs'
import { isNumber } from 'util'

export class MockGenerate {
  generateMock() {
    const mockData = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|1-10': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1,
          'name|1-3': 'heidi ',
        },
      ],
    })
    /* istanbul ignore next line */
    if (IS_DEV) {
      // tslint:disable-next-line:no-console
      console.log(mockData)
    }

    return mockData
  }

  /**
   * 生成模板
   */
  generateMockByData(data) {
    // 获取对象类型，生成字符串
    const dataKeys = Object.keys(data)
    const template = {}

    dataKeys.forEach((key) => {
      if (this.isDateTimeString(data[key])) {
        template[key] = '@DateTime'
      } else if (this.isDateString(data[key])) {
        template[key] = '@Date'
      } else if (isString(data[key]) && this.hasCNString(data[key])) {
        template[key] = `@CWord(${data[key].length / 3}, ${data[key].length *
          3})`
      } else if (isNull(data[key])) {
        template[key] = '@String'
      } else if (isNull(data[key])) {
        template[key] = '@String'
      } else if (isNumber(data[key])) {
        template[key] = '@Float(10, 10000, 1, 2)'
      }
    })

    consola.success(JSON.stringify(Mock.mock(template)))
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
}
