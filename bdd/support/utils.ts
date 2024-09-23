export const getPageUrl = (root: string) => {
  const suffix = root === "home" ? "" : root;
  return "localhost:3000/" + suffix;
};
