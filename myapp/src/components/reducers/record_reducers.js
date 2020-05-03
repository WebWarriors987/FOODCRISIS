import { 
    ALLALUM,
} from "../actions/types";

export default function(state={},action){
    switch(action.type){ 
        case ALLALUM:
            return {...state, all:action.payload }
        
        default:
            return state;
    }
}
