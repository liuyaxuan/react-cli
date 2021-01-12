// @flow
import { useContext, useState, useImperativeHandle, useEffect} from 'react';
import { Row, Col, Card } from 'antd';
// scss
import './index.scss'

/**
 * 首页内容渲染
 * @returns
 */

const OverView = (props) => {
  const [loading, setLoading] = useState(false); // 加载动画
  const [pixelWidth, setPixelWidth] = useState(1366); // 设置初始化页面宽度

  useEffect(() => {
    // 初始化页面设置容器宽，计算卡片显示行数和每行个数
    setPixelWidth(document.getElementsByClassName('card-box')[0].clientWidth)
    // 监听窗口大小，根据窗口宽度变化动态设置卡片显示行数和每行个数
    window.onresize = function () {
      setPixelWidth(document.getElementsByClassName('card-box')[0].clientWidth)
    }
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
    // cardsNum 表示页面中需要展示的cards总数
    const cardsNum = 100;
    return (
      <div className="card-box" style={{ width: '100%', minWidth: '220px', height: 'calc(100% - 54px)', overflowY: 'auto' }}>
        <Card className="cards" title="Card title 1" bordered={false} hoverable>
          Card content 1
        </Card>
        <Card className="cards" title="Card title 1" bordered={false} hoverable>
          Card content 2
        </Card>
        <Card className="cards" title="Card title 1" bordered={false} hoverable>
          Card content 3
        </Card>
      </div>
    )
  }

  return (
      renderCards()
  );
};

export default OverView;
