import {Socket} from '@runnan/obvious/lib/socket'; // eslint-disable-line
import './index.less';

type configType = {
    text: string
};

const bus = window.Bus.global;

const main = () => {
    bus.createSocket('demo', ['theme'], (socket: Socket, config: configType)=> {
        const title = document.createElement('h1');
        title.innerHTML = config.text;
        document.body.appendChild(title);
        const changeTheme = (theme: string) => {
            if (theme === 'white') {
                document.body.style.backgroundColor = 'white';
                title.style.color = 'black';
            } else {
                document.body.style.backgroundColor = 'black';
                title.style.color = 'white';
            }
        };
        changeTheme(socket.getState('theme'));
        socket.watchState('theme', changeTheme);
    });
};

// do not run createSocket directly in dev mode
if (process.env.NODE_ENV !== 'development') {
    main();
}

export default main;
