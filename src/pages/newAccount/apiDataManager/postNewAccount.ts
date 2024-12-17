import apiConnection from "../../../services/apiCon";

type dataForm = {
  givenName: string;
  familyName: string;
  phone: string;
  email: string;
  password: string;
};
const postNewAccount = async (data: dataForm) => {
  try {
    const resp = await apiConnection.post("/user", { data });

    if (resp) {
      return resp.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default postNewAccount;
