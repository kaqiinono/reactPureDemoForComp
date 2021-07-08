import { useEffect, useRef, useState } from 'react';
import './index.scss';
import VirtualList from '../VirtualList';
import { fetchData } from './util';

// 可视区域高度固定 screenHeight
// 列表每项高度固定 itemSize
// 列表数据 listData
// 当前滚动位置 scrollTop

// 列表总高度 listHeight = listData.length * itemSize
// 可显示的列表项数 visibleCount = Math.ceil(screenHeight / itemSize)
// 数据的起始索引 startIndex = Math.floor(scrollTop / itemSize)
// 数据的结束索引 endIndex = startIndex + visibleCount
// 列表显示数据为 visibleData = listData.slice(startIndex,endIndex)
// 偏移量 startOffset = scrollTop - (scrollTop % itemSize);

const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(fetchData());
    }, []);
    return <VirtualList dataSource={data} />;
};

export default App;
