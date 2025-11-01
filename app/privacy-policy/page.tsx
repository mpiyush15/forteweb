export default function PrivacyPolicy() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto', 
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6'
    }}>
      <h1>Privacy Policy</h1>
      <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to Pixels Digital ("we," "our," or "us"). This Privacy Policy explains how we collect, 
        use, and protect your information when you use our Facebook Ads management application.
      </p>

      <h2>2. Information We Collect</h2>
      <p>When you use our application, we may collect:</p>
      <ul>
        <li>Your Facebook profile information (name, email address)</li>
        <li>Facebook Ad Account information you authorize us to access</li>
        <li>Campaign, ad set, and ad performance data from your Facebook Ad Accounts</li>
        <li>Usage data and analytics to improve our service</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and maintain our Facebook Ads management service</li>
        <li>Display your ad campaigns and performance metrics</li>
        <li>Authenticate and authorize your access to the application</li>
        <li>Improve and optimize our services</li>
        <li>Communicate with you about service updates</li>
      </ul>

      <h2>4. Data Storage and Security</h2>
      <p>
        We store your Facebook access tokens securely and encrypted in our database. 
        We implement industry-standard security measures to protect your data from unauthorized access.
      </p>

      <h2>5. Data Sharing</h2>
      <p>
        We do not sell, trade, or share your personal information with third parties except:
      </p>
      <ul>
        <li>When required by law or to comply with legal obligations</li>
        <li>To Facebook, as necessary to provide the service via Facebook's Marketing API</li>
        <li>With your explicit consent</li>
      </ul>

      <h2>6. Facebook Permissions</h2>
      <p>Our application requests the following Facebook permissions:</p>
      <ul>
        <li><strong>ads_management:</strong> To manage and create ads on your behalf</li>
        <li><strong>ads_read:</strong> To read and display your ad campaign data</li>
        <li><strong>business_management:</strong> To access Business Manager features</li>
      </ul>
      <p>
        You can revoke these permissions at any time through your Facebook settings at 
        <a href="https://www.facebook.com/settings?tab=applications" target="_blank" rel="noopener noreferrer">
          https://www.facebook.com/settings?tab=applications
        </a>
      </p>

      <h2>7. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active or as needed to provide services. 
        You may request deletion of your data at any time by contacting us.
      </p>

      <h2>8. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Withdraw consent for data processing</li>
        <li>Disconnect your Facebook account from our application</li>
      </ul>

      <h2>9. Cookies and Tracking</h2>
      <p>
        We may use cookies and similar tracking technologies to improve user experience 
        and analyze usage patterns.
      </p>

      <h2>10. Third-Party Services</h2>
      <p>
        Our application uses Facebook's Marketing API. Your use of Facebook is also governed by 
        Facebook's own privacy policy available at 
        <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer">
          https://www.facebook.com/privacy/explanation
        </a>
      </p>

      <h2>11. Children's Privacy</h2>
      <p>
        Our service is not directed to individuals under the age of 18. We do not knowingly 
        collect personal information from children.
      </p>

      <h2>12. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes 
        by posting the new policy on this page and updating the "Last updated" date.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices, please contact us at:
      </p>
      <ul>
        <li><strong>Email:</strong> privacy@pixelsdigital.com</li>
        <li><strong>Website:</strong> https://webhook-test-beta-five.vercel.app</li>
      </ul>

      <h2>14. Compliance</h2>
      <p>
        This Privacy Policy complies with Facebook Platform Terms and Meta's Platform Policy, 
        including requirements for user data protection and transparency.
      </p>
    </div>
  );
}
