import {STOCK_FAILURE,STOCK_SUCCESS,STOCK_LOADING} from "../../types/stock";


const stocks = (state, { payload, type }) => {
    switch (type) {
        case STOCK_LOADING:
            return {
                ...state,
                loading: true,

            };

        case STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                stocks: payload,
            };

        case STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: "we're fucked",
            };
        default:
            return state;
    }
};

export default stocks;
