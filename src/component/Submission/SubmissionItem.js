import { useContext, useState } from "react";
import classes from "./CSS/SubmissionList.module.css";
import SubmissionContext from "../../store/submission-context";
import Paginator from "../../Layout/UI/Pagination/Paginator";

function SubmissionItem(props) {
  const submissionCtx = useContext(SubmissionContext);

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 3;
  const dataList = props.dados;

  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;
  const currentDataList = dataList.slice(indexOfFirstPage, indexOfLastPage);
  console.log(currentDataList);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(dataList.length / dataPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wraptable}>
        <div className={classes.contenthead}>
          <div className={classes.cabecalho}>
            <table>
              <thead>
                <tr className={classes.rowhead}>
                  <th>Id</th>
                  <th>Ano</th>
                  <th>Periodo</th>
                  <th>Parceiro</th>
                  <th>Ficheiro</th>
                  <th>CreadoPor</th>
                  <th>Ação</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className={classes.corpo}>
            <table>
              <tbody>
                {currentDataList.map((val) => {
                  return (
                    <tr key={val.id}>
                      <td>{val.id}</td>
                      <td>{val.year}</td>
                      <td>{val.quarter}</td>
                      <td>{val.partner}</td>
                      <td>{val.fileName}</td>
                      <td>{val.createdBy}</td>
                      <td>
                        <button
                          className={classes.btn}
                          onClick={() => {
                            submissionCtx.addSubmission({
                              id: val.id,
                              ano: val.year,
                              periodo: val.quarter,
                              parceiro: val.partner,
                              ficheiro: val.fileName,
                              creadoPor: val.createdBy,
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
          <hr />
          <div className="blog-content-section">
            <Paginator
              dataPerPage={dataPerPage}
              totalData={dataList.length}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionItem;
