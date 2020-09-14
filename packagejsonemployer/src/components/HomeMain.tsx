import * as React from "react";
import ToggleSelect from "./ToggleSelect";
import Person from "./Person";
import { graphData } from "../types/DataObject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PersonModal from "./PersonModal";
interface Props {
  dumbData: graphData[] | undefined;
  whichSelected: boolean;
  token: string;
  open: boolean;
  modalInfo: graphData;
  setWhichSelected: React.Dispatch<React.SetStateAction<boolean>>;
  copyEmail: (canidateName: string, canidatePackage: string) => void;
  setModalInfo: React.Dispatch<React.SetStateAction<graphData>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeMain: React.FC<Props> = (props: Props) => {
  return (
    <div className="home">
      {props.dumbData && props.dumbData.length > 0 ? (
        <ToggleSelect
          whichSelected={props.whichSelected}
          setWhichSelected={props.setWhichSelected}
        />
      ) : (
        <div>
          <ToggleSelect
            whichSelected={props.whichSelected}
            setWhichSelected={props.setWhichSelected}
          />
          <div className="maximumValue">
            <p
              className="packageInfoMoreSingle"
              style={{ fontSize: 25, marginBottom: 40 }}
            >
              <FontAwesomeIcon icon={faSearchLocation} /> You haven't Favorited
              anyone yet, find potential candidates using the easy to use
              explore feature <br></br> or view all with the Toggle Above
            </p>
            <Link
              to={"/find-canidates?access_token=" + props.token}
              className="templateButton click"
              style={{ textDecoration: "none", padding: 10 }}
            >
              Explore Candidates
            </Link>
          </div>
        </div>
      )}

      {props.dumbData ? (
        <div className="wholeGrid">
          {props.dumbData.map((person) => (
            <Person
              key={person.id}
              person={person}
              copyEmail={props.copyEmail}
              setModalInfo={props.setModalInfo}
              setOpen={props.setOpen}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <PersonModal
        setModalInfo={props.setModalInfo}
        setOpen={props.setOpen}
        open={props.open}
        modalInfo={props.modalInfo}
      />
    </div>
  );
};
export default HomeMain;
