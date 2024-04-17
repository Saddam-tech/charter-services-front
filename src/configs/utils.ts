export const isExpired = (token: any) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const now = Date.now() / 1000; // current time
  return payload.exp < now;
};
