import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {login} from "../../actions/auth/login";
import {logout} from "../../actions/auth/logout";
import {register} from "../../actions/auth/register";
import {token} from "../../actions/auth/token";
export function useAuth() {

    const dispatch = useDispatch();

    const {id,error,loading} = useSelector(
        (state) => ({
            id: state.auth.id,
            error: state.auth.error,
            loading: state.auth.loading

        }),
        shallowEqual,
    );

    const boundAction1 = useCallback(
        (data) => {
            return dispatch(login(data));
        },
        [dispatch],
    );

    const boundAction2 = useCallback(
        () => {
            return dispatch(logout());
        },
        [dispatch],
    )

    const boundAction3 = useCallback(
        (data) => {
            return dispatch(register(data));
        },
        [dispatch],
    )

    const boundAction4 = useCallback(
        () => {
            return dispatch(token());
        },[dispatch]
    )

    return {
        id,
        loading,
        error,
        login: boundAction1,
        logout: boundAction2,
        register: boundAction3,
        reloadToken: boundAction4
    };
}
