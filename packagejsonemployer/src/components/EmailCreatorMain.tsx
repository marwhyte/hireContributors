import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

interface Props {
  textValue: string;
  content: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
}

const EmailCreatorMain: React.FC<Props> = (props: Props) => {
  const setText = (e: string) => {
    props.setTextValue(e);
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
    localStorage.setItem("emailTemplate", props.textValue);
  };
  return (
    <div className="containerEmailCreator">
      <p className="emailCreatorTo">
        <span style={{ color: "#999" }}>To:</span> Find a contact method for the
        potentials candidate
      </p>
      <p className="emailCreatorTo">
        <span style={{ color: "#999" }}>Instructions:</span> {props.content}
      </p>
      <p className="emailCreatorTo">
        <span style={{ color: "#999" }}>Tips:</span> <br></br>-The canidate name
        and package name buttons allows you to fully customize the email to your
        canadate, any line break formatting will be saved! <br></br>
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
            props.setTextValue(props.textValue + "{{PACKAGENAME}}");
            navigator.clipboard.writeText("{{PACKAGENAME}}");
          }}
        >
          <FontAwesomeIcon icon={faCopy} /> Package Name
        </button>
        <button
          onClick={() => {
            props.setTextValue(props.textValue + "{{NAME}}");
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
        value={props.textValue}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default EmailCreatorMain;
