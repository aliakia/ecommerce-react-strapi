import React from "react";
import Address from "./Address.JSX";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => {
  return (
    <div>
      <div className="">
        <h1>Billing Information</h1>
        <Address
          type="billingAddress"
          values={values.billingAdress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      </div>
      <h1>Same for Shipping Address</h1>
      <input
        defaultChecked
        value={values.shippingAdress.isSameAdress}
        onChange={() =>
          setFieldValue(
            "shippingAdress.isSameAdress",
            !values.shippingAdress.isSameAdress
          )
        }
        type="checkbox"
      />

      {!values.shippingAdress.isSameAdress && (
        <div className="">
          <h1>shipping Information</h1>
          <Address
            type="shippingAddress"
            values={values.shippingAdress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        </div>
      )}
    </div>
  );
};

export default Shipping;
