import * as React from "react";
import "../styles/NavBar.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearchLocation,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
interface Props {
  selected: string;
  token: string;
}

const Navbar: React.FC<Props> = (props: Props) => {
  const [home, setHome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [singleView, setSingleView] = React.useState("");
  React.useEffect(() => {
    setHome("/home?access_token=" + props.token);
    setEmail("/email-template?access_token=" + props.token);
    setSingleView("/find-canidates?access_token=" + props.token);
  }, [props.token]);
  return (
    <div className="nav">
      <div className="logo">
        <p>Hire Contributors</p>
      </div>
      <div className="navElements">
        <Link
          to={home}
          className={props.selected === "Home" ? "selected" : "nothing"}
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link
          to={singleView}
          className={props.selected === "SingleView" ? "selected" : "nothing"}
        >
          <FontAwesomeIcon icon={faSearchLocation} /> Explore candidates
        </Link>
        <Link
          to={email}
          className={
            props.selected === "EmailTemplate" ? "selected" : "nothing"
          }
        >
          <FontAwesomeIcon icon={faEnvelopeOpenText} /> Email Creator
        </Link>
      </div>
      <div className="signOut">
        <a href="https://hirecontributors.club">Sign Out</a>
      </div>
    </div>
  );
};

export default Navbar;
