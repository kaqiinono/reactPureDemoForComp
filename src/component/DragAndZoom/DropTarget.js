// eslint-disable-next-line react/prop-types
const DropTarget = ({ onItemDropped, children, dropEffect }) => {
    const dragOver = e => {
        const ev = e;
        ev.preventDefault();
        // 添加效果
        ev.dataTransfer.dropEffect = dropEffect;
    };

    const dragEnter = ev => {
        ev.dataTransfer.dropEffect = dropEffect;
    };

    const drop = ev => {
        const droppedItem = ev.dataTransfer.getData('drag-item');
        if (droppedItem) {
            onItemDropped(droppedItem);
        }
    };

    return (
        <div onDragOver={dragOver} onDrop={drop} onDragEnter={dragEnter}>
            {children}
        </div>
    );
};
DropTarget.defaultProps = {
    dropEffect: 'all' // 设置默认的效果
};
export default DropTarget;
