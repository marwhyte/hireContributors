import * as React from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import "../styles/Login.scss";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<any> {}

const Marketing: React.FC<Props> = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.location.href = "https://jsonbackend.herokuapp.com/auth/login";
  });
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
  `;

  return (
    <div className="marketing">
      <HashLoader
        css={override}
        size={70}
        color={"#8252fa"}
        loading={loading}
      />
    </div>
  );
};

export default Marketing;
