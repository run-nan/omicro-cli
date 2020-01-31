import {withSocket} from '@runnan/react-obvious';
import Hello from '../component/Hello';

export default withSocket(['theme', 'text'])(Hello);
