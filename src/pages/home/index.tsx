import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useSelector, useDispatch } from "react-redux";
import { RiAccountBox2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/user/loginSlice";
import styles from "./Home.module.scss";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLoginLogout = () => {
    if (user?.uuid) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar fixed="top" className={`${styles.navBarMainPage} mb-5`}>
        <Container fluid>
          <Nav className={`${styles.navItemMainPage} me-auto d-flex gap-3`}>
            <Nav.Link className={styles.navItemMainPage} href="/">
              Prendre rendez-vous
            </Nav.Link>
            <Nav.Link className={styles.navItemMainPage} href="/">
              Récompenses
            </Nav.Link>
            <Nav.Link className={styles.navItemMainPage} href="/">
              Carrières
            </Nav.Link>
            <Nav.Link className={styles.navItemMainPage} href="/">
              Espace photo
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className={styles.navItemMainPage}
              onClick={handleLoginLogout}
            >
              {user?.givenName && (
                <span className="me-3">Bonjour {user.givenName}</span>
              )}
              <RiAccountBox2Fill className="me-2" size={25} />
              <span className="me-3">
                {user?.uuid ? "Deconnexion" : "Connexion"}
              </span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className={styles.bodyHomePage}>
        <Row className="mt-5">
          <Col>
            <Card className={styles.cardBodyHome}>
              <Card.Body className={styles.cardBodyHomeOne}>
                <Card.Title>Magasiner en ligne</Card.Title>
                <Card.Text>
                  Magasinez tous vos essentiels en ligne ou consultez la
                  circulaire de la semaine afin de connaitre les plus récentes
                  promotions.
                </Card.Text>
                <Card className="p-4 mt-4">
                  <span className={styles.insideCardBodyHomeOneFirst}>
                    Magaziner en ligne
                  </span>
                </Card>
                <Card
                  className={`${styles.insideCardBodyHomeOneSecond} p-4 mt-5`}
                >
                  Consulter la circulaire
                </Card>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className={styles.cardBodyHome}>
              <Card.Body className={styles.cardBodyHomeTwo}>
                <Card.Title>Mon Dossier Santé</Card.Title>
                <Card.Text>
                  Renouvelez votre ordonnance en ligne ou transférez votre
                  dossier en quelques clics grâce à Mon Dossier Santé.
                </Card.Text>
                <Card className="p-4 mt-4">
                  <span className={styles.insideCardBodyHomeTwoFirst}>
                    Renouveler une ordonnance
                  </span>
                </Card>
                <Card
                  className={`${styles.insideCardBodyHomeTwoSecond} p-4 mt-5`}
                >
                  Transférer mon dossier
                </Card>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className={styles.cardBodyHome}>
              <Card.Body className={styles.cardBodyHomeThree}>
                <Card.Title>Services offerts</Card.Title>
                <Card.Text>
                  Cessation tabagique, infection urinaire, rhinite allergique et
                  plus encore! Découvrez plus de 90 services.
                </Card.Text>
                <Card className="p-4 mt-4">
                  <span className={styles.insideCardBodyHomeThreeFirst}>
                    Voir tous les services
                  </span>
                </Card>
                <Card
                  className={`${styles.insideCardBodyHomeThreeSecond} p-4 mt-5`}
                >
                  Prendre rendez-vous
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
