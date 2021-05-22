import {TRADE_FAILURE,TRADE_SUCCESS,TRADE_LOADING} from "../../types/stock";


const trade = (state, { payload, type }) => {
    switch (type) {
        case TRADE_LOADING:
            return {
                ...state,
                loading: true,

            };

        case TRADE_SUCCESS:
            return {
                ...state,
                loading: false,
                trades: payload,
            };

        case TRADE_FAILURE:
            return {
                ...state,
                loading: false,
                error: "we're fucked",
            };
        default:
            return state;
    }
};

export default trade;
