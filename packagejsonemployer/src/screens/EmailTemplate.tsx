import * as React from "react";
import "../styles/EmailTemplate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import queryString from "query-string";
import { getUser } from "../actions/user";
import { RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/AppActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import Navbar from "../components/Navbar";

interface DispatchProps {
  getUser: typeof getUser;
}

type StateProps = {
  authenticated: boolean;
  loading: boolean;
};
interface OwnProps extends RouteComponentProps<any> {}

type Props = DispatchProps & StateProps & OwnProps;

const EmailTemplate: React.FC<Props> = (props: Props) => {
  const [content, setContent] = React.useState(
    "use {{NAME}} as the canadates name placeholder and {{PACKAGENAME}} as the placeholder for the package the canidate worked on."
  );
  const [textValue, setTextValue] = React.useState(
    " Hello {{NAME}},\n I noticed your work at {{PACKAGENAME}} and was impressed, would you be interested in having a conversion about possible careers? If so, reach out!\nSincerely"
  );
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    var parsed = queryString.parse(window.location.search);
    var accessToken: any = parsed.access_token;
    props.getUser(accessToken);
  }, []);
  React.useEffect(() => {
    if (!props.loading) {
      if (!props.authenticated) {
        window.location.href = "https://hirecontributors.club/";
      } else {
        var parsed = queryString.parse(window.location.search);
        var accessToken: any = parsed.access_token;
        setToken(accessToken);
        const emailTemplate = localStorage.getItem("emailTemplate");
        if (emailTemplate !== undefined && emailTemplate !== null) {
          setTextValue(emailTemplate);
        }
      }
    }
  }, [props.loading]);

  const setText = (e: string) => {
    setTextValue(e);
  };
  const templateSaved = () =>
    toast.success("✔️ Email Template Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const saveTemplateToLocal = () => {
    localStorage.setItem("emailTemplate", textValue);
  };
  return (
    <div className="width100">
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
      <Navbar selected={"EmailTemplate"} token={token} />
      <div className="containerEmailCreator">
        <p className="emailCreatorTo">
          <span style={{ color: "#999" }}>To:</span> Find a contact method for
          the potentials candidate
        </p>
        <p className="emailCreatorTo">
          <span style={{ color: "#999" }}>Instructions:</span> {content}
        </p>
        <p className="emailCreatorTo">
          <span style={{ color: "#999" }}>Tips:</span> <br></br>-The canidate
          name and package name buttons allows you to fully customize the email
          to your canadate, any line break formatting will be saved! <br></br>
          -Once finished save the template using the{" "}
          <span style={{ color: "#08960f", fontWeight: 700, fontSize: 17 }}>
            Save Template
          </span>{" "}
          button! <br></br>-Your template will save even if you sign out, your
          template is not saved anywhere other than your local storage
        </p>
        <div className="emailCreatorTemplateButtons">
          <button
            className="templateButton click"
            onClick={() => {
              setTextValue(textValue + "{{PACKAGENAME}}");
              navigator.clipboard.writeText("{{PACKAGENAME}}");
            }}
          >
            <FontAwesomeIcon icon={faCopy} /> Package Name
          </button>
          <button
            onClick={() => {
              setTextValue(textValue + "{{NAME}}");
              navigator.clipboard.writeText("{{NAME}}");
            }}
            className="templateButton click"
          >
            {" "}
            <FontAwesomeIcon icon={faCopy} /> Canidate Name
          </button>
          <button
            onClick={() => {
              saveTemplateToLocal();
              templateSaved();
            }}
            className="templateButtonGreen click"
          >
            <FontAwesomeIcon icon={faCloudDownloadAlt} /> Save Template
          </button>
        </div>
        <textarea
          className="emailCreator"
          value={textValue}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  const authenticated = state.user.authenticated;
  const loading = state.user.loading;
  return {
    authenticated,
    loading,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: OwnProps
): DispatchProps => ({
  getUser: bindActionCreators(getUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplate);
