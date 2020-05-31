import { MockGenerate } from './mockdata/generate'
import { MockContext } from './mockdata/context'

import consola from 'consola'
import Mock from 'mockjs'

const mockGenerate = MockGenerate.getInstance()

const template = {
  checkInStatus: true,
  taskIsDone: false,
  dayMarker: '2020-05-30',
  isToday: 'NOW',
  taskList: [
    {
      rowId: '5DBDEWAXW6JTWEE6BQFCQITNZHNG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: '82b20677bca85008',
      taskTitle: 'Mock 数据处理',
      taskSos: 'DISABLE',
      taskLevel: 'NORMAL',
      taskStatus: 'PROCESSING',
      taskType: 'PERSONAL',
      taskTypeMeaning: '个人',
      taskNo: 67013,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '-',
      taskSosDemo: '@Lookup(LOOKUP_STATUS)',
      taskSosDemoMeaning: '@LookupMeaning(@taskSosDemo)',
    },
    {
      rowId: 'O6N4OIWXQ3TFQJ4YYVQHO3JO2DNG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: '94340219a560772f',
      taskTitle: '本次迭代未完成事项统计',
      taskEndDate: '2020-05-29',
      taskStartDate: '2020-05-29',
      taskSos: 'DISABLE',
      taskLevel: 'URGENT',
      taskWorkHour: 0.5,
      taskStatus: 'PROCESSING',
      taskType: 'PRJ',
      taskTypeMeaning: '项目',
      taskNo: 67009,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '已超期1天',
    },
    {
      rowId: 'R2W5BYJC37PG2W5F2E4WMWQNDHNG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: '928ec9e7b3ca1738',
      taskTitle: '核心组件-人员显示组件开发',
      taskEndDate: '2020-05-28',
      taskStartDate: '2020-05-28',
      taskSos: 'DISABLE',
      taskLevel: 'NORMAL',
      taskWorkHour: 2.0,
      taskStatus: 'PROCESSING',
      taskType: 'PRJ',
      taskTypeMeaning: '项目',
      taskNo: 65605,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '已超期2天',
    },
    {
      rowId: 'P772QN6BOS5WDSOZNZBJHMTZM7NG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: 'b2baa15a96618c99',
      taskTitle: '周五-内部评审问题',
      taskSos: 'DISABLE',
      taskLevel: 'NORMAL',
      taskStatus: 'PROCESSING',
      taskType: 'PERSONAL',
      taskTypeMeaning: '个人',
      taskNo: 67008,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '-',
    },
    {
      rowId: 'N6WG5CRZSJOQAAAQJLA2UUXR4LNG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: 'ab2d6bb2af187b13',
      taskTitle: '完成官网cm命令，并产出commitlint配置文档',
      taskSos: 'DISABLE',
      taskLevel: 'NORMAL',
      taskStatus: 'PROCESSING',
      taskType: 'PERSONAL',
      taskTypeMeaning: '个人',
      taskNo: 65754,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '-',
    },
    {
      rowId: 'QBSCZEWDXFCNCXEQHFFDYS4FQDNG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: 'b317093b954bf31a',
      taskTitle: 'ele200说明文档添加 ',
      taskSos: 'DISABLE',
      taskLevel: 'NORMAL',
      taskStatus: 'PROCESSING',
      taskType: 'PERSONAL',
      taskTypeMeaning: '个人',
      taskNo: 66621,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '-',
    },
    {
      rowId: 'GUC5XV62DLGAZHKSFYCFJI4M77NG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: 'b5f98eaca7099690',
      taskTitle: '公司内部-生产招聘系统，选人组件数据丢失问题',
      taskEndDate: '2020-05-26',
      taskStartDate: '2020-05-26',
      taskSos: 'DISABLE',
      taskLevel: 'NORMAL',
      taskWorkHour: 8.0,
      taskStatus: 'PROCESSING',
      taskType: 'PRJ',
      taskTypeMeaning: '项目',
      taskNo: 65720,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '已超期4天',
    },
    {
      rowId: 'QHED6FLGY6UJOX3XZPOKLZ4E3TNG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: '95d452ce113d5e8c',
      taskTitle: '更新技术设计文档到语雀和文档库',
      taskSos: 'DISABLE',
      taskLevel: 'NORMAL',
      taskStatus: 'PROCESSING',
      taskType: 'PERSONAL',
      taskTypeMeaning: '个人',
      taskNo: 65751,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '-',
    },
    {
      rowId: 'XX55DNQQEEZRTZHS6Q67RYWY2TNG7VBALMFXKPWTQPV62F6KRPBA',
      taskId: '9bf3ed6f41bb61ed',
      taskTitle: '应用脚手架中增加nomalize.css',
      taskSos: 'DISABLE',
      taskLevel: 'NORMAL',
      taskStatus: 'PROCESSING',
      taskType: 'PERSONAL',
      taskTypeMeaning: '个人',
      taskNo: 65749,
      dayMarker: '2020-05-30',
      userId: 'ac0396814bc0908f',
      taskDateStatus: '-',
    },
  ],
  workSummary: {
    workHourTotal: 10.5,
    wrokTaskTotal: 9,
    hourSummary: [
      { type: '未完成', value: 10.5 },
      { type: '已完成', value: 0 },
    ],
    taskSummary: [
      { type: '市场任务', value: 0 },
      { type: '项目任务', value: 3 },
      { type: '周期任务', value: 0 },
      { type: '个人任务', value: 6 },
    ],
    finishProcessing: 0.0,
  },
  isScanMarket: true,
  remindTime: '12:30',
  remindStatus: 'DISABLE',
  userId: '@Global(USERIDS, SOME)',
}

MockContext.getInstance().init()

MockContext.getInstance().registerGlobalData('USERIDS', [
  '168',
  '169',
  '170',
  '171',
])

MockContext.getInstance().registerDistData('LOOKUP_STATUS', [
  {
    code: 'DISABLE',
    meaning: '禁用',
  },
  {
    code: 'ENABLE',
    meaning: '启用',
  },
])

const tmpl = mockGenerate.generateMockByData(template)

const data = mockGenerate.generateMock(tmpl)

consola.log(Mock.mock(data))
