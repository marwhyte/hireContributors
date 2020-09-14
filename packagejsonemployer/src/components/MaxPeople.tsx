import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

interface Props {
  token: string;
}

const MaxPeople: React.FC<Props> = (props: Props) => {
  return (
    <div className="maximumValue">
      <p
        className="packageInfoMoreSingle"
        style={{ fontSize: 25, marginBottom: 40 }}
      >
        <FontAwesomeIcon icon={faArchive} /> You've Gone Through All The
        Possible Connections with this Package.JSON!
      </p>
      <Link
        to={"/home?access_token=" + props.token}
        className="templateButton click"
        style={{ textDecoration: "none", padding: 10 }}
      >
        Favorite Candidates
      </Link>
    </div>
  );
};

export default MaxPeople;
