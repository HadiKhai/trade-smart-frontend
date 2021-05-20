import {REGISTER_ERROR,REGISTER_LOADING,REGISTER_SUCCESS} from "../../types/auth";


const auth = (state, { payload, type }) => {
    switch (type) {
        case REGISTER_LOADING:
            return {
                ...state,
                loading:true
            };
        case REGISTER_ERROR:
            return {
                ...state,
                error: payload,
                loading:false
            };

        case REGISTER_SUCCESS:{
            return {
                ...state,
                loading:false
            }
        }
        default:
            return state;
    }
};

export default auth;
