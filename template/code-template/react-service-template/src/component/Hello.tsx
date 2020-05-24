import React, {useEffect} from 'react';
import {withSocket} from '@runnan/react-obvious';
import styles from './Hello.less';

type Props = {
    text: string,
    theme: string
}

const HelloComponent: React.FunctionComponent<Props> = ({theme, text}) => {
    const style = {
        color: theme === 'white' ? 'black' : 'white'
    };

    useEffect(() => {
        document.body.style.backgroundColor = theme;
    }, [theme]);

    return (
        <h1 style={style} className={styles.hello}>{text}</h1>
    );
};

const HelloContainer = withSocket(['theme', 'text'])(HelloComponent);

export default HelloContainer;
