import * as React from "react";
import "../styles/NavBar.scss";
import { Link } from "react-router-dom";
interface Props {
  selected: string;
  token: string;
}

const Navbar: React.FC<Props> = (props: Props) => {
  const [home, setHome] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setHome("/home?access_token=" + props.token);
    setEmail("/email-template?access_token=" + props.token);
  }, [props.token]);
  return (
    <div className="nav">
      <div className="logo">
        <p>PackageEmployer</p>
      </div>
      <div className="navElements">
        <Link to={home}>Home</Link>
        <Link to={email}>Email Creator</Link>
      </div>
      <div className="signOut">
        <button>Sign Out</button>
      </div>
    </div>
  );
};

export default Navbar;
