import * as React from "react";
import Navbar from "../components/Navbar";
import { RouteComponentProps, Link } from "react-router-dom";
import { dataObject, graphData } from "../types/DataObject";
import { getUser } from "../actions/user";
import { getLocalStorageData } from "../actions/data";
import { AppActions } from "../types/AppActions";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import queryString from "query-string";
import { dumbyDataGraph } from "../functions/dumbyData";
import "../styles/SingleView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faUsers,
  faAward,
  faCopy,
  faArchive,
} from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import { NONAME } from "dns";

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

const SingleView: React.FC<Props> = (props: Props) => {
  const [token, setToken] = React.useState("");
  const [dumbData, setDumbData] = React.useState(props.gridData);
  const [reachMax, setReachMax] = React.useState(false);
  const [singleInfo, setSingleInfo] = React.useState<graphData>({
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
  const [personCount, setPersonCount] = React.useState(0);
  React.useEffect(() => {
    const checkLocal = localStorage.getItem("count");
    if (checkLocal === null || checkLocal === undefined) {
      setPersonCount(0);
    } else {
      setPersonCount(Number(checkLocal));
    }
  }, []);
  React.useEffect(() => {
    if (props.gridData) {
      if (personCount <= props.gridData.length - 1)
        setSingleInfo(props.gridData[personCount]);
      else {
        setReachMax(true);
      }
    }
  }, [personCount, props.gridData]);
  React.useEffect(() => {
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
      }
    }
  }, [props.loading]);
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
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const deleteUser = (id: number) => {
    var number = Number(localStorage.getItem("count"));
    const newVal = number === null || number === undefined ? 1 : number + 1;
    localStorage.setItem("count", newVal.toString());
    setPersonCount(personCount + 1);
  };
  const favoriteUser = (id: number) => {
    var newFav = localStorage.getItem("favorites");
    const array =
      newFav === null || newFav === undefined ? [] : JSON.parse(newFav);
    const final = [...array, id];
    localStorage.setItem("count", final.length.toString());
    localStorage.setItem("favorites", JSON.stringify(final));
    setPersonCount(personCount + 1);
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
    <div className="wholeSingleView">
      <Navbar selected={"SingleView"} token={token} />
      {props.isLoading ? (
        <div className="isLoadingHome">
          {" "}
          <HashLoader
            css={override}
            size={50}
            color={"#007bff"}
            loading={props.isLoading}
          />
        </div>
      ) : reachMax ? (
        <div className="maximumValue">
          <p
            className="packageInfoMoreSingle"
            style={{ fontSize: 25, marginBottom: 40 }}
          >
            <FontAwesomeIcon icon={faArchive} /> You've Gone Through All The
            Possible Connections with this Package.JSON!
          </p>
          <Link
            to={"/home?access_token=" + token}
            className="templateButton click"
            style={{ textDecoration: "none", padding: 10 }}
          >
            Favorite Canidates
          </Link>
        </div>
      ) : (
        <div className="spacebetweenSingle">
          <div className="singleView">
            <p className="moreAboutSingle">More about {singleInfo.name}</p>

            {singleInfo.avatarURL !== null && (
              <img
                src={singleInfo.avatarURL}
                alt="Users Github Profile"
                className="profilePictureMoreSingle"
              />
            )}
            <h1 className="moreMainNameSingle">
              {singleInfo.name}
              <span className="locationSingle">{singleInfo.location}</span>
            </h1>
            <div className="moreAllPackageInfoSingle">
              <p className="packageNameMoreBoldSingle">
                Package Info:{" "}
                <span
                  className="packageLinkSingle"
                  onClick={() => window.open(singleInfo.packageRepo, "_blank")}
                >
                  {singleInfo.packageName}
                </span>
              </p>
              <p className="packageNameMoreBoldSingle">
                <span className="stargazersMoreSingle">
                  {singleInfo.starGazers}
                </span>
                <span className="packageInfoMoreSingle"> stargazers</span>
              </p>
              <div className="sameLineSingle">
                <p>
                  <span className="packageNameMoreBoldSingleIf">
                    {" "}
                    Language:{" "}
                  </span>
                </p>
                <p>
                  <span className="packageInfoMoreSingle">
                    {singleInfo.language}
                  </span>
                </p>
              </div>
              <div className="sameLineSingle">
                <FontAwesomeIcon
                  icon={faAward}
                  size="2x"
                  className="awardIconSingle"
                  style={
                    singleInfo.packageRank === 1
                      ? { color: "#FFDF00" }
                      : singleInfo.packageRank === 2
                      ? { color: "	#C0C0C0" }
                      : { color: "#cd7f32" }
                  }
                />
                <p className="packageInfoMoreSingle">
                  contributor #{singleInfo.packageRank}
                </p>
              </div>
            </div>
            <div className="ptagsSingle">
              <p
                className={
                  singleInfo.bio !== null ? "infoPTagSingle" : "displayNone"
                }
              >
                <span className="boldMore">Bio:</span>
                {singleInfo.bio}
              </p>
              <p
                className={
                  singleInfo.company !== null ? "infoPTagSingle" : "displayNone"
                }
              >
                Company: {singleInfo.company}
              </p>
              {singleInfo.hireable ? (
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
                    onClick={() => window.open(singleInfo.githubURL, "_blank")}
                  >
                    {singleInfo.login}
                  </span>
                </p>
                <p className="followerMarginSingle">
                  <span className="boldMoreSingle">
                    <FontAwesomeIcon icon={faUsers} className="usersIcon" />
                    Followers:
                  </span>
                  {singleInfo.followers}
                </p>

                <p>
                  <span className="boldMore">
                    <FontAwesomeIcon icon={faUsers} className="usersIcon" />
                    Following:
                  </span>
                  {singleInfo.following}
                </p>
              </div>
              <p
                onClick={() =>
                  singleInfo.name !== null && goToLinkedIn(singleInfo.name)
                }
                className="loginInfoMoreSingle"
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: 1.1,
                  marginTop: 40,
                  marginBottom: 70,
                }}
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn Search
              </p>
            </div>
          </div>

          <div className="buttonsSingleView">
            <button
              className="templateButtonRed click"
              onClick={() => {
                deleteUser(singleInfo.id);
              }}
            >
              <FontAwesomeIcon icon={faCopy} /> Remove
            </button>
            <button
              onClick={() => {
                favoriteUser(singleInfo.id);
              }}
              className="templateButton click"
            >
              {" "}
              <FontAwesomeIcon icon={faCopy} /> Favorite
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleView);
