import { MockGenerate } from './mockdata/generate'

const mockGenerate = new MockGenerate()

const template = {
  msgCount: 1,
  name: '石xxxxxx',
  paperReadStatus: 'ENABLE',
  systemMsg: null,
  birth: '2019-11-12',
  updateTime: '2019-11-13 11:11:11',
}
mockGenerate.generateMockByData(template)
