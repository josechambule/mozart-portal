import { useContext, useEffect, useState } from "react";
import classes from "./CSS/SubmissionList.module.css";
import SubmissionItem from "./SubmissionItem";
import SubmissionContext from "../../store/submission-context";
import { getAuthToken } from "../../util/AuthToken";
import SpinnerLoading from "../../Layout/UI/SpinnerLoading/SpinnerLoading"

function ListSubmissions(props) {
  const submissionCtx = useContext(SubmissionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [fetchedSubmissions, setFetchedSubmissions] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("http://mozart-portal-backend:8085/api/v1/submission?page="+currentPage, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + getAuthToken(),
        },
      });

      if (!response.ok) {
        setError("Fetching submissions failed.");
      } else {
        const resData = await response.json();
        setFetchedSubmissions(resData);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [currentPage]);

  const addNewSubmission = () => {
    submissionCtx.updateMode(false);
    props.onShowAddSubmission();
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber-1);
  };

  const previousPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== fetchedSubmissions.totalPages-1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className={classes.control}>
        <button className={classes.btn} onClick={addNewSubmission}>
          + Add
        </button>
      </div>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <SpinnerLoading />}
        {error && <p>{error}</p>}
      </div>
      <div>
        {!isLoading && fetchedSubmissions && (
          <SubmissionItem
            dados={fetchedSubmissions}
            onClickEditar={props.onShowAddSubmission}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        )}
      </div>
    </>
  );
}

export default ListSubmissions;
