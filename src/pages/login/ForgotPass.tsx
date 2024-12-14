import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import emailValidator from "../../components/emailValidator";
import { useEffect, useState } from "react";

type ModalProps = {
  show: boolean;
  forgotPass: boolean;
  handleClose: (value: boolean) => void;
};

interface FormValues {
  email: string;
}

export default function ForgotPass({
  show,
  forgotPass,
  handleClose,
}: ModalProps) {
  const [display, setDisplay] = useState(false);
  const initialValues: FormValues = {
    email: "",
  };

  const toggle = () => {
    handleClose(!display);
    setDisplay(!display);
  };

  useEffect(() => {
    console.log(show);

    setDisplay(show);
  }, [show]);

  return (
    <Modal show={display} onHide={() => toggle()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {forgotPass
            ? "Réinitialisez votre mot de passe"
            : "Envoyez un nouveau courriel d'activation"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          {forgotPass
            ? "Saisissez votre adresse courriel pour recevoir un lien de réinitialisation du mot de passe."
            : "Saisissez votre adresse courriel pour recevoir un lien d'activation"}
        </h5>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            errors.email = emailValidator(values.email);
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("submit");

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
                <Form.Label className="mt-2">
                  <strong>Courriel</strong>
                </Form.Label>
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
              <hr />
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100">
                <Button onClick={() => toggle()} variant="light">
                  Annuler
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Soumission..."
                    : forgotPass
                    ? "Réinitialisez le mot de passe"
                    : "Soumettre"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
