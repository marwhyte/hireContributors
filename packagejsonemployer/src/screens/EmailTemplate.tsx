import * as React from "react";
import "../styles/EmailTemplate.scss";
import { ToastContainer } from "react-toastify";
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
import EmailCreatorMain from "../components/EmailCreatorMain";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = React.useState(
    "use {{NAME}} as the canadates name placeholder and {{PACKAGENAME}} as the placeholder for the package the canidate worked on."
  );
  const [textValue, setTextValue] = React.useState(
    " Hello {{NAME}},\n I noticed your work at {{PACKAGENAME}} and was impressed, would you be interested in having a conversion about possible careers? If so, reach out!\nSincerely"
  );
  const [token, setToken] = React.useState("");
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
        const emailTemplate = localStorage.getItem("emailTemplate");
        if (emailTemplate !== undefined && emailTemplate !== null) {
          setTextValue(emailTemplate);
        }
      }
    }
  }, [props.loading, props.authenticated]);

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
      <EmailCreatorMain
        textValue={textValue}
        setTextValue={setTextValue}
        content={content}
      />
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
