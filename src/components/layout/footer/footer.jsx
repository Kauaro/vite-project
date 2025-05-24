import React from "react";
import './style.css';  // Certifique-se de que o arquivo style.css está no mesmo diretório

export default function Footer() {
  return (
    <footer>
      <div className="container">
        {/* Coluna 1 */}
        <div className="col-1">
          <img src="/logo.png" alt="Logo" />
          <p>
            Follow my instagram channel named mubashar_dev to see more of such projects and other posts. Also
            Like and share these posts. Also follow me on Github and Linkedin. I hope you will like my content.
          </p>
        </div>

        {/* Coluna 2 */}
        <div className="col-2">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Services</a></li>
          </ul>
        </div>

        {/* Coluna 3 */}
        <div className="col-3">
          <h3>Services</h3>
          <ul>
            <li><a href="#">HTML</a></li>
            <li><a href="#">CSS</a></li>
            <li><a href="#">JavaScript</a></li>
            <li><a href="#">React</a></li>
            <li><a href="#">Python</a></li>
            <li><a href="#">C++</a></li>
          </ul>
        </div>

        {/* Coluna 4 */}
        <div className="col-4">
          <h3>Newsletter</h3>
          <form>
            <i className="far fa-envelope"></i>
            <input type="email" placeholder="Enter your email" required />
            <button><i className="fas fa-arrow-right"></i></button>
          </form>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="footer-2">
        <p>© 2021 | Made with ❤️ by Mubashar Dev. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
