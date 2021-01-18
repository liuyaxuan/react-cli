import { useState, useEffect} from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

// 请求
import { getPoster } from '../../../utils/api';
// scss
import './index.scss'

const Map = (props) => {
  const [canvas_width, setCanvas_width] = useState(0); // 画布宽
  const [canvas_height, setCanvas_height] = useState(0); // 画布高
  // --------------------------------------------------------------
  const [map_width, setMap_width] = useState(0); // 地图宽
  const [map_height, setMap_height] = useState(0); // 地图高
  // --------------------------------------------------------------
  const [map_img, setMap_img] = useState(null);
  const [mapX, setMapX] = useState(0);
  const [mapY, setMapY] = useState(0);

  useEffect(() => {
    // 画布大小
    setCanvas_width(document.getElementById('konva-map').clientWidth);
    setCanvas_height(document.getElementById('konva-map').clientHeight);
    return () => {
      
    }
  }, [])

  // 获取地图
  const initMap = () => {
    // 获取地图
    getPoster('get', '/nav/map', {pid: 123, uid:456}).then(res => {
      setMap_img(res)
    })
  }

  const BaseMapImage = () => {
    // 初始化地图
    initMap();
    const [image] = useImage(map_img);
    // 计算获取到的地图大小进行缩放
    let ww, hh = 0;
    if (image) {
      ww = (image.width * canvas_height) / image.height;
      hh = canvas_height;
    }
    return <Image image={image} width={ww} height={hh} x={mapX} y={mapY} />;
  };

  return (
    <div id="konva-map">
      <Stage width={ canvas_width } height={ canvas_height }>
        <Layer>
          <BaseMapImage />
        </Layer>
      </Stage>
    </div>
  );
};

export default Map;