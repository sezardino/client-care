export const PRISMA_ERRORS = {
  VALUE_TOO_LONG_FOR_COLUMN: "P2000", // The value is too long for the column
  UNIQUE_CONSTRAINT_FAILED: "P2002", // Unique constraint violation
  FOREIGN_KEY_CONSTRAINT_FAILED: "P2003", // Foreign key constraint violation
  INVALID_FIELD_VALUE: "P2004", // Invalid value for the field
  INVALID_DATA_TYPE: "P2006", // Invalid data type
  MISSING_REQUIRED_VALUE: "P2012", // Missing required value
  NESTED_OPERATION_VIOLATION: "P2014", // Nested operation violation
  RECORD_NOT_FOUND_FOR_WHERE: "P2015", // Record not found for the given condition
  QUERY_INTERPRETATION_ERROR: "P2016", // Error interpreting the query
  REQUIRED_RELATION_NOT_FOUND: "P2018", // Required relation not found
  RECORD_NOT_FOUND: "P2025", // Record not found
  INVALID_VALUE: "P2005", // Invalid value
  INPUT_ERROR: "P2019", // Input error
  VALUE_OUT_OF_RANGE: "P2020", // Value is out of range
  TABLE_NOT_FOUND: "P2021", // Table not found
  COLUMN_NOT_FOUND: "P2022", // Column not found
};
