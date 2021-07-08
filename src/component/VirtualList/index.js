import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './index.scss';

// 可视区域高度固定 screenHeight
// 列表每项高度固定 itemSize
// 列表数据 visibleData
// 当前滚动位置 scrollTop

// 列表总高度 listHeight = visibleData.length * itemSize
// 可显示的列表项数 visibleCount = Math.ceil(screenHeight / itemSize)
// 数据的起始索引 startIndex = Math.floor(scrollTop / itemSize)
// 数据的结束索引 endIndex = startIndex + visibleCount
// 列表显示数据为 visibleData = visibleData.slice(startIndex,endIndex)
// 偏移量 startOffset = scrollTop - (scrollTop % itemSize);
const FIXED_HEIGHT = 190;
const BUFFER_SIZE = 3;
const VirtualList = ({ dataSource }) => {
    const scroller = useRef();
    const [dom, setDom] = useState({
        start: 0,
        end: null
    });

    const calItemScrollY = list => {
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            item.scrollY = i * FIXED_HEIGHT;
            Object.freeze(item);
        }
        return list;
    };

    const getVisibleCount = () => {
        return Math.ceil(scroller.current.offsetHeight / FIXED_HEIGHT);
    };

    useEffect(() => {
        setDom({
            ...dom,
            end: getVisibleCount() + BUFFER_SIZE
        });
        calItemScrollY(dataSource);
    }, [dataSource]);

    const handleScroll = e => {
        // 滚动差值
        const { scrollTop } = scroller.current;
        const start = Math.floor(scrollTop / FIXED_HEIGHT);
        setDom({
            ...dom,
            start,
            end: getVisibleCount() + BUFFER_SIZE + start
        });
    };

    return (
        <div className="height-fixed" ref={scroller} onScroll={handleScroll}>
            <div className="height-fixed__scroll-runway" style={{ transform: `translate(0, ${dataSource.length * FIXED_HEIGHT}px)` }} />
            {dataSource &&
                dataSource.slice(dom.start, dom.start + dom.end).map((data, index) => <Card key={data.name} data={data} index={index} />)}
        </div>
    );
};
VirtualList.propTypes = {
    dataSource: PropTypes.array.isRequired
};
export default VirtualList;
