import { Form, json, redirect } from "react-router-dom";
import Card from "../../Layout/UI/Card/Card";
import classes from "./BasicSettings.module.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import Button from "../../Layout/UI/Button/Button";
import { useState } from "react";
import Checkbox from "../../Layout/UI/CheckBox/CheckBox";

function BasicSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedMANAGER, setCheckedMANAGER] = useState(false);
  const [checkedADMIN, setCheckedADMIN] = useState(false);
  const [passsword, setPassword] = useState("");
  const [confirmPassword, setConfirmePassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmePassword(event.target.value);
  };

  const handleChange = () => {
    setChecked(!checked); 
    onBluerConfirmPassword();   
  };

  const handleChangeMANAGER = () => {
    setCheckedMANAGER(!checkedMANAGER);
    onBluerConfirmPassword();
  };

  const handleChangeADMIN = () => {
    setCheckedADMIN(!checkedADMIN);
    onBluerConfirmPassword();
  };

  const submitHandler = () => {
    setIsLoading(true);
  };

  const onBluerConfirmPassword = () => {
    if (passsword === confirmPassword) {
        if((!checked && !checkedMANAGER && !checkedADMIN)){
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    } else {
      setIsValid(true);
    }
  };

  return (
    <Card className={classes.content}>
      <Form method="post" onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="&#xf007; name"
            required
          />
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
            onChange={handleChangePassword}
            onBlur={onBluerConfirmPassword}
            placeholder="&#xf023; password"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmpassword"></label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            onChange={handleChangeConfirmPassword}
            onBlur={onBluerConfirmPassword}
            placeholder="&#xf023; confirm password"
            required
          />
        </div>
        <div className={classes.role}>
          <label>Role</label>
        </div>
        <div className={classes.control}>
          <Checkbox
            id="DATAENTRY"
            name="DATAENTRY"
            label="DATAENTRY"
            value={checked}
            onChange={handleChange}
          />
          <Checkbox
            id="MANAGER"
            name="MANAGER"
            label="MANAGER"
            value={checkedMANAGER}
            onChange={handleChangeMANAGER}
          />
          <Checkbox
            id="ADMIN"
            name="ADMIN"
            label="ADMIN"
            value={checkedADMIN}
            onChange={handleChangeADMIN}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" disabled={isLoading || isValid}>
            <i className={`${isLoading === true ? classes.loading : ""}`}></i>
            Save
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default BasicSettings;

export async function action({ request }) {
  const data = await request.formData();
  let roleList = [];
  if (data.get("DATAENTRY") !== null) {
    const rol = { role: "DATAENTRY" };
    roleList.push(rol);
  }
  if (data.get("MANAGER") !== null) {
    const rol = { role: "MANAGER" };
    roleList.push(rol);
  }
  if (data.get("ADMIN") !== null) {
    const rol = { role: "ADMIN" };
    roleList.push(rol);
  }
  const basicSettingsData = {
    username: data.get("username"),
    password: data.get("password"),
    name: data.get("name"),
    role: roleList,
  };

  const response = await fetch("http://mozart-portal-backend:8085/api/v1/auth/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(basicSettingsData),
  });

  if (response.status === 404) {
    return redirect("/");
  }

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  return redirect("/");
}
