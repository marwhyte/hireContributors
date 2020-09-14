import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, setData } from "../actions/data";
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getUser } from "../actions/user";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/AppActions";
import { dataObject, graphData } from "../types/DataObject";
import { bindActionCreators } from "redux";

import BeforeGetInfo from "../components/BeforeGetInfo";
import FindingContributors from "../components/FindingContributors";

interface DispatchProps {
  getUser: typeof getUser;
  getData: typeof getData;
  setData: typeof setData;
}

type StateProps = {
  authenticated: boolean;
  loading: boolean;
  name?: string;
  profilePic?: string;
  data?: dataObject[];
  tableData?: graphData[];
  isLoading: boolean;
};

interface OwnProps extends RouteComponentProps<any> {}

type Props = DispatchProps & StateProps & OwnProps;

const Jsonupload = (props: Props) => {
  const [jsonSource, setJsonSource] = React.useState("");
  const [parsedJson, setParsedJson] = React.useState({ dependencies: "" });
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    if (props.tableData) {
      props.history.push(`/find-canidates?access_token=${token}`);
    }
  }, [props.tableData, props.history, token]);
  React.useEffect(() => {
    if (!props.authenticated) {
      var parsed = queryString.parse(window.location.search);
      var accessToken: any = parsed.access_token;
      props.getUser(accessToken);
      localStorage.removeItem("favorites");
      localStorage.removeItem("count");
      localStorage.removeItem("packageRepo");
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

  const updateJSON = (text: string) => {
    setJsonSource(text);
    setParsedJson(JSON.parse(text));
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!props.isLoading ? (
        <BeforeGetInfo
          parsedJson={parsedJson}
          token={token}
          updateJSON={updateJSON}
          jsonSource={jsonSource}
          getData={props.getData}
        />
      ) : (
        <FindingContributors />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  const authenticated = state.user.authenticated;
  const name = state.user.name;
  const profilePic = state.user.profilePicture;
  const loading = state.user.loading;
  const data = state.data.data;
  const tableData = state.data.gridData;
  const isLoading = state.data.isLoading;
  return {
    authenticated,
    name,
    profilePic,
    loading,
    data,
    tableData,
    isLoading,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: OwnProps
): DispatchProps => ({
  getUser: bindActionCreators(getUser, dispatch),
  getData: bindActionCreators(getData, dispatch),
  setData: bindActionCreators(setData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jsonupload);
