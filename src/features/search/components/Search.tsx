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
import { StockProps } from "../../headline/components/Headline";
import { updateStockAction } from "actions";

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
      const selectedDatum = filteredSymbols.find(
        datum => datum.symbol === symbolUpper
      );
      if (selectedDatum) {
        selectOption({ symbol, name: selectedDatum.name });
      }
    }
  };

  type StockDataProps = {
    name: string;
    symbol: string;
  };

  const updateStock = (stock: StockProps) => dispatch(updateStockAction(stock));

  const selectOption = (data: StockDataProps) => {
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

  const options =
    filteredSymbols.length > 0 ? (
      filteredSymbols.map(data => {
        return (
          <tr onClick={() => selectOption(data)} key={data.symbol}>
            <td>
              <span className="company-symbol__dropdown">{data.symbol}</span>
            </td>
            <td>
              <span className="company-name__dropdown">{data.name}</span>
              <span className="company-exchange__dropdown">
                {data.exchange}
              </span>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td>
          <span className="company-name__dropdown">No symbols found</span>
        </td>
      </tr>
    );

  useEffect(() => {
    toggleIsOpen(filteredSymbols.length !== 0);
  }, [filteredSymbols.length]);

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
        <tbody>{options}</tbody>
      </table>
    </>
  );
};
