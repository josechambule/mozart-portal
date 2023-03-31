import classes from "./CheckBox.module.css";

function Checkbox(props) {
  return (
    <label className={classes.checkbox}>
      <input
        id={props.id}
        type="checkbox"
        name={props.name}
        checked={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.label}
    </label>
  );
}

export default Checkbox;
