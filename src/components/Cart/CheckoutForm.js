import React from "react";
import "./CheckoutForm.css";
import useInput from "../../hooks/use-input";
const CheckoutForm = (props) => {
  const {
    enteredValue: enteredName,
    enteredValueIsValid: enteredNameIsValid,
    hasError: nameHasError,
    blurInputHandler: nameBlurHandler,
    changeInputHandler: nameChangeHandler,
    reset: nameReset,
  } = useInput((value) => value.trim().length !== 0);

  const {
    enteredValue: enteredStreet,
    enteredValueIsValid: enteredStreetIsValid,
    hasError: streetHasError,
    blurInputHandler: streetBlurHandler,
    changeInputHandler: streetChangeHandler,
    reset: streetReset,
  } = useInput((value) => value.trim().length > 5);

  const {
    enteredValue: enteredPostalCode,
    enteredValueIsValid: enteredPostalCodeIsValid,
    hasError: postalCodeHasError,
    blurInputHandler: postalCodeBlurHandler,
    changeInputHandler: postalCodeChangeHandler,
    reset: postalCodeReset,
  } = useInput((value) => value.trim().length === 5);

  const {
    enteredValue: enteredCity,
    enteredValueIsValid: enteredCityIsValid,
    hasError: cityHasError,
    blurInputHandler: cityBlurHandler,
    changeInputHandler: cityChangeHandler,
    reset: cityReset,
  } = useInput((value) => value.trim().length !== 0);

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const checkoutSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsValid) {
      const user = {
        enteredName,
        enteredCity,
        enteredPostalCode,
        enteredStreet,
      }
      props.onClick(user)
      nameReset();
      streetReset();
      postalCodeReset();
      cityReset();
    }
  };

  const nameVaidation = nameHasError ? "control-invalid" : "control";
  const streetValidation = streetHasError ? "control-invalid" : "control";
  const postalCodeValidation = postalCodeHasError
    ? "control-invalid"
    : "control";
  const cityValidation = cityHasError ? "control-invalid" : "control";

  return (
    <form className="input" onSubmit={checkoutSubmitHandler}>
      <div className={nameVaidation}>
        <label htmlFor="name">Your name </label>
        <input
          id="name"
          type="text"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className="error-text">USER NAME MUST NOT BE EMPTY</p>
        )}
      </div>
      <div className={streetValidation}>
        <label htmlFor="street">Street </label>
        <input
          id="street"
          type="text"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && (
          <p className="error-text">STREET MUST NOT BE EMPTY</p>
        )}
      </div>
      <div className={postalCodeValidation}>
        <label htmlFor="postal_code">Postal code </label>
        <input
          id="postal_code"
          type="text"
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeHasError && (
          <p className="error-text">POSTAL CODE NOT FOUND</p>
        )}
      </div>
      <div className={cityValidation}>
        <label htmlFor="city">City </label>
        <input
          id="city"
          type="text"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p className="error-text">CITY NOT FOUND</p>}
      </div>
      <div className="buttons">
        <button type="button" onClick={props.onCancel}>
          cancel
        </button>
        <button disabled={!formIsValid}>confirm</button>
      </div>
    </form>
  );
};
export default CheckoutForm;
