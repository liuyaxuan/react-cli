// @flow
import { useContext, useState, useImperativeHandle, useEffect} from 'react';
import { Row, Col, Card, Skeleton } from 'antd';
import { useHistory } from 'react-router-dom'

// 请求
import { getPoster } from '../../../utils/api';

// scss
import './index.scss'

/**
 * 首页内容渲染
 * @returns
 */

const OverView = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false); // 加载动画
  const [pixelWidth, setPixelWidth] = useState(1366); // 设置初始化页面宽度
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    // 初始化页面设置容器宽，计算卡片显示行数和每行个数
    setPixelWidth(document.getElementsByClassName('card-box')[0].clientWidth)
    // 监听窗口大小，根据窗口宽度变化动态设置卡片显示行数和每行个数
    window.onresize = function () {
      setPixelWidth(document.getElementsByClassName('card-box')[0].clientWidth)
    }

    // 获取全部caards
    setLoading(true);
    getPoster('get', '/overview/cards', {pid: 123, uid:456}).then(res => {
      setLoading(false)
      setCardsData(res);
    }).catch(err => {
      setLoading(false);
    })
  }, [])

  /**
   * @function {*}
   * 当 pixelWidth 值发生变化时，重新计算页面卡片排列
   */
  useEffect(() => {
    renderCards(pixelWidth);
  }, [pixelWidth])

  /**
   * 根据传入参数计算卡片排列 (计量单位: px)
   * @param {*} pixel_width 
   */
  function renderCards(pixel_width) {
    // 点击卡片路由跳转
    function handleJump (data) {
      // history.push(data.path);
    }
    return (
      <div className="card-box">
        <Skeleton loading={loading} active>
          {
            cardsData && cardsData.map((item, index) => (
              <Card
                className="cards"
                key={ index }
                title={item.title}
                bordered={true}
                hoverable
                size="small"
                bodyStyle={{ fontSize: '12px' }}
                onClick={()=> { handleJump(item) }}
              >
                { item.content }
              </Card>
            ))
          }
        </Skeleton>
      </div>
    )
  }

  return (
      renderCards()
  );
};

export default OverView;
