import {LOGOUT_USER} from "../../types/auth";


const logout = (state, { payload, type }) => {
    switch (type) {
        case LOGOUT_USER:
            return {
                ...state,
                loading:false,
                error: "",
                id: "",
            };

        default:
            return state;
    }
};

export default logout;
