import {STOCK_OWN_FAILURE,STOCK_OWN_SUCCESS,STOCK_OWN_LOADING} from "../../types/stock";


const ownStocks = (state, { payload, type }) => {
    switch (type) {
        case STOCK_OWN_LOADING:
            return {
                ...state,
                loading: true,

            };

        case STOCK_OWN_SUCCESS:
            return {
                ...state,
                loading: false,
                ownStocks: payload,
            };

        case STOCK_OWN_FAILURE:
            return {
                ...state,
                loading: false,
                error: "we're fucked",
            };
        default:
            return state;
    }
};

export default ownStocks;
