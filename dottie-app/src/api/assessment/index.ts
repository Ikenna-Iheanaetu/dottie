import getList from "./requests/getList";
import getById from "./requests/getById";
import postSend from "./requests/postSend";
import putUpdate from "./requests/putUpdate";
import deleteAssessment from "./requests/delete";

// Export types
export * from "./utils/types";

// Export individual endpoints
export {
  getList,
  getById,
  postSend as sendAssessment,
  putUpdate as update,
  deleteAssessment
};

// Assessment API object for backward compatibility
export const assessmentApi = {
  list: getList,
  getById,
  sendAssessment: postSend,
  update: putUpdate,
  delete: deleteAssessment
};

export default assessmentApi; 