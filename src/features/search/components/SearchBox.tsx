import React, { FC } from "react";

type SearchBoxProps = {
  message: string;
};
export const SearchBox: FC<SearchBoxProps> = ({ message }) => {
  return (
    <tr>
      <td>
        <span className="company-name__dropdown">{message}</span>
      </td>
    </tr>
  );
};
