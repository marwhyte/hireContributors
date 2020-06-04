import * as React from "react";
import queryString from "query-string";
import "../styles/Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faHeart,
  faSearchLocation,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Navbar from "../components/Navbar";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//redux
import { connect } from "react-redux";
import { getUser } from "../actions/user";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/AppActions";
import { dataObject, graphData } from "../types/DataObject";
import { bindActionCreators } from "redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { dumbyDataGraph } from "../functions/dumbyData";
import { getLocalStorageData } from "../actions/data";

interface DispatchProps {}

type StateProps = {
  authenticated: boolean;
  loading: boolean;
  name?: string;
  profilePic?: string;
  data?: dataObject[];
  gridData?: graphData[];
  isLoading: boolean;
};

interface OwnProps extends RouteComponentProps<any> {
  getUser: typeof getUser;
  getLocalStorageData: typeof getLocalStorageData;
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
    packageRepo: "sample",
  });
  const [whichSelected, setWhichSelected] = React.useState(true);
  const [dumbData, setDumbData] = React.useState(props.gridData);
  React.useEffect(() => {
    console.log("graphdata", props.gridData);
    var parsed = queryString.parse(window.location.search);
    var accessToken: any = parsed.access_token;
    props.getUser(accessToken);
    // localStorage.removeItem("favorites")
    // localStorage.removeItem("count")
  }, []);
  React.useEffect(() => {
    if (props.gridData) {
      if (whichSelected) {
        const localIds = localStorage.getItem("favorites");
        if (localIds !== null && localIds !== undefined) {
          const parsedFavorites = JSON.parse(localIds);
          const filtered = props.gridData.filter((element) =>
            parsedFavorites.includes(element.id)
          );
          setDumbData(filtered);
        } else {
          setDumbData([]);
        }
      } else {
        setDumbData(props.gridData);
      }
    }
  }, [props.gridData, whichSelected]);
  React.useEffect(() => {
    if (!props.loading) {
      if (!props.authenticated) {
        props.history.push("/login");
      } else {
        var parsed = queryString.parse(window.location.search);
        var accessToken: any = parsed.access_token;
        setToken(accessToken);
      }
    }
  }, [props.loading]);
  React.useEffect(() => {
    if (whichSelected) {
    }
  }, [whichSelected, props.gridData]);
  React.useEffect(() => {
    const localStorageInfo = localStorage.getItem("packageRepo");
    if (props.gridData) {
      console.log("Data In Redux Store");
    } else if (
      token.length !== 0 &&
      localStorageInfo !== null &&
      localStorageInfo !== undefined
    ) {
      console.log("Getting Data!");
      props.getLocalStorageData(JSON.parse(localStorageInfo), token);
    }
  }, [token]);
  React.useEffect(() => {
    console.log("this", props.gridData);
  }, [props.gridData]);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const copyEmail = (canidateName: string, canidatePackage: string) => {
    var email = localStorage.getItem("emailTemplate");
    if (email === null || email === undefined) {
      const defaultString = `Hello ${canidateName},\n I noticed your work at ${canidatePackage} and was impressed, would you be interested in having a conversion about possible careers? If so, reach out!\nSincerely`;
      toast.warning(
        "⚠️ Using Default Email Template, it is recommended to create your own Template!",
        {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      toast.success("📧Template email with canidate info copied to clipboard", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigator.clipboard.writeText(defaultString);
    } else {
      const packageReplace = email.replace(/{{PACKAGENAME}}/g, canidatePackage);
      const nameReplace = packageReplace.replace(/{{NAME}}/g, canidateName);
      navigator.clipboard.writeText(nameReplace);
      toast.success(
        "📧Your Customized Email with canidate info was copied to clipboard",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  const goToLinkedIn = (name: string) => {
    const nameArray = name.split(" ");
    if (nameArray.length === 1) {
      const link = `https://www.linkedin.com/search/results/all/?keywords=${nameArray[0]}`;
      window.open(link, "_blank");
    } else {
      const link = `https://www.linkedin.com/search/results/all/?keywords=${nameArray[0]}%20${nameArray[1]}`;
      window.open(link, "_blank");
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontSize: 14 }}
      />
      <Navbar selected={"Home"} token={token} />
      {props.isLoading ? (
        <div className="isLoadingHome">
          {" "}
          <HashLoader
            css={override}
            size={50}
            color={"#9932cc"}
            loading={props.isLoading}
          />
        </div>
      ) : (
        <div className="home">
          {dumbData && dumbData.length > 0 ? (
            <div style={{ width: "55%", marginLeft: "auto" }}>
              <div className="togetherToggle">
                <label>
                  <Toggle
                    className="myToggle"
                    defaultChecked={whichSelected}
                    icons={{
                      checked: (
                        <FontAwesomeIcon color={"white"} icon={faHeart} />
                      ),
                      unchecked: null,
                    }}
                    onChange={() => setWhichSelected((boolean) => !boolean)}
                  />
                </label>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 500,
                    color: "#333333",
                    lineHeight: 1.1,
                    fontSize: 20,
                    paddingLeft: 10,
                    paddingBottom: 2,
                  }}
                >
                  {whichSelected ? "My Favorites" : "All"}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ width: "55%", marginLeft: "auto" }}>
                <div className="togetherToggle">
                  <label>
                    <Toggle
                      className="myToggle"
                      defaultChecked={whichSelected}
                      icons={{
                        checked: (
                          <FontAwesomeIcon color={"white"} icon={faHeart} />
                        ),
                        unchecked: null,
                      }}
                      onChange={() => setWhichSelected((boolean) => !boolean)}
                    />
                  </label>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 500,
                      color: "#333333",
                      lineHeight: 1.1,
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingBottom: 2,
                    }}
                  >
                    {whichSelected ? "My Favorites" : "All"}
                  </p>
                </div>
              </div>
              <div className="maximumValue">
                <p
                  className="packageInfoMoreSingle"
                  style={{ fontSize: 25, marginBottom: 40 }}
                >
                  <FontAwesomeIcon icon={faSearchLocation} /> You haven't
                  Favorited anyone yet, find potential canidates using the easy
                  to use explore feature <br></br> or view all with the Toggle
                  Above
                </p>
                <Link
                  to={"/find-canidates?access_token=" + token}
                  className="templateButton click"
                  style={{ textDecoration: "none", padding: 10 }}
                >
                  Explore Canidates
                </Link>
              </div>
            </div>
          )}

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
                    <p style={{ maxHeight: 37, overflow: "hidden" }}>
                      {person.bio && person.bio.length >= 77
                        ? person.bio.substring(0, 70) + " ..."
                        : person.bio}
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faBoxOpen}
                        style={{ marginRight: 5 }}
                      />
                      {person.packageName}
                    </p>
                    <div className="RankingHome">
                      <FontAwesomeIcon
                        icon={faAward}
                        size="2x"
                        className="awardIcon"
                        style={
                          person.packageRank === 1
                            ? { color: "#FFDF00" }
                            : person.packageRank === 2
                            ? { color: "	#C0C0C0" }
                            : { color: "#cd7f32" }
                        }
                      />
                      <p className="packageInfoMore">
                        contributor #{person.packageRank}
                      </p>
                    </div>
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
                    <button
                      className="inbox"
                      onClick={() =>
                        copyEmail(
                          person.name !== null
                            ? person.name
                            : "SomethingWentWrong",
                          person.packageName
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faEnvelopeOpenText} /> Copy Email
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
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
                  onClick={() => window.open(modalInfo.packageRepo, "_blank")}
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
              <p
                className={modalInfo.bio !== null ? "infoPTag" : "displayNone"}
              >
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
              <p
                onClick={() =>
                  modalInfo.name !== null && goToLinkedIn(modalInfo.name)
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
        </div>
      )}
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
  const isLoading = state.data.isLoading;
  return {
    authenticated,
    name,
    profilePic,
    data,
    loading,
    gridData,
    isLoading,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: OwnProps
): DispatchProps => ({
  getUser: bindActionCreators(getUser, dispatch),
  getLocalStorageData: bindActionCreators(getLocalStorageData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
