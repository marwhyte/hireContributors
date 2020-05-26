import * as React from "react";
import queryString from "query-string";
import "../styles/Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

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
  const [dumbData, setDumbData] = React.useState([
    {
      id: 0,
      name: "Daniel Trojanowski",
      packageName: "apollo/react-hooks",
      company: null,
      avatarURL: "https://avatars3.githubusercontent.com/u/1078103?v=4",
      followers: 52,
      following: 8,
      bio: null,
      hireable: null,
    },
    {
      id: 1,
      name: "Umidbek Karimov",
      packageName: "apollo/react-hooks",
      company: "@superdispatch ",
      avatarURL: "https://avatars2.githubusercontent.com/u/4734297?v=4",
      followers: 42,
      following: 10,
      bio: "*.{js,ts}",
      hireable: null,
    },
    {
      id: 2,
      name: null,
      packageName: "apollo/react-hooks",
      company: null,
      avatarURL: "https://avatars0.githubusercontent.com/in/29110?v=4",
      followers: 0,
      following: 0,
      bio: null,
      hireable: null,
    },
    {
      id: 3,
      name: "Daniel K.",
      packageName: "apollo/react-hooks",
      company: null,
      avatarURL: "https://avatars0.githubusercontent.com/u/1096340?v=4",
      followers: 73,
      following: 14,
      bio: null,
      hireable: null,
    },
    {
      id: 4,
      name: "Vojtech Novak",
      packageName: "react-native-community/datetimepicker",
      company: null,
      avatarURL: "https://avatars1.githubusercontent.com/u/1566403?v=4",
      followers: 143,
      following: 1,
      bio: "React Native, Java and Objective-C.",
      hireable: null,
    },
    {
      id: 5,
      name: "luancurti",
      packageName: "react-native-community/datetimepicker",
      company: "@Gympass",
      avatarURL: "https://avatars2.githubusercontent.com/u/7242605?v=4",
      followers: 36,
      following: 31,
      bio: "Mobile at @Gympass and Member of @react-native-community",
      hireable: null,
    },
    {
      id: 6,
      name: "Martijn Swaagman",
      packageName: "react-native-community/datetimepicker",
      company: "@godaddy",
      avatarURL: "https://avatars1.githubusercontent.com/u/670951?v=4",
      followers: 102,
      following: 32,
      bio: "@nodejs - fullstack - devops - learning @rust-lang",
      hireable: true,
    },
    {
      id: 7,
      name: null,
      packageName: "react-native-community/datetimepicker",
      company: null,
      avatarURL: "https://avatars2.githubusercontent.com/u/59091618?v=4",
      followers: 0,
      following: 0,
      bio: null,
      hireable: null,
    },
    {
      id: 8,
      name: "Mike Nedosekin",
      packageName: "react-native-community/masked-view",
      company: null,
      avatarURL: "https://avatars3.githubusercontent.com/u/778724?v=4",
      followers: 11,
      following: 3,
      bio: null,
      hireable: null,
    },
    {
      id: 9,
      name: "Ilja Daderko",
      packageName: "react-native-community/masked-view",
      company: "@Asimetriq ",
      avatarURL: "https://avatars2.githubusercontent.com/u/3154053?v=4",
      followers: 64,
      following: 9,
      bio: "Software Engineer",
      hireable: true,
    },
    {
      id: 10,
      name: "Jesse Katsumata",
      packageName: "react-native-community/masked-view",
      company: "@react-native-community",
      avatarURL: "https://avatars1.githubusercontent.com/u/6936373?v=4",
      followers: 125,
      following: 92,
      bio:
        "Engineer @CureApp \r\nMember of @react-native-community and @reason-react-native.\r\nMaintaining Japanese Translation of @gatsbyjs",
      hireable: null,
    },
    {
      id: 11,
      name: "Christoph Nakazawa",
      packageName: "react-native-community/masked-view",
      company: "Facebook",
      avatarURL: "https://avatars0.githubusercontent.com/u/13352?v=4",
      followers: 2569,
      following: 19,
      bio:
        "Formerly Pojer · 👨🏻‍💻 Engineering Manager at Facebook · 🚇 Metro · 🃏 Jest · 📦 Yarn",
      hireable: null,
    },
  ]);
  //   React.useEffect(() => {
  //     console.log("graphdata", props.gridData);
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
  //         if (props.data) {
  //         }
  //       }
  //     }
  //   }, [props.loading]);
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
    <div className="home">
      <h1>home page</h1>
      {dumbData ? (
        <div className="wholeGrid">
          {dumbData.map((person) => (
            <div className="personContainer">
              <div className="person">
                <img
                  src={person.avatarURL}
                  alt="Users Github Profile"
                  className="profilePicture"
                />
                <h1>{person.name}</h1>
                <p>{person.bio}</p>
                <p>
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    style={{ marginRight: 5 }}
                  />
                  {person.packageName}
                </p>
                <p>{person.company}</p>
              </div>
              <div className="personButtons">
                <button className="infoButton">More Info</button>
                <button className="inbox">
                  <FontAwesomeIcon icon={faEnvelopeOpenText} />
                </button>
              </div>
            </div>
          ))}
        </div>
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
