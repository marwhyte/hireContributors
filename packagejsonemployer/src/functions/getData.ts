import { dataObject, collaborator } from "../types/DataObject";

export async function getDependencyInfo(value: string, token: string) {
  let response = await fetch(
    `https://api.github.com/search/repositories?q=${value}&sort=stars&order=desc`,
    {
      headers: {
        Authorization: "token " + token,
      },
    }
  );
  let data = await response.json();
  return data;
}
export async function getContributorsInfo(
  contributorsURL: string,
  token: string
) {
  let response = await fetch(contributorsURL, {
    headers: {
      Authorization: "token " + token,
    },
  });
  let data = await response.json();
  return data;
}
export async function getContributorsAccount(
  contribuerURL: string,
  token: string
) {
  let response = await fetch(contribuerURL, {
    headers: {
      Authorization: "token " + token,
    },
  });
  let data = await response.json();
  return data;
}
export async function getRepository(repoURL: string, token: string) {
  let response = await fetch(repoURL, {
    headers: {
      Authorization: "token " + token,
    },
  });
  let data = await response.json();
  return data;
}
