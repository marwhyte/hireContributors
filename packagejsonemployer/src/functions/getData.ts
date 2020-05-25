interface collaborator {
  name: string;
  company?: string;
  avatarURL?: string;
  followers?: number;
  following?: number;
  bio?: string;
  hireable?: boolean;
}
interface dataObject {
  packageName: string;
  packageRepo: string;
  collaborators: collaborator[];
}
async function getDependencyInfo(value: string) {
  let response = await fetch(
    `https://api.github.com/search/repositories?q=${value}&sort=stars&order=desc`
  );
  let data = await response.json();
  return data;
}
export const getData = async (dependencies: string[]) => {
  var count = 0;
  var data: dataObject[];
  for (const dependency of dependencies) {
    if (count <= 5) {
      try {
        const somestuff = await getDependencyInfo(dependency);
        console.log(somestuff);
        const packName: string = dependency;
        // const packRepo: string = somestuff.htmlurl;
      } catch (err) {
        console.log(err);
      }
    } else {
      break;
    }
    count++;
  }
};
