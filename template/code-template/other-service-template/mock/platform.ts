import {createBus} from '@runnan/obvious';
import {Socket} from '@runnan/obvious/lib/Socket';
import createDemo from '../src';
import './index.less';

createBus('global', null, (name: string) => {
    switch(name) {
        case 'demo':
            createDemo();
            break;
        default:
            return Promise.resolve();
    };

    return Promise.resolve();
});

const bus = window.Bus.global;

bus.createSocket('platform', [], (socket: Socket) => {
    socket.initState('theme', 'white', true);
    const switchThemeButton = document.createElement('button');
    switchThemeButton.onclick = () => {
        const currentTheme = socket.getState('theme');
        if (currentTheme === 'white') {
            socket.setState('theme', 'black');
        } else {
            socket.setState('theme', 'white');
        }
    };
});

bus.startApp('demo', {text: 'Hello Omicro'}).then(() => {
    console.log('load demo successfully');
});