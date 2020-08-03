import { dataObject, collaborator } from "../types/DataObject";

const getInfo = (url: string, token: string) => {
  let request = new Request(url, {
    headers: new Headers({
      Authorization: "token " + token,
    }),
    method: "GET",
  });

  return request;
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     let request = await fetch(
  //       `https://api.github.com/search/repositories?q=${url}&sort=stars&order=desc`,
  //       {
  //         headers: new Headers({
  //           Authorization: "token " + token,
  //         }),
  //       }
  //     );

  //   } catch (err) {
  //     return null;
  //   }
  // });
};

export async function getDependencyInfo(values: string[], token: string) {
  return new Promise((resolve, reject) => {
    let requestArray = values.map((url) => {
      return getInfo(url, token);
    });
    Promise.all(
      requestArray.map((request) => {
        return fetch(request)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
      })
    )
      .then((values) => {
        console.log("values", values);
        resolve(values);
      })
      .catch((err) => resolve(null));
  });
}

export async function getContributorsInfo(
  contributorsURL: string[],
  token: string
) {
  return new Promise((resolve, reject) => {
    let requestArray = contributorsURL.map((url) => {
      return getInfo(url, token);
    });
    Promise.all(
      requestArray.map((request) => {
        return fetch(request)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
      })
    )
      .then((values) => {
        console.log("values", values);
        resolve(values);
      })
      .catch((err) => resolve(null));
  });
  // try {
  //   let response = await fetch(contributorsURL, {
  //     headers: {
  //       Authorization: "token " + token,
  //     },
  //   });
  //   let data = await response.json();
  //   return data;
  // } catch (err) {
  //   return false;
  // }
}
export async function getContributorsAccount(
  contribuerURL: string[],
  token: string
) {
  return new Promise((resolve, reject) => {
    let requestArray = contribuerURL.map((url) => {
      return getInfo(url, token);
    });
    Promise.all(
      requestArray.map((request) => {
        return fetch(request)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
      })
    )
      .then((values) => {
        console.log("values", values);
        resolve(values);
      })
      .catch((err) => resolve(null));
  });
}
export async function getRepository(repoURL: string, token: string) {
  try {
    let response = await fetch(repoURL, {
      headers: {
        Authorization: "token " + token,
      },
    });
    let data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
}
