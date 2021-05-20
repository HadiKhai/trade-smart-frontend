import axios from "axios";
import {STOCK_API} from "../config";

const axiosStockAPI = axios.create({
    baseURL: STOCK_API
})


export {axiosStockAPI};
