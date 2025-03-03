import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./contact.css";

const Contact = () => {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    Name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    subject: Yup.string()
      .min(5, "Subject must be at least 5 characters")
      .required("Subject is required"),
    Message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  // Form Submit Handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(
        "https://react-ecommerce-contact-default-rtdb.firebaseio.com/Message.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        alert("Message Sent Successfully");
        resetForm();
      } else {
        alert("Error Occurred! Message sending failed");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="form">
          <h2>#contact us</h2>
          <Formik
            initialValues={{ Name: "", email: "", subject: "", Message: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="box">
                  <div className="label">
                    <h4>Name</h4>
                  </div>
                  <div className="input">
                    <Field type="text" name="Name" placeholder="Name" />
                    <ErrorMessage
                      name="Name"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="box">
                  <div className="label">
                    <h4>E-mail</h4>
                  </div>
                  <div className="input">
                    <Field type="email" name="email" placeholder="E-mail" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="box">
                  <div className="label">
                    <h4>Subject</h4>
                  </div>
                  <div className="input">
                    <Field type="text" name="subject" placeholder="Subject" />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="box">
                  <div className="label">
                    <h4>Message</h4>
                  </div>
                  <div className="input">
                    <Field
                      as="textarea"
                      name="Message"
                      placeholder="Message!"
                    />
                    <ErrorMessage
                      name="Message"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Contact;
