import * as React from "react";
import { Modal } from "react-responsive-modal";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { goToLinkedIn } from "../functions/goToLinkedIn";
import { graphData } from "../types/DataObject";

interface Props {
  open: boolean;
  modalInfo: graphData;
  setModalInfo: React.Dispatch<React.SetStateAction<graphData>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      center
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
      }}
    >
      <p className="moreAbout">More about {props.modalInfo.name}</p>

      {props.modalInfo.avatarURL !== null && (
        <img
          src={props.modalInfo.avatarURL}
          alt="Users Github Profile"
          className="profilePictureMore"
        />
      )}
      <h1 className="moreMainName">
        {props.modalInfo.name}
        <span className="location">{props.modalInfo.location}</span>
      </h1>
      <div className="moreAllPackageInfo">
        <p className="packageNameMoreBold">
          Package Info:{" "}
          <span
            className="packageLink"
            onClick={() => window.open(props.modalInfo.packageRepo, "_blank")}
          >
            {props.modalInfo.packageName}
          </span>
          <span className="stargazersMore">{props.modalInfo.starGazers}</span>
          {"  "} <span className="packageInfoMore"> stargazers</span>
          {"  "} <span className="stargazersMore"> Language: </span>
          <span className="packageInfoMore">{props.modalInfo.language}</span>
        </p>

        <FontAwesomeIcon
          icon={faAward}
          size="2x"
          className="awardIcon"
          style={
            props.modalInfo.packageRank === 1
              ? { color: "#FFDF00" }
              : props.modalInfo.packageRank === 2
              ? { color: "	#C0C0C0" }
              : { color: "#cd7f32" }
          }
        />
        <p className="packageInfoMore">
          contributor #{props.modalInfo.packageRank}
        </p>
      </div>
      <div className="ptags">
        <p
          className={props.modalInfo.bio !== null ? "infoPTag" : "displayNone"}
        >
          <span className="boldMore">Bio:</span>
          {props.modalInfo.bio}
        </p>
        <p
          className={
            props.modalInfo.company !== null ? "infoPTag" : "displayNone"
          }
        >
          Company: {props.modalInfo.company}
        </p>
        {props.modalInfo.hireable ? (
          <p className="infoPTag">Hireable: Yes</p>
        ) : (
          <div className="displayNone"></div>
        )}
        <div className="followers">
          <p className="followerMargin">
            <span className="boldMore">
              <FontAwesomeIcon icon={faGithub} className="usersIcon" />
              Github Profile:
            </span>
            <span
              className="loginInfoMore"
              onClick={() => window.open(props.modalInfo.githubURL, "_blank")}
            >
              {props.modalInfo.login}
            </span>
          </p>
          <p className="followerMargin">
            <span className="boldMore">
              <FontAwesomeIcon icon={faUsers} className="usersIcon" />
              Followers:
            </span>
            {props.modalInfo.followers}
          </p>

          <p>
            <span className="boldMore">
              <FontAwesomeIcon icon={faUsers} className="usersIcon" />
              Following:
            </span>
            {props.modalInfo.following}
          </p>
        </div>
        <p
          onClick={() =>
            props.modalInfo.name !== null && goToLinkedIn(props.modalInfo.name)
          }
          className="loginInfoMoreSingle"
          style={{
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.1,
            marginTop: 20,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn Search
        </p>
      </div>
    </Modal>
  );
};

export default PersonModal;
