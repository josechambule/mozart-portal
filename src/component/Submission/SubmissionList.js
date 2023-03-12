import { useContext } from "react";
import classes from "./CSS/SubmissionList.module.css";
import SubmissionItem from "./SubmissionItem";
import SubmissionContext from "../../store/submission-context";

const data = [
  {
    id: 1,
    ano: 2021,
    periodo: "Q1",
    parceiro: "ARIEL",
    ficheiro: "MPT.rar",
    creadoPor: "ariel",
    password: "Q3Ariel1432",
  },
  {
    id: 2,
    ano: 2021,
    periodo: "Q2",
    parceiro: "ARIEL",
    ficheiro: "CD.rar",
    creadoPor: "ariel",
    password: "Q3Ariel1432",
  },
  {
    id: 3,
    ano: 2021,
    periodo: "Q3",
    parceiro: "ARIEL",
    ficheiro: "ReenviarQ3.rar",
    creadoPor: "ariel",
    password: "Q3Ariel1432",
  },
  {
    id: 4,
    ano: 2021,
    periodo: "Q4",
    parceiro: "ARIEL",
    ficheiro: "Reeviar.rar",
    creadoPor: "ariel",
    password: "Q3Ariel1432",
  },
  {
    id: 5,
    ano: 2022,
    periodo: "Q1",
    parceiro: "ARIEL",
    ficheiro: "Reenviar Part 2.rar",
    creadoPor: "ariel",
    password: "Q3Ariel1432",
  },
  {
    id: 6,
    ano: 2022,
    periodo: "Q2",
    parceiro: "ARIEL",
    ficheiro: "CAB.rar",
    creadoPor: "ariel",
    password: "Q3Ariel1432",
  },
  {
    id: 7,
    ano: 2022,
    periodo: "Q3",
    parceiro: "ARIEL",
    ficheiro: "Reevviar Part3.rar",
    creadoPor: "ariel",
    password: "Q3Ariel1432",
  },
  {
    id: 8,
    ano: 2022,
    periodo: "Q4",
    parceiro: "ARIEL",
    ficheiro: "MPT Part1.rar",
    creadoPor: "ariel",
    password: "Q3Ariel1432",
  },
];

function ListSubmissions(props) {
  const submissionCtx = useContext(SubmissionContext);

  const addNewSubmission = () => {
    submissionCtx.updateMode(false);
    props.onShowAddSubmission();
  };

  return (
    <>
      <div className={classes.control}>
        <button className={classes.btn} onClick={addNewSubmission}>
          + Add
        </button>
      </div>
      <div>
        <SubmissionItem dados={data} onClickEditar={props.onShowAddSubmission} />
      </div>
    </>
  );
}

export default ListSubmissions;
