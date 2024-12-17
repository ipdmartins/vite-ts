import { Formik } from "formik";
import { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import emailValidator from "../../components/emailValidator";
import styles from "./NewAccount.module.scss";

interface FormValues {
  firstName: string;
  familyName: string;
  phone: string;
  email: string;
  password: string;
}

export default function NewAccount() {
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [forgotPassModal, setForgotPassModal] = useState(true);
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/newaccount");
  };

  return (
    <div className={styles.container}>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex">
            <Card.Text data-testid="newaccount-title" className="ms-1 mt-1">
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
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              navigate("/home");
              setSubmitting(false);
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
                  <Form.Label data-testid="newaccount-FirstName-label">
                    Prénom
                  </Form.Label>
                  <Form.Control
                    type="text"
                    data-testid="newaccount-FirstName-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    isInvalid={touched.firstName && !!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formFamilyName" className="mt-3">
                  <Form.Label data-testid="newaccount-familyName-label">
                    Nom
                  </Form.Label>
                  <Form.Control
                    type="text"
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
                <Form.Group controlId="phoneNumber" className="mt-3">
                  <Form.Label data-testid="newaccount-phone-label">
                    Numéro de téléphone
                  </Form.Label>
                  <Form.Control
                    type="text"
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
                <Form.Group controlId="formEmail">
                  <Form.Label data-testid="newaccount-email-label">
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
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label data-testid="newaccount-label-password">
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
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label data-testid="newaccount-label-password-confirm">
                    Confirmer le mot de passe
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    data-testid="newaccount-password-confirm-input"
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
                <Stack>
                  <Button
                    data-testid="login-connect-btn"
                    className="mt-4"
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
          <div className="text-end">
            <Button
              data-testid="forgot-pass-btn"
              onClick={() => {
                setForgotPassModal(true);
                setShowForgotPass(true);
              }}
              variant="link"
              className="pb-0"
            >
              J'ai oublié mon mot de passe
            </Button>
          </div>
          <div className="text-end mt-0">
            <Button
              data-testid="activation-email-btn"
              variant="link"
              className="pt-0"
              onClick={() => {
                setForgotPassModal(false);
                setShowForgotPass(true);
              }}
            >
              Je n'ai jamais reçu mon courriel d'activation
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
