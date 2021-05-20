import {LOGOUT_USER} from "../../types/auth";

export const logout = () => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch({
        type: LOGOUT_USER,
    });
};
