// const DragToContainer = () => {
//     function allowDrop(ev) {
//         ev.preventDefault();
//     }
//
//     function drag(ev) {
//         ev.dataTransfer.setData('text', ev.target.id);
//     }
//
//     function drop(ev) {
//         ev.preventDefault();
//         var data = ev.dataTransfer.getData('text');
//         ev.target.appendChild(document.getElementById(data));
//     }
//
//     return (
//         <>
//             <p>Drag the W3Schools image into the rectangle:</p>
//             <div id="div1" onDrop="drop(event)" onDragOver="allowDrop(event)"></div>
//             <img id="drag1" src="img_logo.gif" draggable="true" onDragStart="drag(event)" width="336" height="69" />
//         </>
//     );
// };
