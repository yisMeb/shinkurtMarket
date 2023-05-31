import React from "react"; 
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "../content_option"
import "../about.css"
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  return (
    
      <Container>
        <Row className="mb-5 mt-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact us</h1>
          </Col>
        </Row>
        <div className="immg"></div>
        <Row className="sec_sp">
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">{t("Get in touch")}</h3>
            <address>
              <strong>{t("Email: ")}</strong>
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                <p>
                  <strong>{t("Phone: ")}</strong> {contactConfig.YOUR_FONE}
                </p>
              ) : (
                ""
              )}
            </address>
            <p>{t("We are here to help! We will get back to you as soon as possible.")}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form  className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder={t("Name")} 
                    type="text"
                    required 
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder={t("Email")}
                    type="email" 
                    required 
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder={t("Message")}
                rows="5" 
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit"> 
                  {t("Send")}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
  );
}
