import * as React from "react";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

interface Props {
  isLoading: boolean;
}

const IsLoading: React.FC<Props> = (props: Props) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div className="isLoadingHome">
      {" "}
      <HashLoader
        css={override}
        size={50}
        color={"#8252fa"}
        loading={props.isLoading}
      />
    </div>
  );
};

export default IsLoading;
