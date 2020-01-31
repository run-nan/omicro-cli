import {createBus} from '@runnan/obvious';
import {Socket} from '@runnan/obvious/lib/socket'; // eslint-disable-line
import './index.less';

createBus('global', null, async (name: string) => {
    switch (name) {
    case 'demo':
        const module = await import('../src');
        const createDemo = module.default;
        createDemo();
        break;
    default:
        await Promise.resolve();
    };
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
    switchThemeButton.innerHTML = 'Switch theme';
    document.getElementById('platform').appendChild(switchThemeButton);
});

bus.startApp('demo', {text: 'Hello Omicro'}).then(() => {
    console.log('load demo successfully');
});
