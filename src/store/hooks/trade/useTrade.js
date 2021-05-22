import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getTrades} from "../../actions/trade/trade";
export function useTrade() {

    const dispatch = useDispatch();

    const {trades,error,loading} = useSelector(
        (state) => ({
            trades: state.trade.trades,
            error: state.trade.error,
            loading: state.trade.loading

        }),
        shallowEqual,
    );

    const boundAction1 = useCallback(
        () => {
            return dispatch(getTrades())
        },
        [dispatch],
    );

    // const boundAction2 = useCallback(
    //     () => {
    //         return dispatch(logout());
    //     },
    //     [dispatch],
    // )
    //
    // const boundAction3 = useCallback(
    //     (data) => {
    //         return dispatch(register(data));
    //     },
    //     [dispatch],
    // )

    // const boundAction4 = useCallback(
    //     () => {
    //         return dispatch(token());
    //     },[dispatch]
    // )

    return {
        trades,
        loading,
        error,
        getTrade: boundAction1,
        // logout: boundAction2,
        // register: boundAction3,
        // reloadToken: boundAction4
    };
}
