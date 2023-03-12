import classes from "./Auth.module.css";
import Card from "../../Layout/UI/Card/Card"
import Button from "../../Layout/UI/Button/Button"
import { Form } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

function Auth() {
  //const redirect = useNavigate();

  /*const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('token', '85a05c5e-1e3d-11e0-acca-000c29d83bf2');
    redirect('/');
  };*/

  return (
    <Card className={classes.login}>
      <Form method="post">
        <div className = {classes.control}
         /* className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}*/
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            /*value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}*/
          />
        </div>
        <div className = {classes.control}
          /*className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}*/
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password" 
            required
            //value={enteredPassword}
            //onChange={passwordChangeHandler}
            //onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" /*disabled={!formIsValid}*/>
            Login
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default Auth;
