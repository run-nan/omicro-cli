import React from 'react';
import ReactDOM from 'react-dom';
import {Manager} from '@runnan/react-obvious';
import {getBus} from '@runnan/obvious';
import {Socket} from '@runnan/obvious/lib/socket'; // eslint-disable-line
import Hello from './component/Hello';

type configType = {
    text: string
};

const bus = getBus('global');

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
if (process.env.NODE_ENV === 'production') {
    main();
}

export default main;
