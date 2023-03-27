import classes from "./Auth.module.css";
import Card from "../../Layout/UI/Card/Card"
import Button from "../../Layout/UI/Button/Button"
import { Form } from "react-router-dom";
import { useState } from "react";

function Auth() {

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = () => {
    setIsLoading(true);
  };

  return (
    <Card className={classes.login}>
      <Form method="post" onSubmit={submitHandler}>
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
          <Button type="submit" disabled={isLoading}>
          <i className={`${isLoading === true ? classes.loading : ""}`}></i>Login
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default Auth;
