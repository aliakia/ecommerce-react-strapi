import React from "react";

const Payment = ({ values, errors, touched, handleBlur, handleChange }) => {
  return (
    <div>
      <h1>Contact Information</h1>
      <input
        type="text"
        placeholder="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={!!touched.email && !!errors.email}
        helpertext={touched.email && errors.email}
      />
      <input
        type="text"
        placeholder="Phone Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNum}
        name="phoneNum"
        error={!!touched.phoneNum && !!errors.phoneNum}
        helpertext={touched.phoneNum && errors.phoneNum}
      />
    </div>
  );
};

export default Payment;
