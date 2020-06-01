import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faMagic } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.scss";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
  `;

  return (
    <div className="login">
      <div className="wholeForm">
        <div className="sameLine">
          <h1>Package.JSON Employer</h1>
          <FontAwesomeIcon
            icon={faMagic}
            size="5x"
            color="white"
            style={{ marginLeft: "20px" }}
          />
        </div>
        {!loading ? (
          <a
            href="https://jsonbackend.herokuapp.com/auth/login"
            className="loginButton"
            onClick={() => {
              setLoading(true);
            }}
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              color="black"
              style={{ marginLeft: "20px" }}
            />{" "}
            Github Login
          </a>
        ) : (
          <div className="sweet-loading">
            <HashLoader
              css={override}
              size={40}
              color={"#FFFFFF"}
              loading={loading}
            />
          </div>
        )}
      </div>
      <div className="loginFooter">
        <div className="footer">
          <div
            className="footertogether"
            onClick={() =>
              window.open(
                "https://github.com/marwhyte/spotifysuggester",
                "_blank"
              )
            }
          >
            <FontAwesomeIcon className="rotate" icon={faGithub} size="2x" />
            <p>Created By Marco Whyte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
