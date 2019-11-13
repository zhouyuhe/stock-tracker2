import React, {
  useState,
  useRef,
  useEffect,
  ChangeEventHandler,
  KeyboardEventHandler,
  FC
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchQueryAction } from "../../headline";
import "./Search.css";
import { AppState } from "store";
import { Stock } from "app/redux/actions";
import { updateStockAction } from "app/redux/actions";
import { CompanySymbolData } from "features/headline/redux/actions";
import { SearchBox } from "./SearchBox";

export const Search: FC = () => {
  const dispatch = useDispatch();
  const filteredSymbols = useSelector(
    (state: AppState) => state.headlineData.selectedCompanySymbols
  );
  const { name: companyName, symbol: companySymbol } =
    useSelector((state: AppState) => state.stockData.selectedStock) || {};
  const [isOpen, toggleIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropSelect = useRef<HTMLTableElement>(null);
  const inputSelect = useRef<HTMLInputElement>(null);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value }
  }) => {
    setSearchQuery(value);
    dispatch(updateSearchQueryAction(value));
    toggleIsOpen(value.length > 0);
  };

  const onSubmit: KeyboardEventHandler<HTMLInputElement> = ({
    key,
    currentTarget: { value: symbol }
  }) => {
    const symbolUpper = symbol.toUpperCase();
    if (key === "Enter") {
      const selectedDatum =
        filteredSymbols &&
        filteredSymbols.find(datum => datum.symbol === symbolUpper);
      if (selectedDatum) {
        selectOption({ symbol, name: selectedDatum.name });
      }
    }
  };

  const updateStock = (stock: Stock) => dispatch(updateStockAction(stock));

  const selectOption = (data: Stock) => {
    updateStock(data);
    toggleIsOpen(false);
    if (inputSelect.current) {
      inputSelect.current.blur();
    }
  };

  const handleBlur = () => {
    requestAnimationFrame(() => {
      if (!inputSelect.current || !dropSelect.current) {
        return "error";
      }
      if (
        !inputSelect.current.contains(document.activeElement) &&
        !dropSelect.current.contains(document.activeElement)
      ) {
        toggleIsOpen(false);
      } else {
        inputSelect.current.focus();
      }
    });
  };

  const options = (filteredCompanyData: CompanySymbolData[] | undefined) => {
    if (filteredCompanyData === undefined) {
      // Loading
      return <SearchBox message="Loading..." />;
    }

    if (filteredCompanyData.length === 0) {
      // No search results
      return <SearchBox message="Data not found" />;
    }

    return filteredCompanyData.map(filteredData => (
      <tr onClick={() => selectOption(filteredData)} key={filteredData.symbol}>
        <td>
          <span className="company-symbol__dropdown">
            {filteredData.symbol}
          </span>
        </td>
        <td>
          <span className="company-name__dropdown">{filteredData.name}</span>
          <span className="company-exchange__dropdown">
            {filteredData.exchange}
          </span>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    toggleIsOpen(filteredSymbols !== undefined);
  }, [filteredSymbols]);

  return (
    <>
      <div className="search-bar">
        <input
          id="search-input"
          ref={inputSelect}
          type="text"
          placeholder="Search..."
          className="search-bar__input"
          value={searchQuery}
          onChange={onChange}
          onKeyPress={onSubmit}
          onBlur={handleBlur}
          autoComplete="off"
        />
        {searchQuery && (
          <label htmlFor="search-input">
            <span className="company-name">{companyName}</span>
            <span className="company-symbol">
              {companySymbol && ` (${companySymbol.toUpperCase()})`}
            </span>
          </label>
        )}
      </div>
      <table
        ref={dropSelect}
        className="search-bar__options"
        style={{ display: isOpen ? "block" : "none" }}
        tabIndex={0}
      >
        <tbody>{options(filteredSymbols)}</tbody>
      </table>
    </>
  );
};
