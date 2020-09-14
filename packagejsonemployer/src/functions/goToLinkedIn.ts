export const goToLinkedIn = (name: string) => {
  const nameArray = name.split(" ");
  if (nameArray.length === 1) {
    const link = `https://www.linkedin.com/search/results/all/?keywords=${nameArray[0]}`;
    window.open(link, "_blank");
  } else {
    const link = `https://www.linkedin.com/search/results/all/?keywords=${nameArray[0]}%20${nameArray[1]}`;
    window.open(link, "_blank");
  }
};
