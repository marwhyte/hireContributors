import * as React from 'react'
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { graphData } from "../types/DataObject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
  } from "@fortawesome/free-solid-svg-icons";
  import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

interface Props {
    person: graphData
    copyEmail: (canidateName: string, canidatePackage: string) => void;
    setModalInfo: React.Dispatch<React.SetStateAction<graphData>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Person: React.FC<Props> = (props: Props) => {
        return (                <div className="personContainer">
        <div className="person">
          <img
            src={props.person.avatarURL}
            alt="Users Github Profile"
            className="profilePicture"
          />
          <h1>{props.person.name}</h1>
          <p style={{ maxHeight: 37, overflow: "hidden" }}>
            {props.person.bio && props.person.bio.length >= 77
              ? props.person.bio.substring(0, 70) + " ..."
              : props.person.bio}
          </p>
          <p>
            <FontAwesomeIcon
              icon={faBoxOpen}
              style={{ marginRight: 5 }}
            />
            {props.person.packageName}
          </p>
          <div className="RankingHome">
            <FontAwesomeIcon
              icon={faAward}
              size="2x"
              className="awardIcon"
              style={
                props.person.packageRank === 1
                  ? { color: "#FFDF00" }
                  : props.person.packageRank === 2
                  ? { color: "	#C0C0C0" }
                  : { color: "#cd7f32" }
              }
            />
            <p className="packageInfoMore">
              contributor #{props.person.packageRank}
            </p>
          </div>
          <p>{props.person.company}</p>
        </div>
        <div className="personButtons">
          <button
            className="infoButton"
            onClick={() => {
              props.setModalInfo(props.person);
              props.setOpen(true);
            }}
          >
            More Info
          </button>
          <button
            className="inbox"
            onClick={() =>
              props.copyEmail(
                props.person.name !== null
                  ? props.person.name
                  : "SomethingWentWrong",
                props.person.packageName
              )
            }
          >
            <FontAwesomeIcon icon={faEnvelopeOpenText} /> Copy Email
          </button>
        </div>
      </div>)
}

export default Person