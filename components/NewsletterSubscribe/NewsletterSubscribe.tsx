import React from "react";

import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./NewsletterSubscribe.styles";

const NewsletterSubscribe: React.FC = () => (
  <>
    <div className="newsletter-subscribe">
      <h3>Subscribe to be the first to know about updates</h3>
      <form>
        <Input />
        <Button />
      </form>
    </div>
    <style jsx>{styles}</style>
  </>
);

export default NewsletterSubscribe;
