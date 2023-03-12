import React from "react";

const SubmissionContext = React.createContext({
    submissionItem: {},
    isTrue: false,
    addSubmission: (submissionItem) => {},
    updateMode: (isTrue) => {},
});

export default SubmissionContext;
