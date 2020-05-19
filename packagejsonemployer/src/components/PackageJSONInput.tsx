import * as React from "react";

interface Props {}

const PackageJSONInput: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <textarea rows={3} cols={100} className="copyJSON"></textarea>
    </div>
  );
};

export default PackageJSONInput;
