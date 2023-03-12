import { useReducer } from "react";
import SubmissionContext from "./submission-context";

const defaultSubmissionState = {
  submissionItem: {},
  isTrue: false,
};

const SubmissionReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateSubmissionItem = action.submissionItem;
    return {
      submissionItem: updateSubmissionItem,
      isTrue: true,
    };
  }

  if (action.type === "UPDATE") {
    return {
      submissionItem: state.submissionItem,
      isTrue: false,
    };
  }

  return defaultSubmissionState;
};

const SubmissionProvider = (props) => {
  const [submissionState, dispatchSubmissionAction] = useReducer(
    SubmissionReducer,
    defaultSubmissionState
  );

  const addSubmissionFromList = (submissionItem) => {
    dispatchSubmissionAction({ type: "ADD", submissionItem: submissionItem });
  };

  const updateModeHandler = (isTrue) => {
    dispatchSubmissionAction({ type: "UPDATE", isTrue: isTrue });
  };

  const submissionContext = {
    submissionItem: submissionState.submissionItem,
    isTrue: submissionState.isTrue,
    addSubmission: addSubmissionFromList,
    updateMode: updateModeHandler,
  };

  return (
    <SubmissionContext.Provider value={submissionContext}>
      {props.children}
    </SubmissionContext.Provider>
  );
};

export default SubmissionProvider;
