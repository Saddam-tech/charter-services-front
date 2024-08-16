import { PathKey } from "./types";

export const mapPathToStatus: Record<PathKey, number> = {
  incoming: 0,
  accepted: 1,
  rejected: 2,
};
