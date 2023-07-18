import { useState } from "react";
import { json, redirect } from "react-router-dom";
import ListSubmissions from "../component/Submission/SubmissionList";
import NewSubmission from "../component/Submission/NewSubmission";
import SubmissionProvider from "../store/SubmissionProvider";
import { getAuthToken } from "../util/AuthToken";

function Submission() {
  const [addSumissionIsShow, setAddSumissionIsShow] = useState(false);

  const showAddSubmissionHandle = () => {
    setAddSumissionIsShow(true);
  };

  const hideAddSubmissionHandle = () => {
    setAddSumissionIsShow(false);
  };

  return (
    <SubmissionProvider>
      <ListSubmissions onShowAddSubmission={showAddSubmissionHandle} />
      {addSumissionIsShow && (
        <NewSubmission onClose={hideAddSubmissionHandle} />
      )}
    </SubmissionProvider>
  );
}

export default Submission;

export async function action({ request }) {
  const data = await request.formData();
  const submissionData = {
    id: data.get("id"),
    year: data.get("ano"),
    quarter: data.get("periodo"),
    partner: data.get("parceiro"),
    fileName: data.get("ficheiro"),
    password: data.get("password"),
  };

  if (data.get("id") === "") {
    submissionData["id"]=0;
    const response = await fetch("http://mozart-portal-backend:8085/api/v1/submission", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + getAuthToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
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
  } else {
    const response = await fetch("http://mozart-portal-backend:8085/api/v1/submission", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + getAuthToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
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
  }

  return redirect("/submission");
}
