import { useEffect, useRef } from 'react';
import './index.scss';
import Test from '../Test';

const consoleText = (targetElement, words, id, colors) => {
    const target = targetElement;
    if (colors === undefined) {
        // eslint-disable-next-line no-param-reassign
        colors = ['#fff'];
    }
    let visible = true;
    const con = document.getElementById('console');
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    target.setAttribute('style', `color:${colors[0]}`);
    window.setInterval(function () {
        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount);
            window.setTimeout(function () {
                const usedColor = colors.shift();
                colors.push(usedColor);
                const usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', `color:${colors[0]}`);
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount);
            letterCount += x;
        }
    }, 120);
    window.setInterval(function () {
        if (visible === true) {
            con.className = 'console-underscore hidden';
            visible = false;
        } else {
            con.className = 'console-underscore';

            visible = true;
        }
    }, 400);
};

const App = () => {
    const showSpanEl = useRef(null);
    useEffect(() => {
        consoleText(showSpanEl.current, ['Hello World.', 'Console Text', 'Made with Love.'], 'text', [
            'tomato',
            'rebeccapurple',
            'lightblue'
        ]);
    });

    return (
        <div className="console-container">
            <span id="text" ref={showSpanEl} />
            <div className="console-underscore" id="console">
                &#95;
            </div>
            <Test name="this is a test" />
        </div>
    );
};

export default App;
