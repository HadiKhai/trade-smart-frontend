import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getStocks} from "../../actions/stock/stocks";
export function useStocks() {

    const dispatch = useDispatch();

    const {stocks,error,loading} = useSelector(
        (state) => ({
            stocks: state.stocks.stocks,
            error: state.stocks.error,
            loading: state.stocks.loading

        }),
        shallowEqual,
    );

    const boundAction1 = useCallback(
        () => {
            return dispatch(getStocks());
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
            stocks,
            loading,
            error,
     getStocks: boundAction1,
        // logout: boundAction2,
        // register: boundAction3,
        // reloadToken: boundAction4
    };
}
