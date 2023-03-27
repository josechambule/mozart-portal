import { useContext, useRef } from "react";
import { Form } from "react-router-dom";
import Button from "../../Layout/UI/Button/Button";
import classes from "./CSS/NewSubmission.module.css";
import Modal from "../../Layout/UI/Modal/Modal";
import SubmissionContext from "../../store/submission-context";

function AddSubmission(props) {
  const submissionCtx = useContext(SubmissionContext);
  const { submissionItem } = submissionCtx;
  let id,
    ano,
    periodo,
    parceiro,
    ficheiro,
    password = "";
  const idRef = useRef();
  const anoRef = useRef();
  const periodoRef = useRef();
  const parceiroRef = useRef();
  const ficheiroRef = useRef();
  const passwordRef = useRef();

  if (submissionCtx.isTrue) {
    id = submissionItem.id;
    ano = submissionItem.ano;
    periodo = submissionItem.periodo;
    parceiro = submissionItem.parceiro;
    ficheiro = submissionItem.ficheiro;
    password = submissionItem.password;
  } else {
    id = "";
    ano = "";
    periodo = "";
    parceiro = "";
    ficheiro = "";
    password = "";
  }

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.cabecalho}>
        {submissionCtx.isTrue ? (
          <p>Edição de Submissão</p>
        ) : (
          <p>Registo de Submissão</p>
        )}
        <button onClick={props.onClose}>X</button>
        <hr />
      </div>
      <Form method="post" onSubmit={props.onClose}>
        <div className={classes.control}>
          <label htmlFor="ano">Ano:</label>
          <input
            type="number"
            id="ano"
            name="ano"
            ref={anoRef}
            defaultValue={ano}
            required
          />
          <input
            className={classes.nonedisplay}
            type="number"
            id="id"
            name="id"
            ref={idRef}
            defaultValue={id}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="periodo">Trimestre:</label>
          <select
            type="search"
            id="periodo"
            name="periodo"
            ref={periodoRef}
            defaultValue={periodo}
            required
          >
            <option value=""></option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="parceiro">Parceiro:</label>
          <select
            type="search"
            id="parceiro"
            name="parceiro"
            ref={parceiroRef}
            defaultValue={parceiro}
            required
          >
            <option value=""></option>
            <option value="ARIEL">ARIEL</option>
            <option value="CCS">CCS</option>
            <option value="ECHO">ECHO</option>
            <option value="EGPAF">EGPAF</option>
            <option value="FGH">FGH</option>
            <option value="ICAP">ICAP</option>
            <option value="M2M">M2M</option>
            <option value="CDC">CDC</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="ficheiro">Nome do Ficheiro:</label>
          <input
            type="text"
            id="ficheiro"
            name="ficheiro"
            ref={ficheiroRef}
            defaultValue={ficheiro}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password do Ficheiro:</label>
          <input
            type="text"
            id="password"
            name="password"
            ref={passwordRef}
            defaultValue={password}
            required
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit">Ok</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddSubmission;
