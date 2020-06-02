import * as React from "react";
import Navbar from "../components/Navbar";
import { RouteComponentProps } from "react-router-dom";
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
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUsers, faAward } from "@fortawesome/free-solid-svg-icons";

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
  const [dumbData, setDumbData] = React.useState(dumbyDataGraph);
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
  });
  const [personCount, setPersonCount] = React.useState(0);
  React.useEffect(() => {
    setSingleInfo(dumbData[personCount]);
  }, [personCount]);
  // React.useEffect(() => {
  //     var parsed = queryString.parse(window.location.search);
  //     var accessToken: any = parsed.access_token;
  //     props.getUser(accessToken);
  //   }, []);

  //   React.useEffect(() => {
  //     if (!props.loading) {
  //       if (!props.authenticated) {
  //         props.history.push("/login");
  //       } else {
  //         var parsed = queryString.parse(window.location.search);
  //         var accessToken: any = parsed.access_token;
  //         setToken(accessToken);
  //       }
  //     }
  //   }, [props.loading]);
  //   React.useEffect(() => {
  //     const localStorageInfo = localStorage.getItem("packageRepo");
  //     if (props.gridData) {
  //       console.log("Data In Redux Store");
  //     } else if (
  //       token.length !== 0 &&
  //       localStorageInfo !== null &&
  //       localStorageInfo !== undefined
  //     ) {
  //       console.log("Getting Data!");
  //       props.getLocalStorageData(JSON.parse(localStorageInfo), token);
  //     }
  //   }, [token]);

  return (
    <div>
      <Navbar selected={"SingleView"} token={token} />
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
          <span className="location">{singleInfo.location}</span>
        </h1>
        <div className="moreAllPackageInfoSingle">
          <p className="packageNameMoreBoldSingle">
            Package Info:{" "}
            <span
              className="packageLinkSingle"
              onClick={() => window.open(singleInfo.githubURL, "_blank")}
            >
              {singleInfo.packageName}
            </span>
            <span className="stargazersMoreSingle">
              {singleInfo.starGazers}
            </span>
            {"  "} <span className="packageInfoMoreSingle"> stargazers</span>
            {"  "} <span className="stargazersMoreSingle"> Language: </span>
            <span className="packageInfoMoreSingle">{singleInfo.language}</span>
          </p>

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
        </div>
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
