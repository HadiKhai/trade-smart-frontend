import login from "./login";
import logout from "./logout"
import register from "./register"

import initialState from "./initialState";

const reducers = [login,logout,register];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }

    return reducers.reduce((s, r) => r(s, action), newState);
}
