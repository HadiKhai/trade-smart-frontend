import {LOGIN_SUCCESS} from "../../types/auth";

export const token = () => (dispatch) => {
    const token = localStorage.id;
    if(token) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: localStorage.id,
        });
    }
};
