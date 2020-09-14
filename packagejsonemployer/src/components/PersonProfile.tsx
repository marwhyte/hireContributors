import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faUsers,
  faAward,
  faEnvelopeOpenText,
  faTimes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { graphData } from "../types/DataObject";
import { copyEmail } from "../functions/copyEmail";
import { goToLinkedIn } from "../functions/goToLinkedIn";

interface Props {
  singleInfo: graphData;
  personCount: number;
  setPersonCount: React.Dispatch<React.SetStateAction<number>>;
}

const PersonProfile: React.FC<Props> = (props: Props) => {
  const deleteUser = (id: number) => {
    var number = Number(localStorage.getItem("count"));
    const newVal = number === null || number === undefined ? 1 : number + 1;
    localStorage.setItem("count", newVal.toString());
    props.setPersonCount(props.personCount + 1);
  };
  const favoriteUser = (id: number) => {
    var newFav = localStorage.getItem("favorites");
    const array =
      newFav === null || newFav === undefined ? [] : JSON.parse(newFav);
    const final = [...array, id];
    localStorage.setItem("count", final.length.toString());
    localStorage.setItem("favorites", JSON.stringify(final));
    props.setPersonCount(props.personCount + 1);
  };
  return (
    <div className="spacebetweenSingle">
      <div className="singleView">
        <p className="moreAboutSingle">More about {props.singleInfo.name}</p>

        {props.singleInfo.avatarURL !== null && (
          <img
            src={props.singleInfo.avatarURL}
            alt="Users Github Profile"
            className="profilePictureMoreSingle"
          />
        )}
        <h1 className="moreMainNameSingle">
          {props.singleInfo.name}
          <span className="locationSingle">{props.singleInfo.location}</span>
        </h1>
        <div className="moreAllPackageInfoSingle">
          <p className="packageNameMoreBoldSingle">
            Package Info:{" "}
            <span
              className="packageLinkSingle"
              onClick={() =>
                window.open(props.singleInfo.packageRepo, "_blank")
              }
            >
              {props.singleInfo.packageName}
            </span>
          </p>
          <p className="packageNameMoreBoldSingle">
            <span className="stargazersMoreSingle">
              {props.singleInfo.starGazers}
            </span>
            <span className="packageInfoMoreSingle"> stargazers</span>
          </p>
          <div className="sameLineSingle">
            <p>
              <span className="packageNameMoreBoldSingleIf"> Language: </span>
            </p>
            <p>
              <span className="packageInfoMoreSingle">
                {props.singleInfo.language}
              </span>
            </p>
          </div>
          <div className="sameLineSingle">
            <FontAwesomeIcon
              icon={faAward}
              size="2x"
              className="awardIconSingle"
              style={
                props.singleInfo.packageRank === 1
                  ? { color: "#FFDF00" }
                  : props.singleInfo.packageRank === 2
                  ? { color: "	#C0C0C0" }
                  : { color: "#cd7f32" }
              }
            />
            <p className="packageInfoMoreSingle">
              contributor #{props.singleInfo.packageRank}
            </p>
          </div>
        </div>
        <div className="ptagsSingle">
          <p
            className={
              props.singleInfo.bio !== null ? "infoPTagSingle" : "displayNone"
            }
          >
            <span className="boldMore">Bio:</span>
            {props.singleInfo.bio}
          </p>
          <p
            className={
              props.singleInfo.company !== null
                ? "infoPTagSingle"
                : "displayNone"
            }
          >
            Company: {props.singleInfo.company}
          </p>
          {props.singleInfo.hireable ? (
            <p className="infoPTagSingle">Hireable: Yes</p>
          ) : (
            <div className="displayNoneSingle"></div>
          )}
          <div className="followersSingle">
            <p className="followerMarginSingle">
              <span className="boldMoreSingle">
                <FontAwesomeIcon icon={faGithub} className="usersIcon" />
                Github Profile:
              </span>
              <span
                className="loginInfoMoreSingle"
                onClick={() =>
                  window.open(props.singleInfo.githubURL, "_blank")
                }
              >
                {props.singleInfo.login}
              </span>
            </p>
            <p className="followerMarginSingle">
              <span className="boldMoreSingle">
                <FontAwesomeIcon icon={faUsers} className="usersIcon" />
                Followers:
              </span>
              {props.singleInfo.followers}
            </p>

            <p>
              <span className="boldMore">
                <FontAwesomeIcon icon={faUsers} className="usersIcon" />
                Following:
              </span>
              {props.singleInfo.following}
            </p>
          </div>
          <p
            onClick={() =>
              props.singleInfo.name !== null &&
              goToLinkedIn(props.singleInfo.name)
            }
            className="loginInfoMoreSingle"
            style={{
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 1.1,
              marginTop: 40,
            }}
          >
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn Search
          </p>
          <button
            className="inboxSingle"
            onClick={() =>
              copyEmail(
                props.singleInfo.name !== null
                  ? props.singleInfo.name
                  : "SomethingWentWrong",
                props.singleInfo.packageName
              )
            }
          >
            <FontAwesomeIcon icon={faEnvelopeOpenText} /> Copy Email
          </button>
        </div>
      </div>

      <div className="buttonsSingleView">
        <button
          className="templateButtonRed click"
          onClick={() => {
            deleteUser(props.singleInfo.id);
          }}
        >
          <FontAwesomeIcon icon={faTimes} /> Remove
        </button>
        <button
          onClick={() => {
            favoriteUser(props.singleInfo.id);
          }}
          className="templateButton click"
        >
          {" "}
          <FontAwesomeIcon icon={faHeart} /> Favorite
        </button>
      </div>
    </div>
  );
};

export default PersonProfile;
