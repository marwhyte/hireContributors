import * as React from "react";
import PackageJSONInput from "../components/PackageJSONInput";
import UploadFile from "../components/UploadFile";
interface Props {}

const Jsonupload: React.FC<Props> = (props: Props) => {
  return (
    <div className="jsonupload">
      <PackageJSONInput />
      <UploadFile />
    </div>
  );
};

export default Jsonupload;
