import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {user} from "../../actions/user/user";
export function useUser() {

    const dispatch = useDispatch();

    const {userName,firstName,lastName,email,balance,loading,error} = useSelector(
        (state) => ({
            userName: state.user.userName,
            firstName: state.user.firstName,
            lastName:  state.user.lastName,
            email: state.user.email,
            balance: state.user.balance,
            loading: state.user.loading,
            error:state.user.error,
        }),
        shallowEqual,
    );

    const boundAction1 = useCallback(
        (data) => {
            return dispatch(user(data));
        },
        [dispatch],
    );
    return {
        userName,firstName,lastName,email,balance,
        loading,
        error,
        getUserDetails: boundAction1,
    };
}
