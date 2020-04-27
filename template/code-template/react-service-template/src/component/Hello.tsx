import React, {useEffect} from 'react';
import {withSocket} from '@runnan/react-obvious';

type Props = {
    text: string,
    theme: string
}

const HelloComponent: React.FunctionComponent<Props> = (props) => {
    const style = {
        fontSize: '5rem',
        width: '50rem',
        textAlign: 'center' as const,
        margin: '8rem auto',
        color: props.theme === 'white' ? 'black' : 'white'
    };

    useEffect(() => {
        document.body.style.backgroundColor = props.theme;
    }, [props.theme]);

    return (
        <h1 style={style}>{props.text}</h1>
    );
};

const HelloContainer = withSocket(['theme', 'text'])(HelloComponent);

export default HelloContainer;
