import * as React from "react";
import UploadFile from "../components/UploadFile";
import ReactJson from "react-json-view";
import { ToastContainer, toast } from "react-toastify";
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
};

interface OwnProps extends RouteComponentProps<any> {}

type Props = DispatchProps & StateProps & OwnProps;

const Jsonupload = (props: Props) => {
  const [jsonSource, setJsonSource] = React.useState("");
  const [parsedJson, setParsedJson] = React.useState({ dependencies: "" });
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    if (props.tableData) {
      props.history.push(`/home?access_token=${token}`);
    }
  }, [props.tableData]);
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
  const updateJSON = (text: string) => {
    setJsonSource(text);
    setParsedJson(JSON.parse(text));
  };
  const notifyNoUpload = () =>
    toast.error("👮 Upload your package.JSON first!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify = () =>
    toast.error("👮 Must be Package.json with dependencies", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const gatherData = () => {
    if (
      parsedJson.dependencies !== "" &&
      parsedJson.dependencies !== undefined
    ) {
      const stringedDependencies = JSON.stringify(
        Object.getOwnPropertyNames(parsedJson.dependencies)
      );
      var noAtSymbol = stringedDependencies.replace(/@/g, "");
      props.getData(JSON.parse(noAtSymbol), token);
      // props.setData();
    } else if (parsedJson.dependencies === "") {
      notifyNoUpload();
    } else {
      notify();
    }
  };
  return (
    <div className="jsonupload">
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
      <h1>Upload Your Package.json!</h1>
      <UploadFile updateJSON={updateJSON} />
      <button className="btn-hover color-3" onClick={gatherData}>
        Submit
      </button>
      <div className="transition">
        <ReactJson
          src={jsonSource !== "" ? JSON.parse(jsonSource) : {}}
          iconStyle="triangle"
          theme="railscasts"
          enableClipboard={false}
          style={
            jsonSource === ""
              ? { display: "none" }
              : { width: 1000, textAlign: "left", padding: 30, fontSize: 12 }
          }
          collapsed={1}
          displayDataTypes={false}
        />
      </div>
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
  return {
    authenticated,
    name,
    profilePic,
    loading,
    data,
    tableData,
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
