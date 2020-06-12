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
  getRepository,
} from "../functions/getData";
export const getData = (dependencies: string[], token: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(postDataStart());
    var count = 0;
    var id = 0;
    var packageRepos: string[] = [];
    var data: dataObject[] = [];
    for (const dependency of dependencies) {
      if (count <= 14) {
        if (dependency.includes("@")) {
          count--;
          continue;
        }
        const dependancyInfo = await getDependencyInfo(dependency, token);
        if (dependancyInfo === false) {
          continue;
        }

        if (
          !dependancyInfo ||
          !dependancyInfo.url ||
          dependancyInfo.url === null ||
          !dependancyInfo.items
        ) {
          continue;
        }
        const packName: string = dependency;
        const githubPackage = dependancyInfo.items[0];
        var packApiRepo = githubPackage.url;
        packageRepos.push(packApiRepo);
        const packRepo: string = githubPackage.html_url;
        const packStarGazers: number = githubPackage.stargazers_count;
        const language = githubPackage.language;
        var contributersArray: collaborator[] = [];

        if (
          githubPackage &&
          githubPackage.contributors_url &&
          githubPackage.contributors_url !== null
        ) {
          const contributersInfo = await getContributorsInfo(
            githubPackage.contributors_url,
            token
          );
          if (contributersInfo === false) {
            continue;
          }
          const topContributors = [
            contributersInfo[0],
            contributersInfo[1],
            contributersInfo[2],
            contributersInfo[3],
            contributersInfo[4],
          ];
          for (const singleContributer of topContributors) {
            if (
              singleContributer &&
              singleContributer.url &&
              singleContributer.url !== null
            ) {
              const contributerAccount = await getContributorsAccount(
                singleContributer.url,
                token
              );
              if (contributerAccount === false) {
                continue;
              }
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
            } else {
              continue;
            }
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
          console.log("error in data", data);
        }
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
          packageRepo: singleRepo.packageRepo,
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
        console.log("error in nested forloop", tableFormattedData);
        rankCount++;
      }
    }
    const formattedData = tableFormattedData.filter(
      (element) => element.type === "User" && element.name !== null
    );

    localStorage.setItem("packageRepo", JSON.stringify(packageRepos));
    if (data && formattedData) {
      dispatch(postDataSuccess(data, formattedData));
    } else {
      dispatch(postDataFailure());
    }
  };
};
export const getLocalStorageData = (parsedInfo: string[], token: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(postDataStart());
    var id = 0;
    var data: dataObject[] = [];
    for (const dependency of parsedInfo) {
      const dependencyInfo = await getRepository(dependency, token);
      if (dependencyInfo === false) {
        continue;
      }
      const packName: string = dependencyInfo.name;
      const packApiRepo = dependencyInfo.url;
      const packRepo: string = dependencyInfo.html_url;
      const packStarGazers: number = dependencyInfo.stargazers_count;
      const language = dependencyInfo.language;
      var contributersArray: collaborator[] = [];
      if (
        dependencyInfo &&
        dependencyInfo.contributors_url !== undefined &&
        dependencyInfo.contributors_url !== null
      ) {
        const contributersInfo = await getContributorsInfo(
          dependencyInfo.contributors_url,
          token
        );
        if (contributersInfo === false) {
          continue;
        }
        const topContributors = [
          contributersInfo[0],
          contributersInfo[1],
          contributersInfo[2],
          contributersInfo[3],
          contributersInfo[4],
          contributersInfo[5],
        ];
        for (const singleContributer of topContributors) {
          if (
            singleContributer &&
            singleContributer.url !== null &&
            singleContributer.url
          ) {
            const contributerAccount = await getContributorsAccount(
              singleContributer.url,
              token
            );
            if (contributerAccount === false) {
              continue;
            }
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
        continue;
      }
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
          packageRepo: singleRepo.packageRepo,
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
      (element) => element.type === "User" && element.name !== null
    );

    if (data && formattedData) {
      dispatch(postDataSuccess(data, formattedData));
    } else {
      dispatch(postDataFailure());
    }
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
