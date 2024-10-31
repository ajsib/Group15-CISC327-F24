/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  margin-top: 200px;
  background-color: var(--color-component-bg);
  color: var(--color-text);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid var(--color-border);

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
  }

  .footer-section {
    flex: 1 1 250px;
    margin: 10px;
  }

  .footer-section h4 {
    color: var(--color-primary);
    font-size: 18px;
    margin-bottom: 10px;
  }

  .footer-links a {
    color: var(--color-link);
    text-decoration: none;
    margin: 5px 0;
    display: block;

    &:hover {
      color: var(--color-secondary);
    }
  }

  .footer-contact p {
    margin: 5px 0;
    color: var(--color-muted);
  }

  .footer-socials {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .footer-socials a {
    color: var(--color-primary);
    font-size: 24px;
    text-decoration: none;

    &:hover {
      color: var(--color-secondary);
    }
  }

  .footer-bottom {
    margin-top: 20px;
    font-size: 14px;
    color: var(--color-muted);
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <footer css={footerStyles}>
      <div className="footer-content">
        <div className="footer-section footer-links">
          <h4>Quick Links</h4>
          <Link href="/about">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="footer-section footer-contact">
          <h4>Contact Us</h4>
          <p>1234 Main St</p>
          <p>City, State, Zip</p>
          <p>Email: info@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section footer-socials">
          <h4>Follow Us</h4>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            {/* Replace with actual social media icons */}
            <span>🔵</span>
          </a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <span>🔷</span>
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <span>📸</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Example Company. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
