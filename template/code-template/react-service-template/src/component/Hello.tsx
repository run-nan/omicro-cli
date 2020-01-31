import React, {useEffect} from 'react';

type Props = {
    text: string,
    theme: string
}

const Hello: React.FunctionComponent<Props> = (props) => {
    const style = {
        fontSize: '5rem',
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

export default Hello;
