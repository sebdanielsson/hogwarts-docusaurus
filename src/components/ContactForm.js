import React from 'react';
import styles from './ContactForm.module.css';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("mdozlgpe");
  if (state.succeeded) {
    return (
      <section className={styles.features}>
        <div className="container">
          <p className={styles.submitsuccess}>Thanks for reaching out!</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.features}>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input className={styles.input} id="email" type="email" name="email" placeholder="Email" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <textarea className={styles.textarea} id="message" name="message" placeholder="Message" />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
          <button className={styles.button} type="submit" disabled={state.submitting}>Submit</button>
        </form>
      </div>
    </section>
  );
}

function App() {
  return (
    <ContactForm />
  );
}

export default App;
