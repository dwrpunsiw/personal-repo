export const constructUserSpecificPath = (userId: string, path: string) => {
  return `/${userId}${path}`;
};
