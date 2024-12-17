import apiConnection from "../../../services/apiCon";

const postNewActivation = async (email: string) => {
  try {
    const resp = await apiConnection.post("/activateAccount", { email });

    if (resp) {
      return resp.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default postNewActivation;
