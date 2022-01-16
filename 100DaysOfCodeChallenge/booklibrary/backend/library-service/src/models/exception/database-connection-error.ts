export class DatabaseConnectionError extends Error {
  errorName = "Database Connection Error";
  statusCode = 500;
  reason = "Failed to connect to a database";

  constructor() {
    super("Failed to connect to a database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
