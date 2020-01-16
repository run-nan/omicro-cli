import {Socket} from '@runnan/obvious/lib/Socket'; // eslint-disable-line

type configType = {
    text: string
};

const bus = window.Bus.global;

bus.createSocket('helloOmicro', [], (socket: Socket, config: configType)=> {
    const title = document.getElementById('title'); 
    title.innerHTML = config.text;
});
