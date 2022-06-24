import * as React from "react"
import hero from "./hero.png"
import footer from "./codepath.svg"
import "./Footer.css"

export default function Footer(props) {
    return (
      <div className="footer">
        <div id="about">
            <div class="paragraph">
                <p>The codepath student store offers great products at great prices from a great team and for a great cause. 
                We've searched far and wide for items that perk the interests of even the most eccentric students and
                decided to offer them all here in one place. All proceeds go towards bringing high quality CS education
                to college students around the country. </p>
                <br></br>
                <p id="contact">
                Contact us! <br></br>
                Email: code@path.org <br></br>
                Phone: 1-800-CODEPATH <br></br>
                Address: 123 Fake Street, San Francisco, CA <br></br>
                Socials:
                <div id="icons">
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-linkedin"></i>
                </div>
                </p>

            </div>
            <img className="about-img" src={footer} />
        </div>
        <div id="footer">
            <div className="intro"><h1>Thank you!</h1></div>
            <div className="intro paragraph"><p>Yay! Thank you for visiting. More products will be available soon(ish)!</p></div>
            <img className="footer-img" src={hero} />
        </div>
      </div>
    )
  }