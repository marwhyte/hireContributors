import * as React from "react";
import UploadFile from "../components/UploadFile";
import ReactJson from "react-json-view";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, setData } from "../actions/data";
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
//Redux
import { connect } from "react-redux";
import { getUser } from "../actions/user";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/AppActions";
import { dataObject, graphData } from "../types/DataObject";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tableData]);
  React.useEffect(() => {
    var parsed = queryString.parse(window.location.search);
    var accessToken: any = parsed.access_token;
    props.getUser(accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

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
      var firstElem: string[] = JSON.parse(noAtSymbol);
      var returnedArray = firstElem.map((elem: string) => {
        if (!elem.includes("testing")) {
          if (elem.includes("/")) {
            return elem.substr(0, elem.indexOf("/"));
          } else {
            return elem;
          }
        }
      });
      const uniqueSet = new Set(returnedArray);
      //@ts-ignore
      const backToArray = [...uniqueSet];
      const noUndefined = backToArray.filter((elem) => elem !== undefined);
      props.getData(noUndefined, token);
      // props.setData();
    } else if (parsedJson.dependencies === "") {
      notifyNoUpload();
    } else {
      notify();
    }
  };
  return (
    <div>
      {!props.isLoading ? (
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
          <a href="https://hirecontributors.club/" className="backtoMarketing">
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              color={"#007bff"}
              size="3x"
            />
            <p style={{ color: "#007bff" }}>Back To Marketing Page</p>
          </a>
          <div className="headerUploadDocument">
            <h1>Upload Your Package.json To Find Candidates</h1>
            <p className="smallTextUpload">
              All of your information is on the client side, none of your data
              is saved.
            </p>
          </div>
          <UploadFile updateJSON={updateJSON} />
          <button className="templateButton click" onClick={gatherData}>
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
                  : {
                      width: 1000,
                      textAlign: "left",
                      padding: 30,
                      fontSize: 12,
                    }
              }
              collapsed={1}
              displayDataTypes={false}
            />
          </div>
        </div>
      ) : (
        <div className="marketing">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <HashLoader
              css={override}
              size={70}
              color={"#8252fa"}
              loading={true}
            />
            <p
              style={{
                color: "#8252fa",
                fontSize: 30,
                paddingTop: 20,
                fontWeight: 700,
              }}
            >
              Finding Contributors
            </p>
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
