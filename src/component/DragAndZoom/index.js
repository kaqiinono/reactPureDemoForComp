import Drag from './Drag';
import DropTarget from './DropTarget';

const DragAndZoom = () => {
    const itemDropped = item => {
        console.log('itemDropped', item);
    };
    return (
        <>
            <Drag dataItem="item">
                <div>这个组件可以拖动</div>
            </Drag>
            <DropTarget onItemDropped={itemDropped}>
                <div>请将组件拖放到这里</div>
            </DropTarget>
        </>
    );
};

export default DragAndZoom;
