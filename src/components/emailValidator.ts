const emailValidator = (email: string) => {
  if (!email) {
    return "Le courriel est requis";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Adresse courriel invalide";
  }
};

export default emailValidator;
