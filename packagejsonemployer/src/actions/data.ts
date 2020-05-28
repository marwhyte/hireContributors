import { dumbyData, dumbyDataGraph } from "./../functions/dumbyData";
import { AppState } from "./../store/configureStore";
import {
  AppActions,
  POST_DATA_START,
  POST_DATA_SUCCESS,
  POST_DATA_FAILURE,
} from "../types/AppActions";
import { Dispatch } from "redux";
import { collaborator, dataObject, graphData } from "../types/DataObject";
import {
  getContributorsAccount,
  getContributorsInfo,
  getDependencyInfo,
} from "../functions/getData";
export const getData = (dependencies: string[], token: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(postDataStart());
    var count = 0;
    var id = 0;
    var data: dataObject[] = [];
    for (const dependency of dependencies) {
      if (count <= 2) {
        const dependancyInfo = await getDependencyInfo(dependency, token);
        const packName: string = dependency;
        const githubPackage = dependancyInfo.items[0];
        const packApiRepo = githubPackage.url;
        const packRepo: string = githubPackage.html_url;
        const packStarGazers: number = githubPackage.stargazers_count;
        const language = githubPackage.language;
        var contributersArray: collaborator[] = [];
        const contributersInfo = await getContributorsInfo(
          githubPackage.contributors_url,
          token
        );
        const topContributors = [
          contributersInfo[0],
          contributersInfo[1],
          contributersInfo[2],
          contributersInfo[3],
          contributersInfo[4],
          contributersInfo[5],
        ];
        for (const singleContributer of topContributors) {
          const contributerAccount = await getContributorsAccount(
            singleContributer.url,
            token
          );
          const contributor: collaborator = {
            id: id,
            name: contributerAccount.name,
            company: contributerAccount.company,
            avatarURL: contributerAccount.avatar_url,
            followers: contributerAccount.followers,
            following: contributerAccount.following,
            bio: contributerAccount.bio,
            hireable: contributerAccount.hireable,
            contributions: singleContributer.contributions,
            type: contributerAccount.type,
            login: contributerAccount.login,
            location: contributerAccount.location,
            githubURL: contributerAccount.html_url,
          };
          contributersArray.push(contributor);
          id++;
        }
        const singleDependData: dataObject = {
          packageName: packName,
          packageApiRepo: packApiRepo,
          packageRepo: packRepo,
          collaborators: contributersArray,
          starGazers: packStarGazers,
          language: language,
        };
        data.push(singleDependData);
      } else {
        break;
      }
      count++;
    }
    var tableFormattedData: graphData[] = [];
    for (const singleRepo of data) {
      var rankCount = 1;
      for (const singleContributer of singleRepo.collaborators) {
        if (singleContributer.type !== "User") {
          rankCount--;
        }
        const gridFormatting: graphData = {
          id: singleContributer.id,
          name: singleContributer.name,
          packageName: singleRepo.packageName,
          company: singleContributer.company,
          avatarURL: singleContributer.avatarURL,
          followers: singleContributer.followers,
          following: singleContributer.following,
          bio: singleContributer.bio,
          hireable: singleContributer.hireable,
          starGazers: singleRepo.starGazers,
          language: singleRepo.language,
          contributions: singleContributer.contributions,
          type: singleContributer.type,
          login: singleContributer.login,
          location: singleContributer.location,
          githubURL: singleContributer.githubURL,
          packageRank: rankCount,
        };
        tableFormattedData.push(gridFormatting);
        rankCount++;
      }
    }
    const formattedData = tableFormattedData.filter(
      (element) => element.type === "User"
    );
    console.log(formattedData);
    console.log(JSON.stringify(formattedData));

    dispatch(postDataSuccess(data, formattedData));
  };
};
export const setData = () => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(postDataStart());

    dispatch(postDataSuccess(dumbyData, dumbyDataGraph));
  };
};
export const postDataStart = (): AppActions => ({
  type: POST_DATA_START,
});
export const postDataFailure = (): AppActions => ({
  type: POST_DATA_FAILURE,
});
export const postDataSuccess = (
  data: dataObject[],
  graphData: graphData[]
): AppActions => ({
  type: POST_DATA_SUCCESS,
  allData: data,
  gridData: graphData,
});
