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
// import { dumbyDataGraph } from "../functions/dumbyData";
import "../styles/SingleView.scss";

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaxPeople from "../components/MaxPeople";
import PersonProfile from "../components/PersonProfile";

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
  // const [dumbData, setDumbData] = React.useState(props.gridData);
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
    if (!props.authenticated) {
      var parsed = queryString.parse(window.location.search);
      var accessToken: any = parsed.access_token;
      props.getUser(accessToken);
    }
  }, [props]);

  React.useEffect(() => {
    if (!props.loading) {
      if (!props.authenticated) {
        window.location.href = "https://hirecontributors.club/";
      } else {
        var parsed = queryString.parse(window.location.search);
        var accessToken: any = parsed.access_token;
        setToken(accessToken);
      }
    }
  }, [props.loading, props.authenticated]);
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
  }, [token, props]);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="wholeSingleView">
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
        <MaxPeople token={token} />
      ) : (
        <PersonProfile
          personCount={personCount}
          singleInfo={singleInfo}
          setPersonCount={setPersonCount}
        />
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
