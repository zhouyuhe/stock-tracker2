import React from "react";
import "./Loading.css";

type LoadingProps = {
  loaded: boolean;
  render: () => JSX.Element;
};
export const Loading = ({ loaded, render }: LoadingProps) => {
  if (!loaded) {
    return (
      <div className="center-spinner">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  return render();
};
