import * as React from "react";
import queryString from "query-string";

//redux
import { connect } from "react-redux";
import { getUser } from "../actions/user";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/AppActions";
import { dataObject, graphData } from "../types/DataObject";
import { bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router-dom";

interface DispatchProps {}

type StateProps = {
  authenticated: boolean;
  loading: boolean;
  name?: string;
  profilePic?: string;
  data?: dataObject[];
  gridData?: graphData[];
};

interface OwnProps extends RouteComponentProps<any> {
  getUser: typeof getUser;
}

type Props = DispatchProps & StateProps & OwnProps;

const Home = (props: Props) => {
  const [token, setToken] = React.useState("");
  //   const [gridFormattingAll, setGridFormattingAll] = React.useState<
  //     undefined | graphData[]
  //   >(undefined);
  React.useEffect(() => {
    console.log("graphdata", props.gridData);
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
        if (props.data) {
        }
      }
    }
  }, [props.loading]);
  const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Name" },
    { key: "packageName", name: "Dependency" },
    { key: "company", name: "Company" },
    { key: "avatarURL", name: "Picture" },
    { key: "followers", name: "Followers" },
    { key: "following", name: "Following" },
    { key: "bio", name: "Bio" },
    { key: "hireable", name: "Hireable" },
  ];
  const rows = props.gridData;
  return (
    <div>
      <h1>home page</h1>
      {props.gridData ? (
        <div className="WholeTable"></div>
      ) : (
        <p>loading table</p>
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
  return {
    authenticated,
    name,
    profilePic,
    data,
    loading,
    gridData,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: OwnProps
): DispatchProps => ({
  getUser: bindActionCreators(getUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
