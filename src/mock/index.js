import Mock from 'mockjs'

import nav from './nav'
import user_config from './user-config'

const mocks = [
  ...user_config,
  ...nav
]

/**
 * mock请求放在这里统一处理
 */
if (process.env.NODE_ENV === 'development') {
  for (const i of mocks) {
    Mock.mock(i.url, i.type, i.response)
  }
}