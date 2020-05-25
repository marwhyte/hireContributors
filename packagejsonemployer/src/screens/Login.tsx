import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faMagic } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.scss";
interface Props {}

const Login: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
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

        <a
          href="https://jsonbackend.herokuapp.com/auth/login"
          className="loginButton"
          onClick={() => {
            setLoading(true);
          }}
        >
          Github Login
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            color="white"
            style={{ marginLeft: "20px" }}
          />
        </a>
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
