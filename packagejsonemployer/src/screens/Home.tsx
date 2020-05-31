import * as React from "react";
import queryString from "query-string";
import "../styles/Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Navbar from "../components/Navbar";

//redux
import { connect } from "react-redux";
import { getUser } from "../actions/user";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/AppActions";
import { dataObject, graphData } from "../types/DataObject";
import { bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { dumbyDataGraph } from "../functions/dumbyData";

interface DispatchProps {}

type StateProps = {
  authenticated: boolean;
  loading: boolean;
  name?: string;
  profilePic?: string;
  data?: dataObject[];
  gridData?: graphData[];
};

interface OwnProps extends RouteComponentProps<any> {
  getUser: typeof getUser;
}

type Props = DispatchProps & StateProps & OwnProps;

const Home = (props: Props) => {
  const [token, setToken] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState<graphData>({
    id: 0,
    name: "sample",
    packageName: "sample",
    company: "sample",
    avatarURL: "sample",
    followers: 52,
    following: 8,
    bio: "sample",
    hireable: null,
  });
  const [dumbData, setDumbData] = React.useState(dumbyDataGraph);
  React.useEffect(() => {
    console.log("graphdata", props.gridData);
    var parsed = queryString.parse(window.location.search);
    var accessToken: any = parsed.access_token;
    props.getUser(accessToken);
  }, []);
  React.useEffect(() => {
    if (!props.loading) {
      if (!props.authenticated) {
        props.history.push("/login");
      } else {
        var parsed = queryString.parse(window.location.search);
        var accessToken: any = parsed.access_token;
        setToken(accessToken);
        if (props.data) {
        }
      }
    }
  }, [props.loading]);

  return (
    <div>
      <Navbar selected={"Home"} token={token} />
      <div className="home">
        <h1>home page</h1>
        {dumbData ? (
          <div className="wholeGrid">
            {dumbData.map((person) => (
              <div className="personContainer">
                <div className="person">
                  <img
                    src={person.avatarURL}
                    alt="Users Github Profile"
                    className="profilePicture"
                  />
                  <h1>{person.name}</h1>
                  <p>{person.bio}</p>
                  <p>
                    <FontAwesomeIcon
                      icon={faBoxOpen}
                      style={{ marginRight: 5 }}
                    />
                    {person.packageName}
                  </p>
                  <p>{person.company}</p>
                </div>
                <div className="personButtons">
                  <button
                    className="infoButton"
                    onClick={() => {
                      setModalInfo(person);
                      setOpen(true);
                    }}
                  >
                    More Info
                  </button>
                  <button className="inbox">
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>loading table</p>
        )}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          center
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
          }}
        >
          <p className="moreAbout">More about {modalInfo.name}</p>

          {modalInfo.avatarURL !== null && (
            <img
              src={modalInfo.avatarURL}
              alt="Users Github Profile"
              className="profilePictureMore"
            />
          )}
          <h1 className="moreMainName">
            {modalInfo.name}
            <span className="location">{modalInfo.location}</span>
          </h1>
          <div className="moreAllPackageInfo">
            <p className="packageNameMoreBold">
              Package Info:{" "}
              <span
                className="packageLink"
                onClick={() => window.open(modalInfo.githubURL, "_blank")}
              >
                {modalInfo.packageName}
              </span>
              <span className="stargazersMore">{modalInfo.starGazers}</span>
              {"  "} <span className="packageInfoMore"> stargazers</span>
              {"  "} <span className="stargazersMore"> Language: </span>
              <span className="packageInfoMore">{modalInfo.language}</span>
            </p>

            <FontAwesomeIcon
              icon={faAward}
              size="2x"
              className="awardIcon"
              style={
                modalInfo.packageRank === 1
                  ? { color: "#FFDF00" }
                  : modalInfo.packageRank === 2
                  ? { color: "	#C0C0C0" }
                  : { color: "#cd7f32" }
              }
            />
            <p className="packageInfoMore">
              contributor #{modalInfo.packageRank}
            </p>
          </div>
          <div className="ptags">
            <p className={modalInfo.bio !== null ? "infoPTag" : "displayNone"}>
              <span className="boldMore">Bio:</span>
              {modalInfo.bio}
            </p>
            <p
              className={
                modalInfo.company !== null ? "infoPTag" : "displayNone"
              }
            >
              Company: {modalInfo.company}
            </p>
            {modalInfo.hireable ? (
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
                  onClick={() => window.open(modalInfo.githubURL, "_blank")}
                >
                  {modalInfo.login}
                </span>
              </p>
              <p className="followerMargin">
                <span className="boldMore">
                  <FontAwesomeIcon icon={faUsers} className="usersIcon" />
                  Followers:
                </span>
                {modalInfo.followers}
              </p>

              <p>
                <span className="boldMore">
                  <FontAwesomeIcon icon={faUsers} className="usersIcon" />
                  Following:
                </span>
                {modalInfo.following}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  const authenticated = state.user.authenticated;
  const name = state.user.name;
  const profilePic = state.user.profilePicture;
  const data = state.data.data;
  const loading = state.user.loading;
  const gridData = state.data.gridData;
  return {
    authenticated,
    name,
    profilePic,
    data,
    loading,
    gridData,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: OwnProps
): DispatchProps => ({
  getUser: bindActionCreators(getUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
