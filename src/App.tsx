import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./index.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux"; //Manages global state for currency conversion.
import { RootState, store } from "./redux/store";
import {
  setAmount,
  setBaseCurrency,
  setTargetCurrency,
  fetchExchangeRate,
} from "./redux/currencySlice"; //Dispatches actions to update the currency conversion state.
import { fetchCurrencyCodes } from "./api/api";
import { Container } from "react-bootstrap";

function App() {
  const dispatch = useDispatch<typeof store.dispatch>(); // Allows you to send actions to update the Redux store.

  const { amount, baseCurrency, targetCurrency, exchangeRate } = useSelector(
    (state: RootState) => state.currency
  ); //getting the values from the redux store

  const { data: currencyCodes, isLoading } = useQuery({
    queryKey: ["currencyCodes"],
    queryFn: fetchCurrencyCodes,
  }); //Getting the currency codes and values for the options

  useEffect(() => {
    dispatch(fetchExchangeRate());
  }, [baseCurrency, targetCurrency, dispatch]); // this function is responsible for the conversion

  return (
    <Container>
      <h2>Currency Converter</h2>
      <br />
      {isLoading ? (
        <p>Loading currencies...</p>
      ) : (
        <>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => dispatch(setAmount(Number(e.target.value)))}
            />

            <select
              className="form-control"
              value={baseCurrency}
              onChange={(e) => dispatch(setBaseCurrency(e.target.value))}
            >
              {currencyCodes.map(([code, name]: [string, string]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              value={amount * exchangeRate}
              disabled
            />

            <select
              className="form-control"
              value={targetCurrency}
              onChange={(e) => dispatch(setTargetCurrency(e.target.value))}
            >
              {currencyCodes.map(([code, name]: [string, string]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </Container>
  );
}

export default App;
