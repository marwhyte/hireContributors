import * as React from "react";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

interface Props {}

const FindingContributors: React.FC<Props> = (props: Props) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div className="marketing">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <HashLoader css={override} size={70} color={"#8252fa"} loading={true} />
        <p
          style={{
            color: "#8252fa",
            fontSize: 30,
            paddingTop: 20,
            fontWeight: 700,
          }}
        >
          Finding Contributors
        </p>
      </div>
    </div>
  );
};

export default FindingContributors;
