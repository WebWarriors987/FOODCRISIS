import axios from 'axios';
import {
    ALLALUM,
} from './types';

import { RECORD_SERVER } from '../utils/misc';

export function alllist(){
    const request = axios.get(`${RECORD_SERVER}/allalum`)
        .then(response => response.data);
    
    return {
        type: ALLALUM,
        payload: request
    }
}

