import {USER_ERROR,USER_LOADING,USER_SUCCESS} from "../../types/user";


const user = (state, { payload, type }) => {
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true,
                error:false
            };

        case USER_SUCCESS:
            const {userName,firstName,lastName,email,balance} = payload
            return {
                ...state,
                loading: false,
                userName,
                firstName,
                lastName,
                email,
                balance,
            };

        case USER_ERROR:
            return {
                ...state,
                loading: false,
                error: "we're fucked",
            };
        default:
            return state;
    }
};

export default user;
