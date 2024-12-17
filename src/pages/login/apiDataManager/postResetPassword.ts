import apiConnection from "../../../services/apiCon";

const postResetPassword = async (email: string) => {
  try {
    const resp = await apiConnection.post("/passReset", { email });

    if (resp) {
      return resp.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default postResetPassword;
