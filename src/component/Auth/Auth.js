import classes from "./Auth.module.css";
import Card from "../../Layout/UI/Card/Card";
import Button from "../../Layout/UI/Button/Button";
import { Form } from "react-router-dom";
import { useState } from "react";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";

function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = () => {
    setIsLoading(true);
  };

  return (
    <Card className={classes.login}>
      <Form method="post" onSubmit={submitHandler}>
        <div className={classes.loginlabel}>
          <label>LOGIN</label>
        </div>
        <div className={classes.control}>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="&#xf007; username"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="&#xf023; password"
            required
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" disabled={isLoading}>
            <i className={`${isLoading === true ? classes.loading : ""}`}></i>
            Login
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default Auth;
