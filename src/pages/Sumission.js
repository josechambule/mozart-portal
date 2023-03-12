import { useState } from "react";
import { json, redirect } from "react-router-dom";
import ListSubmissions from "../component/Submission/SubmissionList";
import NewSubmission from "../component/Submission/NewSubmission";
import SubmissionProvider from "../store/SubmissionProvider";

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
    ano: data.get("ano"),
    periodo: data.get("periodo"),
    parceiro: data.get("parceiro"),
    ficheiro: data.get("ficheiro"),
    password: data.get("password"),
  };

  console.log(submissionData)

  if (data.get("id") === "") {
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
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
    const response = await fetch("http://localhost:3000", {
      method: "PUT",
      headers: {
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

  return redirect("/");
}
