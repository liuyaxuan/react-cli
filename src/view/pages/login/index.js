import { useState, useEffect} from 'react';

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
    <div>测试测试</div>
  );
};

export default OverView;
