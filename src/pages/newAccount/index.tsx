import { Button, Card, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import emailValidator from "../../components/emailValidator";
import postNewAccount from "./apiDataManager/postNewAccount";
import notification from "../../components/Notifications";
import styles from "./NewAccount.module.scss";

export interface FormValues {
  givenName: string;
  familyName: string;
  phone: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export default function NewAccount() {
  const initialValues: FormValues = {
    givenName: "",
    familyName: "",
    phone: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex align-items-center">
        <Button variant="link" onClick={() => navigate(-1)}>
          Page précédente
        </Button>
        <span>{"> Nouveau compte"}</span>
      </div>
      <div className={styles.container}>
        <Card className={styles.cardStyling}>
          <Card.Body>
            <Card.Title className="d-flex">
              <Card.Text data-testid="newaccount-title">
                Identification
              </Card.Text>
            </Card.Title>
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors: Partial<FormValues> = {};
                const resp = emailValidator(values.email);
                if (resp) errors.email = resp;

                if (!values.password) {
                  errors.password = "Le mot de passe est requis";
                } else if (values.password.length < 6) {
                  errors.password =
                    "Le mot de passe doit contenir au moins 6 caractères";
                } else if (values.password !== values.confirmpassword) {
                  errors.password = "Les mots de passe ne correspondent pas";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                await postNewAccount({
                  givenName: values.givenName,
                  familyName: values.familyName,
                  phone: values.phone,
                  email: values.email,
                  password: values.password,
                });
                notification(
                  "success",
                  "Votre compte a été créé. Vous pouvez vous connecter maintenant"
                );
                setSubmitting(false);
                navigate("/login");
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label
                      data-testid="newaccount-FirstName-label"
                      className="mb-0"
                    >
                      Prénom
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="givenName"
                      data-testid="newaccount-FirstName-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.givenName}
                      isInvalid={touched.givenName && !!errors.givenName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.givenName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formFamilyName" className="mt-2">
                    <Form.Label
                      data-testid="newaccount-familyName-label"
                      className="mb-0"
                    >
                      Nom
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="familyName"
                      data-testid="newaccount-familytName-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.familyName}
                      isInvalid={touched.familyName && !!errors.familyName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.familyName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="phoneNumber" className="mt-2">
                    <Form.Label
                      data-testid="newaccount-phone-label"
                      className="mb-0"
                    >
                      Numéro de téléphone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      data-testid="newaccount-phone-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      isInvalid={touched.phone && !!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mt-2">
                    <Form.Label
                      data-testid="newaccount-email-label"
                      className="mb-0"
                    >
                      Courriel
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      data-testid="newaccount-email-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-2">
                    <Form.Label
                      data-testid="newaccount-label-password"
                      className="mb-0"
                    >
                      Mot de passe
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      data-testid="newaccount-password-input"
                      placeholder="minimum 6 caractères"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    controlId="formPassword-confirmation"
                    className="mt-2"
                  >
                    <Form.Label
                      data-testid="newaccount-label-password-confirm"
                      className="mb-0"
                    >
                      Confirmer le mot de passe
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmpassword"
                      data-testid="newaccount-password-confirm-input"
                      placeholder="minimum 6 caractères"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmpassword}
                      isInvalid={
                        touched.confirmpassword && !!errors.confirmpassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmpassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    controlId="formChecks"
                    className="mt-2"
                  ></Form.Group>
                  <Stack>
                    <Button
                      data-testid="login-connect-btn"
                      className="mt-2"
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Soumission..." : "Se connecter"}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
