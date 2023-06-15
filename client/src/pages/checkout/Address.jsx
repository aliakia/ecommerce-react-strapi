import React from "react";
import { Form, getIn, Field, ErrorMessage } from "formik";

const Address = ({
  type,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const formattedName = (field) => `${type}.${field}`;
  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <div className="grid">
      <input
        type="text"
        name={formattedName("firstName")}
        onChange={handleChange}
        onBlur={handleBlur}
        error={formattedError("firstName")}
        helpertest={formattedHelper("firstName")}
      />
    </div>
  );
};

export default Address;
