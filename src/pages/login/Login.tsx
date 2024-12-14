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
import styles from "./Sample.module.scss";
import ForgotPass from "./ForgotPass";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [forgotPassModal, setForgotPassModal] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleShowForgotPass = () => {
    setShowForgotPass(!showForgotPass);
  };

  return (
    <div className={styles.container}>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex">
            <Card.Img src={cross} style={{ width: "25px", height: "25px" }} />
            <Card.Text className="ms-1 mt-1">Pharmacie</Card.Text>
          </Card.Title>
          <h5 className="mt-3 mb-3 text-center">
            <strong>Bienvenue dans notre famille</strong>
          </h5>

          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors: Partial<FormValues> = {};
              errors.email = emailValidator(values.email);
              // if (!values.email) {
              //   errors.email = "Le courriel est requis";
              // } else if (
              //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              // ) {
              //   errors.email = "Adresse courriel invalide";
              // }
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
                <Form.Group controlId="formEmail">
                  <Form.Label>Courriel</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
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
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
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
              onClick={() => {
                setForgotPassModal(true);
                setShowForgotPass(true);
              }}
              variant="link"
            >
              J'ai oublié mon mot de passe
            </Button>
          </div>
          <div className="text-end">
            <Button
              variant="link"
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
            <Button className="mt-4" variant="secondary" type="submit">
              Créer un compte
            </Button>
          </Stack>
        </Card.Body>
      </Card>
      <ForgotPass
        show={showForgotPass}
        forgotPass={forgotPassModal}
        handleClose={handleShowForgotPass}
      />
    </div>
  );
}
