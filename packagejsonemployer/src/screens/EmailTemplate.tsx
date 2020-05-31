import * as React from "react";
import "../styles/EmailTemplate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
interface Props {}

const EmailTemplate: React.FC<Props> = (props: Props) => {
  const [content, setContent] = React.useState(
    "use {{NAME}} as the canadates name placeholder and {{PACKAGENAME}} as the placeholder for the package the canidate worked on."
  );
  const [textValue, setTextValue] = React.useState(
    " Hello {{NAME}}, I noticed your work at {{PACKAGENAME}} and was impressed, would you be interested in having a conversion about possible careers? If so, reach out! Sincerely"
  );
  const setText = (e: string) => {
    setTextValue(e);
  };
  return (
    <div className="width100">
      <div className="containerEmailCreator">
        <p className="emailCreatorTo">
          <span style={{ color: "#999" }}>To:</span> Find a contact method for
          the potentials candidate
        </p>
        <p className="emailCreatorTo">
          <span style={{ color: "#999" }}>Instructions:</span> {content}
        </p>
        <p className="emailCreatorTo">
          <span style={{ color: "#999" }}>Tips:</span> <br></br>-The name and
          package name allows you to fully customize the email to your canadate,
          any line break formatting will be saved! <br></br>-Once finished save
          the template using the SAVE button! <br></br>-Copy the name and
          package name to clipboard using the buttons below!
        </p>
        <div className="emailCreatorTemplateButtons">
          <button
            className="templateButton click"
            onClick={() => navigator.clipboard.writeText("{{PACKAGENAME}}")}
          >
            <FontAwesomeIcon icon={faCopy} /> Package Name
          </button>
          <button
            onClick={() => navigator.clipboard.writeText("{{NAME}}")}
            className="templateButton click"
          >
            {" "}
            <FontAwesomeIcon icon={faCopy} /> Canidate Name
          </button>
        </div>
        <textarea
          className="emailCreator"
          value={textValue}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="templateButton click">Save Template</button>
      </div>
    </div>
  );
};

export default EmailTemplate;
