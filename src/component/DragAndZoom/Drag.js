import { useRef, useState, useEffect } from 'react';
// 样式
const draggingStyle = {
    opacity: 0.25
};

// eslint-disable-next-line react/prop-types
const Drag = ({ dragImage, dropEffect, dataItem, children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const image = useRef(null);

    useEffect(() => {
        image.current = null;
        if (dragImage) {
            image.current = new Image();
            image.current.src = dragImage;
        }
    }, [dragImage]);

    const startDrag = e => {
        const ev = e;
        setIsDragging(true);
        ev.dataTransfer.setData('drag-item', dataItem);
        ev.dataTransfer.effectAllowed = dropEffect;
        if (image.current) {
            ev.dataTransfer.setDragImage(image.current, 0, 0);
        }
    };

    // 拖拽结束时，添加样式
    const dragEnd = () => setIsDragging(false);

    return (
        <div style={isDragging ? draggingStyle : {}} draggable onDragStart={startDrag} onDragEnd={dragEnd}>
            {children}
        </div>
    );
};

Drag.defaultProps = {
    dropEffect: 'all' // 设置默认的效果
};

export default Drag;
