export const errorHandler = function (e) {
  if (e.isCustom) {
    console.log(e.message);
  }
};
export class OperationFailedError extends Error {
  constructor() {
    super();
    this.message = "Operation failed";
    this.isCustom = true;
  }
}
