import * as React from "react";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
interface Props {
  whichSelected: boolean;
  setWhichSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSelect: React.FC<Props> = (props: Props) => {
  return (
    <div style={{ width: "55%", marginLeft: "auto" }}>
      <div className="togetherToggle">
        <label>
          <Toggle
            className="myToggle"
            defaultChecked={props.whichSelected}
            icons={{
              checked: <FontAwesomeIcon color={"white"} icon={faHeart} />,
              unchecked: null,
            }}
            onChange={() => props.setWhichSelected((boolean) => !boolean)}
          />
        </label>
        <p
          style={{
            margin: 0,
            fontWeight: 500,
            color: "#333333",
            lineHeight: 1.1,
            fontSize: 20,
            paddingLeft: 10,
            paddingBottom: 2,
          }}
        >
          {props.whichSelected ? "My Favorites" : "All"}
        </p>
      </div>
    </div>
  );
};

export default ToggleSelect;
