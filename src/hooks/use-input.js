import {useState} from 'react';
const useInput = (validate) =>{
    const[enteredValue,setEnteredValue] = useState('');
    const[isTouched,setIsTouched] = useState(false); 

    const enteredValueIsValid = validate(enteredValue);
    const hasError = !enteredValueIsValid && isTouched;
    
    const blurInputHandler = () =>{
        setIsTouched(true);
    }

    const changeInputHandler = (event) => {
        setEnteredValue(event.target.value);
        setIsTouched(true);
    }

    const reset = () =>{
        setEnteredValue('');
        setIsTouched(false);
    }
return {
    enteredValue,
    enteredValueIsValid,
    hasError,
    blurInputHandler,
    changeInputHandler,
    reset,
}
   
}
export default useInput;