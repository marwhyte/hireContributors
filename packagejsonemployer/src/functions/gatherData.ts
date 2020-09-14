import { notifyNoUpload, notify } from "./notify";

export const gatherData = (
  parsedJson: {
    dependencies: string;
  },
  getData: any,
  token: string
) => {
  if (parsedJson.dependencies !== "" && parsedJson.dependencies !== undefined) {
    const stringedDependencies = JSON.stringify(
      Object.getOwnPropertyNames(parsedJson.dependencies)
    );
    var noAtSymbol = stringedDependencies.replace(/@/g, "");
    var firstElem: string[] = JSON.parse(noAtSymbol);
    var returnedArray = firstElem.map((elem: string) => {
      if (!elem.includes("testing")) {
        if (elem.includes("/")) {
          return elem.substr(0, elem.indexOf("/"));
        } else {
          return elem;
        }
      } else {
        return "";
      }
    });
    returnedArray = returnedArray.filter((elem) => elem !== "");
    const uniqueSet = new Set(returnedArray);
    //@ts-ignore
    const backToArray = [...uniqueSet];
    const noUndefined = backToArray.filter((elem) => elem !== undefined);
    getData(noUndefined, token);
    // props.setData();
  } else if (parsedJson.dependencies === "") {
    notifyNoUpload();
  } else {
    notify();
  }
};
