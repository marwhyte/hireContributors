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
    let packageRepos: string[] = [];
    let data: dataObject[] = [];
    let amountOfDependencies = dependencies.splice(0, 12);
    console.log(amountOfDependencies);
    let promiseAllDependencyInfo: string[] = amountOfDependencies.map(
      (item) =>
        `https://api.github.com/search/repositories?q=${item}&sort=stars&order=desc`
    );
    const dependanciesSearch: any = await getDependencyInfo(
      promiseAllDependencyInfo,
      token
    );
    const constDependency = dependanciesSearch.map((obj: any) => {
      if (obj?.items.length) {
        return obj.items[0];
      } else {
        return null;
      }
    });
    const noEmpties = constDependency.filter((item: any) => item !== null);
    var promiseAllContributorInfo: string[] = [];

    for (const dependency of noEmpties) {
      const packApiRepo = dependency.url;
      packageRepos.push(packApiRepo);
      promiseAllContributorInfo.push(dependency.contributors_url);
    }
    const contributorsSearch: any = await getContributorsInfo(
      promiseAllContributorInfo,
      token
    );
    let newContributorsSearch = [];
    for (let i = 0; i < contributorsSearch.length; i++) {
      newContributorsSearch.push(
        [...contributorsSearch[i]].filter(
          (person: any) => person.type === "User"
        )
      );
    }
    const amountOfContributers = newContributorsSearch.map((person: any) => {
      return person.splice(0, 8);
    });

    const contributorPushInto = amountOfContributers.map((repo: any) => {
      return repo.map((person: any) => person.url);
    });
    console.log(contributorPushInto);

    const getContributorPromises = contributorPushInto.map(
      (contributorURLs: string[]) =>
        getContributorsAccount(contributorURLs, token)
    );
    const results: any = await Promise.all(getContributorPromises);
    console.log(results);
    for (let i = 0; i < noEmpties.length; i++) {
      let contributors: collaborator[] = results[i].map(
        (repoContributors: any) => {
          let contributions = amountOfContributers[i].find(
            (person: any) => person.id === repoContributors.id
          );
          return {
            id: repoContributors.id,
            name: repoContributors.name,
            company: repoContributors.company,
            avatarURL: repoContributors.avatar_url,
            followers: repoContributors.followers,
            following: repoContributors.following,
            bio: repoContributors.bio,
            hireable: repoContributors.hireable,
            contributions: contributions.contributions,
            type: repoContributors.type,
            login: repoContributors.login,
            location: repoContributors.location,
            githubURL: repoContributors.html_url,
          };
        }
      );
      let dataTopush = {
        packageName: noEmpties[i].name,
        packageApiRepo: noEmpties[i].url,
        packageRepo: noEmpties[i].html_url,
        collaborators: contributors,
        starGazers: noEmpties[i].stargazers_count,
        language: noEmpties[i].language,
      };
      data.push(dataTopush);
    }

    var tableFormattedData: graphData[] = [];

    for (const singleRepo of data) {
      let rankCount = 1;
      for (const singleContributer of singleRepo.collaborators) {
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
    localStorage.setItem("packageRepo", JSON.stringify(packageRepos));
    if (data && tableFormattedData) {
      dispatch(postDataSuccess(data, tableFormattedData));
    } else {
      dispatch(postDataFailure());
    }
  };
};
export const getLocalStorageData = (parsedInfo: string[], token: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(postDataStart());
    var data: dataObject[] = [];
    const dependanciesSearch: any = await getDependencyInfo(parsedInfo, token);
    console.log(dependanciesSearch);

    var promiseAllContributorInfo: string[] = [];
    let packageRepos = [];
    for (const dependency of dependanciesSearch) {
      const packApiRepo = dependency.url;
      packageRepos.push(packApiRepo);
      promiseAllContributorInfo.push(dependency.contributors_url);
    }
    const contributorsSearch: any = await getContributorsInfo(
      promiseAllContributorInfo,
      token
    );
    let newContributorsSearch = [];
    for (let i = 0; i < contributorsSearch.length; i++) {
      newContributorsSearch.push(
        [...contributorsSearch[i]].filter(
          (person: any) => person.type === "User"
        )
      );
    }
    const amountOfContributers = newContributorsSearch.map((person: any) => {
      return person.splice(0, 10);
    });

    const contributorPushInto = amountOfContributers.map((repo: any) => {
      return repo.map((person: any) => person.url);
    });
    console.log(contributorPushInto);

    const getContributorPromises = contributorPushInto.map(
      (contributorURLs: string[]) =>
        getContributorsAccount(contributorURLs, token)
    );
    const results: any = await Promise.all(getContributorPromises);
    console.log(results);
    for (let i = 0; i < dependanciesSearch.length; i++) {
      let contributors: collaborator[] = results[i].map(
        (repoContributors: any) => {
          let contributions = amountOfContributers[i].find(
            (person: any) => person.id === repoContributors.id
          );
          return {
            id: repoContributors.id,
            name: repoContributors.name,
            company: repoContributors.company,
            avatarURL: repoContributors.avatar_url,
            followers: repoContributors.followers,
            following: repoContributors.following,
            bio: repoContributors.bio,
            hireable: repoContributors.hireable,
            contributions: contributions.contributions,
            type: repoContributors.type,
            login: repoContributors.login,
            location: repoContributors.location,
            githubURL: repoContributors.html_url,
          };
        }
      );
      let dataTopush = {
        packageName: dependanciesSearch[i].name,
        packageApiRepo: dependanciesSearch[i].url,
        packageRepo: dependanciesSearch[i].html_url,
        collaborators: contributors,
        starGazers: dependanciesSearch[i].stargazers_count,
        language: dependanciesSearch[i].language,
      };
      data.push(dataTopush);
    }

    var tableFormattedData: graphData[] = [];

    for (const singleRepo of data) {
      let rankCount = 1;
      for (const singleContributer of singleRepo.collaborators) {
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
    localStorage.setItem("packageRepo", JSON.stringify(packageRepos));
    if (data && tableFormattedData) {
      dispatch(postDataSuccess(data, tableFormattedData));
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
