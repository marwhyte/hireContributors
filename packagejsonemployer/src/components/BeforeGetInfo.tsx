import * as React from "react";
import UploadFile from "../components/UploadFile";
import ReactJson from "react-json-view";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gatherData } from "../functions/gatherData";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  jsonSource: string;
  updateJSON: (text: string) => void;
  getData: any;
  parsedJson: {
    dependencies: string;
  };
  token: string;
}

const BeforeGetInfo: React.FC<Props> = (props: Props) => {
  return (
    <div className="jsonupload">
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
          All of your information is on the client side, none of your data is
          saved.
        </p>
      </div>
      <UploadFile updateJSON={props.updateJSON} />
      <button
        className="templateButton click"
        onClick={() => gatherData(props.parsedJson, props.getData, props.token)}
      >
        Submit
      </button>
      <div className="transition">
        <ReactJson
          src={props.jsonSource !== "" ? JSON.parse(props.jsonSource) : {}}
          iconStyle="triangle"
          theme="railscasts"
          enableClipboard={false}
          style={
            props.jsonSource === ""
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
  );
};

export default BeforeGetInfo;
