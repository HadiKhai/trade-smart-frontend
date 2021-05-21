import {LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS} from "../../types/auth";


const login = (state, { payload, type }) => {
    switch (type) {
        case LOGIN_LOADING:
            return {
                ...state,
                error: false,
                loading: true,

            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                id: payload,
                error:"",
            };

        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export default login;
