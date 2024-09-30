import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light text-dark mt-5">
      <hr />
      <Container>
        <Row>
          <Col
            className="text-center py-3"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <a
              href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=508088"
              target="_blank"
              rel="Conditions of Use"
              style={{
                textDecoration: "none",
              }}
            >
              Conditions of Use
            </a>
            <a
              href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=468496"
              target="_blank"
              rel="Privacy Notice"
              style={{
                textDecoration: "none",
              }}
            >
              Privacy Notice
            </a>
            <a
              href="https://www.amazon.com/help"
              target="_blank"
              rel="Help"
              style={{
                textDecoration: "none",
              }}
            >
              Help
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center pb-5">
            &copy; 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its
            affiliates
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
