import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "e29082a36f0453d236c23083";
const API_BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

interface CurrencyState {
  amount: number;
  baseCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CurrencyState = {
  amount: 1,
  baseCurrency: "USD",
  targetCurrency: "PHP",
  exchangeRate: 1,
  status: "idle",
};

// Fetch exchange rate based on selected currencies
export const fetchExchangeRate = createAsyncThunk(
  "currency/fetchExchangeRate",
  async (_, { getState }) => {
    const state = getState() as { currency: CurrencyState };
    const { baseCurrency, targetCurrency } = state.currency;
    
    const response = await axios.get(`${API_BASE_URL}/pair/${baseCurrency}/${targetCurrency}`);
    return response.data.conversion_rate;
  }
);

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
    setTargetCurrency: (state, action: PayloadAction<string>) => {
      state.targetCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.status = "idle";
        state.exchangeRate = action.payload;
      })
      .addCase(fetchExchangeRate.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setAmount, setBaseCurrency, setTargetCurrency } = currencySlice.actions;
export default currencySlice.reducer;
