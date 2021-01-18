import Mock, {Random} from 'mockjs'
import mapImage from '../public/images/house.jpg'

export default [
  {
    url: '/nav/map',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: mapImage
      }
    }
  }
]