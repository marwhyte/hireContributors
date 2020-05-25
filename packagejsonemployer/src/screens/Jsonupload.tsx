import * as React from "react";
import UploadFile from "../components/UploadFile";
import ReactJson from "react-json-view";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../functions/getData";
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { getUser } from "../actions/user";
import { User } from "../types/User";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { UserActions } from "../types/UserActions";
import { bindActionCreators } from "redux";

interface DispatchProps {
  getUser: typeof getUser;
}

type StateProps = {
  authenticated: boolean;
  name?: string;
  profilePic?: string;
};

interface OwnProps extends RouteComponentProps<any> {}

type Props = DispatchProps & StateProps & OwnProps;

const Jsonupload = (props: Props) => {
  const [jsonSource, setJsonSource] = React.useState("");
  const [parsedJson, setParsedJson] = React.useState({ dependencies: "" });
  React.useEffect(() => {
    var parsed = queryString.parse(window.location.search);
    var accessToken: any = parsed.access_token;
    getUser(accessToken);
    // if (!props.isAuthorized) {
    //   props.history.push("/login");
    // }
  });
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
      getData(JSON.parse(noAtSymbol));
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
  return {
    authenticated,
    name,
    profilePic,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, UserActions>,
  ownProps: OwnProps
): DispatchProps => ({
  getUser: bindActionCreators(getUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jsonupload);
