import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import Banner from "../../components/Banner";
import * as yup from "yup";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { json } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NJFd9H9qZf3d3fRavV0mlr0PrETtUdgQ04lnEOAOxnmIL42y6no1fNrokylpXpEKYZboFcLiEiihAZ3EP2NrQ1e00DkqK88LX"
);

const initialValues = {
  billingAdress: {
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
  },

  shippingAdress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    street: "",
    zipcode: "",
  },
  email: "",
  phoneNum: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAdress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      city: yup.string().required("required"),
      street: yup.string(),
      zipcode: yup.string().required("required"),
    }),
    shippingAdress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street: yup.string(),
      zipcode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),

  yup.object().shape({
    email: yup.string().required("required"),
    phoneNum: yup.string().required("required"),
  }),
];

function CheckOut() {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAdress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAdress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <div className="">
      <Banner />

      <div className="flex justify-around text-[14px] font-bold">
        <button className="uppercase">Payment</button>
        <button className="uppercase">Billing</button>
      </div>

      <div>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <div className="flex">
                {isSecondStep && (
                  <button type="submit" onClick={setActiveStep(activeStep - 1)}>
                    {isFirstStep ? "Next" : "Place Order"}
                  </button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>

      {/* <div className=" flex items-center w-full justify-between gap-4 bottom-0 left-0 border-t border-b border-black p-2 uppercase mt-5">
        <h1 className="font-bold">shopping bag </h1>
      </div>
      <div className="grid md:grid-cols-4">
        <div className="p-2 w-auto h-auto relative">
          <button className="absolute right-[2%] ">
            <RiCloseLine size={30} />
          </button>
          <div className="h-[300px]">
            <img src="https://i.pinimg.com/originals/f4/76/43/f4764386de9de0440fa5dc3b476bd4c7.jpg" />
          </div>
          <div className="text-black uppercase flex justify-between items-baseline pb-1">
            <h5 className="font-bold">CAchou</h5>
            <h6 className="text-[12px]">PHp 1,300</h6>
          </div>
          <div className="flex w-full">
            <div className="grid grid-cols-2 justify-items-center w-[90%] border border-black font-bold text-[14px]">
              <button className="hover:bg-red-600 w-full uppercase hover:text-white duration-100">
                ADD
              </button>
              <button className="hover:bg-red-600 w-full uppercase hover:text-white duration-100">
                remove
              </button>
            </div>
            <h6 className="px-5 ml-1 border-b border-red-600 text-red-600">
              4
            </h6>
          </div>
        </div>
        <div className="p-2 w-auto h-auto relative">
          <button className="absolute right-[2%] ">
            <RiCloseLine size={30} />
          </button>
          <div className="h-[300px]">
            <img src="https://i.pinimg.com/originals/f4/76/43/f4764386de9de0440fa5dc3b476bd4c7.jpg" />
          </div>
          <div className="text-black uppercase flex justify-between items-baseline pb-1">
            <h5 className="font-bold">CAchou</h5>
            <h6 className="text-[12px]">PHp 1,300</h6>
          </div>
          <div className="flex w-full">
            <div className="grid grid-cols-2 justify-items-center w-[90%] border border-black font-bold text-[14px]">
              <button className="hover:bg-red-600 w-full uppercase hover:text-white duration-100">
                ADD
              </button>
              <button className="hover:bg-red-600 w-full uppercase hover:text-white duration-100">
                remove
              </button>
            </div>
            <h6 className="px-5 ml-1 border-b border-red-600 text-red-600">
              4
            </h6>
          </div>
        </div>
        <div className="p-2 w-auto h-auto relative">
          <button className="absolute right-[2%] ">
            <RiCloseLine size={30} />
          </button>
          <div className="h-[300px]">
            <img src="https://i.pinimg.com/originals/f4/76/43/f4764386de9de0440fa5dc3b476bd4c7.jpg" />
          </div>
          <div className="text-black uppercase flex justify-between items-baseline pb-1">
            <h5 className="font-bold">CAchou</h5>
            <h6 className="text-[12px]">PHp 1,300</h6>
          </div>
          <div className="flex w-full">
            <div className="grid grid-cols-2 justify-items-center w-[90%] border border-black font-bold text-[14px]">
              <button className="hover:bg-red-600 w-full uppercase hover:text-white duration-100">
                ADD
              </button>
              <button className="hover:bg-red-600 w-full uppercase hover:text-white duration-100">
                remove
              </button>
            </div>
            <h6 className="px-5 ml-1 border-b border-red-600 text-red-600">
              4
            </h6>
          </div>
        </div>
        <div className="p-2 w-auto h-auto relative">
          <button className="absolute right-[2%] ">
            <RiCloseLine size={30} />
          </button>
          <div className="h-[300px]">
            <img src="https://i.pinimg.com/originals/f4/76/43/f4764386de9de0440fa5dc3b476bd4c7.jpg" />
          </div>
          <div className="text-black uppercase flex justify-between items-baseline pb-1">
            <h5 className="font-bold">CAchou</h5>
            <h6 className="text-[12px]">PHp 1,300</h6>
          </div>
          <div className="flex w-full">
            <div className="grid grid-cols-2 justify-items-center w-[90%] border border-black font-bold text-[14px]">
              <button className="hover:bg-red-600 w-full uppercase hover:text-white duration-100">
                ADD
              </button>
              <button className="hover:bg-red-600 w-full uppercase hover:text-white duration-100">
                remove
              </button>
            </div>
            <h6 className="px-5 ml-1 border-b border-red-600 text-red-600">
              4
            </h6>
          </div>
        </div>
      </div>
      <div className=" flex items-center w-full justify-between gap-4 bottom-0 left-0 border-t border-b border-black p-2 uppercase mt-5">
        <div className="">
          <h1 className="font-bold">Subtotal </h1>
          <h3 className="text-[14px]">PHP 14,000</h3>
        </div>
        <button className="text-[14px] uppercase tracking-wider font-bold bg-black text-white p-2 flex items-center gap-2 hover:bg-red-600 hover:text-white duration-100">
          Confirm CHECKOUT
          <RiArrowRightFill />
        </button>
      </div> */}
    </div>
  );
}

export default CheckOut;
