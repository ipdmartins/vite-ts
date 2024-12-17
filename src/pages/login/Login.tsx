import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Formik } from "formik";
import emailValidator from "../../components/emailValidator";
import { loginUser } from "../../store/user/loginSlice";
import cross from "../../assets/cross_pharmacy.png";
import { AppDispatch } from "../../store/store";
import AccessHandler from "./AccessHandler";
import styles from "./Login.module.scss";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [forgotPassModal, setForgotPassModal] = useState(true);
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleShowForgotPass = () => {
    setShowForgotPass(!showForgotPass);
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <Button variant="link" onClick={() => navigate(-1)}>
          Home
        </Button>
        <span>{"> Login"}</span>
      </div>
      <div className={styles.container}>
        <Card>
          <Card.Body>
            <Card.Title className="d-flex">
              <Card.Img
                data-testid="img-login-title"
                src={cross}
                style={{ width: "25px", height: "25px" }}
              />
              <Card.Text data-testid="login-title" className="ms-1 mt-1">
                Pharmacie
              </Card.Text>
            </Card.Title>
            <h5 className="mt-3 mb-3 text-center">
              <strong data-testid="login-subtitle-msg">
                Bienvenue dans notre famille
              </strong>
            </h5>
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
                await dispatch(loginUser(values)).unwrap();
                navigate("/");
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
                  <Form.Group controlId="formEmail">
                    <Form.Label data-testid="login-email-label">
                      Courriel
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      data-testid="login-input-email"
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
                    <Form.Label data-testid="login-label-password">
                      Mot de passe
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      data-testid="login-input-password"
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
            <hr />
            <Stack>
              <Button
                data-testid="login-create-account"
                className="mt-3"
                variant="secondary"
                onClick={() => navigate("/newaccount")}
              >
                Créer un compte
              </Button>
            </Stack>
          </Card.Body>
        </Card>
        <AccessHandler
          show={showForgotPass}
          forgotPass={forgotPassModal}
          handleClose={handleShowForgotPass}
        />
      </div>
    </div>
  );
}
