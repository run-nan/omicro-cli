import React from 'react';
import ReactDOM from 'react-dom';
import {Manager} from '@runnan/react-obvious';
import {Socket} from '@runnan/obvious/lib/socket'; // eslint-disable-line
import Hello from './container/HelloContainer';

type configType = {
    text: string
};

const bus = window.Bus.global;
const main = () => {
    bus.createSocket('demo', ['theme'], (socket: Socket, config: configType)=> {
        socket.initState('text', config.text, true);
        ReactDOM.render((
            <Manager socket={socket}>
                <Hello />
            </Manager>
        ), document.getElementById('demo'));
    });
};

// do not run createSocket directly in dev mode
if (process.env.NODE_ENV !== 'development') {
    main();
}

export default main;
