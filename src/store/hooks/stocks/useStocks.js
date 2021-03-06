import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getStocks} from "../../actions/stock/stocks";
import {getOwnStocks} from "../../actions/stock/ownStocks";
export function useStocks() {

    const dispatch = useDispatch();

    const {stocks,error,loading,ownStocks} = useSelector(
        (state) => ({
            stocks: state.stocks.stocks,
            error: state.stocks.error,
            loading: state.stocks.loading,
            ownStocks: state.stocks.ownStocks
        }),
        shallowEqual,
    );

    const boundAction1 = useCallback(
        () => {
            return dispatch(getStocks());
        },
        [dispatch],
    );

    const boundAction2 = useCallback(
        ()=> {
            return dispatch(getOwnStocks());
        }
    )
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
            getOwnStocks:boundAction2,
            ownStocks
        // logout: boundAction2,
        // register: boundAction3,
        // reloadToken: boundAction4
    };
}
