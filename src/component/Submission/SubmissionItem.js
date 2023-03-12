import { useContext } from "react";
import classes from "./CSS/SubmissionList.module.css";
import SubmissionContext from "../../store/submission-context";

function SubmissionItem(props) {
  const submissionCtx = useContext(SubmissionContext);

  return (
    <div className={classes.sub}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Ano</th>
            <th>Periodo</th>
            <th>Parceiro</th>
            <th>Ficheiro</th>
            <th>CreadoPor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {props.dados.map((val) => {
            return (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.ano}</td>
                <td>{val.periodo}</td>
                <td>{val.parceiro}</td>
                <td>{val.ficheiro}</td>
                <td>{val.creadoPor}</td>
                <td>
                  <button
                    className={classes.edit}
                    onClick={() => {
                      submissionCtx.addSubmission({
                        id: val.id,
                        ano: val.ano,
                        periodo: val.periodo,
                        parceiro: val.parceiro,
                        ficheiro: val.ficheiro,
                        creadoPor: val.creadoPor,
                        password: val.password,
                      });
                      props.onClickEditar();
                    }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionItem;
