import { Link } from "react-router-dom";
import React,{Fragment} from 'react'
import "../about.css"
import { useTranslation } from "react-i18next";
function About() {
  const { t, i18n } = useTranslation();
  return (

    <Fragment>
     <section className= "about">
       <div className="row">
         <div className="column">
          <div className="about-img"></div>
         </div>
         <div className="column">
          <div className="tabs">
            <div className="single-tab">
              <h2>About</h2>
            </div>
            <div className="single-tab">
              <h2>Skills</h2>
            </div>
            <div className="single-tab">
              <h2>Experience</h2>
            </div>
          </div>
         </div>
          <div className="tab-content">
            {/*about content*/}
            <div className="content active-content">
              <h2>{t("About us")}</h2>
              <p>{t("Welcome to our web-based market data analysis system! We are a dedicated team of students who have come together to create an accessible and user-friendly platform for market data analysis. Our mission is to empower users with the tools and insights they need to make informed decisions in the dynamic world of financial markets.")}</p>
                <h3>{t("Team Members")}</h3>
                </div>
                <div className="home-card-image">
        </div>
        <div className="home-card-image2">
        </div>
        <div className="home-card-image3">
        </div>
        <div className="home-card-image4">
        </div>
          <div className="team1">
            <table>
            <tr>
            <h3>{t("Wongel Dawit")}</h3>
            <p>{t("Backend Developer: Wongel is a computer science student with a passion for data analysis and backend development.He brings his expertise in data manipulation and algorithm design to ensure a robust and efficient system.")}</p>
               </tr>
              <tr>
            <h3>{t("Yisak Mebrate")}</h3>
            <p> {t("Project Manager and Backend Developer: Yisak is also computer science student with a leading ability. He brings his epertise by organising projects and assisting in the front end.")}</p>
              </tr>
            <tr>
            <h3>{t("Yonas Abera")}</h3>
            <p> {t("User Interface Designer: Yonas is a creative and detail-oriented student and UI designer. he specializes in creating intuitive and visually appealing user interfaces using react and css designings.")}</p>
               </tr>
              <tr>
            <h3>{t("Zidan Nuhussen")}</h3>
            <p>{t("Front end Designer: Zidan is a student and frontend designer with many qualities. He specializes in figma and react website designing and visually appealing user interfaces to enhance the user experience of our market data analysis system.")}
            </p>
            </tr>
            </table>
            </div>
              {/* Skills Content */}
              <div className="content">
              <h2>{t("Project Background")}</h2>
              <p>{t("Our market data analysis system was developed as part of our term project in web design and development course on our computer science program. Over the course of several weeks, we dedicated ourselves to designing and building a solution that would simplify market data analysis for users of all backgrounds")}</p>
                    <div className="skills-row">
                      <h3>{t("Features and Functionality")}</h3>
                      <p>{t("Our market data analysis system offers a comprehensive set of features to support users in their data exploration and decision-making process. Some of the key features include:")}</p> 
                      <div className="skills-column">
                        <div className="progress-wrap">
                          <h3>{t("Real-time data visualization and charting")} <span>100%</span></h3>
                          <div className="progress">
                            <div className="progress-bar"> 
                            </div>

                          </div>
                        </div>
                      </div>

                      <div className="skills-column">
                        <div className="progress-wrap2">
                          <h3>{t("Historical data analysis and trend identification")}<span>100%</span></h3>
                          <div className="progress">
                            <div className="progress-bar">
                            </div>

                          </div>
                        </div>
                      </div>

                      <div className="skills-column">
                        <div className="progress-wrap3">
                          <h3>{t("Comparative analysis of multiple securities")}<span>100%</span></h3>
                          <div className="progress">
                            <div className="progress-bar">
                            </div>

                          </div>
                        </div>
                      </div>

                      <div className="skills-column">
                        <div className="progress-wrap4">
                          <h3>{t("Customizable alerts and notifications")}<span>100%</span></h3>
                          <div className="progress">
                            <div className="progress-bar">
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
            </div>
               {/*Experience content*/}
            <div className="content">
             <div className="exp-column">
              <h3>{t("Design and User Experience")}</h3>
              <span>{t("100% User friendly")}</span>
              <p>{t("We are committed to providing an exceptional user experience. Our system incorporates user-centered design principles, ensuring that every feature and interaction is intuitive and easy to navigate. Throughout the development process,we conducted extensive user testing and gathered feedback to refine the interface and optimize usability.")}</p>
             </div>

             <div className="exp-column">
              <h3>{t("Future Development")}</h3>
              <span>{t("Big demand in 2030")}</span>
              <p>{t("We believe in the potential for continuous improvement and growth. In the future, we plan to expand our system by incorporating advanced machine learning techniques for predictive analysis and implementing additional data sources. We are committed to staying at the forefront of market analysis technology and providing an ever-evolving platform for our users.")}</p>
             </div>

             <div className="exp-column2">
              <h3>{t("Contact Us")}</h3>
              <span><Link to="/contact" className="nav-link">
                {t("Contact")}
              </Link></span>
              <p>{t("We welcome any inquiries, feedback, or collaboration opportunities. Please feel free to reach out to us at [email protected]. We look forward to hearing from you and helping you unlock the power of market data analysis.")}</p>
             </div>
            </div>


          </div>

       </div>

     </section>
      
    </Fragment>
    
   
   
  )
}

export default About
