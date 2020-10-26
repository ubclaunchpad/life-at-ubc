import { type } from "os";
import * as constants from "./Constants";

export const addNumber = (num) => ({
  type: constants.ADD,
  num,
});
