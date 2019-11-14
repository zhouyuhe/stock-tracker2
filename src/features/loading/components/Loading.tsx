import React, { FC } from "react";
import "./Loading.css";

type LoadingProps = {
  loaded: boolean;
  render: () => JSX.Element;
};
export const Loading: FC<LoadingProps> = ({ loaded, render }) => {
  if (loaded) {
    return render();
  }

  return (
    <div className="center-spinner">
      <div className="loading-spinner"></div>
    </div>
  );
};
