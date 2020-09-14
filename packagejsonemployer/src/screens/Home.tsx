import * as React from "react";
import queryString from "query-string";
import "../styles/Home.scss";
import "react-responsive-modal/styles.css";
import Navbar from "../components/Navbar";
import HomeMain from "../components/HomeMain";
import "react-toggle/style.css";
import { ToastContainer } from "react-toastify";
import { copyEmail } from "../functions/copyEmail";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { getUser } from "../actions/user";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/AppActions";
import { dataObject, graphData } from "../types/DataObject";
import { bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router-dom";
// import { dumbyDataGraph } from "../functions/dumbyData";
import { getLocalStorageData } from "../actions/data";
import IsLoading from "../components/IsLoading";

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
    if (!props.authenticated) {
      var parsed = queryString.parse(window.location.search);
      var accessToken: any = parsed.access_token;
      props.getUser(accessToken);
    }
  }, [props]);
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
        window.location.href = "https://hirecontributors.club/";
      } else {
        var parsed = queryString.parse(window.location.search);
        var accessToken: any = parsed.access_token;
        setToken(accessToken);
      }
    }
  }, [props.loading, props.authenticated]);
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
  }, [token, props]);

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
        <IsLoading isLoading={props.isLoading} />
      ) : (
        <HomeMain
          modalInfo={modalInfo}
          dumbData={dumbData}
          whichSelected={whichSelected}
          setWhichSelected={setWhichSelected}
          token={token}
          copyEmail={copyEmail}
          setModalInfo={setModalInfo}
          setOpen={setOpen}
          open={open}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
