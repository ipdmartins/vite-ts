import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import postResetPassword from "./apiDataManager/postResetPassword";
import postNewActivation from "./apiDataManager/postNewActivation";
import emailValidator from "../../components/emailValidator";
import styles from "./Login.module.scss";

type ModalProps = {
  show: boolean;
  forgotPass: boolean;
  handleClose: (value: boolean) => void;
};

interface FormValues {
  email: string;
}

export default function AccessHandler({
  show,
  forgotPass,
  handleClose,
}: ModalProps) {
  const [display, setDisplay] = useState(false);
  const [submittedButton, setSubmittedButton] = useState("Soumission...");
  const [isSubmitting, setSubmitting] = useState(false);
  const initialValues: FormValues = {
    email: "",
  };

  const toggle = () => {
    handleClose(!display);
    setDisplay(!display);
    setSubmitting(!isSubmitting);
    setSubmittedButton("Soumettre");
  };

  useEffect(() => {
    setDisplay(show);
  }, [show]);

  return (
    <Modal show={display} onHide={() => toggle()}>
      <Modal.Header closeButton>
        <Modal.Title data-testid="accessHandler-title">
          {forgotPass
            ? "Réinitialisez votre mot de passe"
            : "Envoyez un nouveau courriel d'activation"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submittedButton == "Soumis" && (
          <Card className="mb-3">
            <Card.Text className={styles.cardSuccessEmail}>
              {`Nous venons d'envoyer un courriel avec un lien qui vous permettra ${
                forgotPass
                  ? "de modifier votre mot de passe"
                  : "d'activer votre compte"
              }. Vérifiez votre boite de réception
              dans les prochaines minutes. Si vous ne voyez pas le courriel,
              pensez à vérifier votre dossier de courrier indésirables (SPAM).`}
            </Card.Text>
          </Card>
        )}
        <h5 data-testid="accessHandlerInfoMsg">
          {forgotPass
            ? "Saisissez votre adresse courriel pour recevoir un lien de réinitialisation du mot de passe."
            : "Saisissez votre adresse courriel pour recevoir un lien d'activation"}
        </h5>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            const resp = emailValidator(values.email);
            if (resp) errors.email = resp;
            return errors;
          }}
          onSubmit={async (values) => {
            setSubmitting(true);
            if (forgotPass) {
              await postResetPassword(values.email);
            } else {
              await postNewActivation(values.email);
            }
            setSubmittedButton("Soumis");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label className="mt-2">
                  <strong data-testid="accessHandler-email-lbl">
                    Courriel
                  </strong>
                </Form.Label>
                <Form.Control
                  data-testid="accessHandler-email-input"
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
                <Button
                  data-testid="accessHandler-cancel-btn"
                  onClick={() => toggle()}
                  variant="light"
                >
                  Annuler
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? submittedButton
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
