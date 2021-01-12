import { useState, useEffect} from 'react';
import { Tree } from 'antd';

const treeData = [
  {
    title: '0',
    key: '0',
    children: [
      {
        title: '0-0',
        key: '0-0',
        children: [
          { title: '0-0-0', key: '0-0-0' },
          { title: '0-0-1', key: '0-0-1' },
          { title: '0-0-2', key: '0-0-2' },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          { title: '0-1-0', key: '0-1-0' },
          { title: '0-1-1', key: '0-1-1' },
          { title: '0-1-2', key: '0-1-2' },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ],
  }
];

const OverView = () => {
  const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState(['0-0']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('checkedKeys', [...info.halfCheckedKeys, ...checkedKeys]);
    // setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info.halfCheckedKeys);
    setSelectedKeys(selectedKeys);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};

export default OverView;
