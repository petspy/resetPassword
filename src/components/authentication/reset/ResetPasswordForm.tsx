import { useState } from 'react';

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { validatePassword } from '../../../utils/utils';
import styles from './ResetPasswordForm.module.css';

const ResetPasswordForm = () => {
  const { register, handleSubmit } = useForm<ResetForm>();
  const [errors, setErrors] = useState<string[]>();

  const onSubmitHandler = (data: ResetForm) => {
    alert('Password submitted successfully!');
  };

  return (
    <Row className={styles.form}>
      <Col xs={12}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
              <Form.Group>
                <Form.Label>Reset Password</Form.Label>
                <Form.Control
                  {...register('password', {
                    validate: (value) => {
                      const validationResult = validatePassword(value);
                      setErrors(validationResult.errors);
                      return validationResult.isValid;
                    },
                  })}
                  // type="password" - commented out for the ease of POC testing
                  placeholder="Please enter your new password"
                  required
                />
              </Form.Group>
              <div className={styles.container}>
                {errors?.map((error, index) => (
                  <li key={index} className={styles.error}>
                    {error}
                  </li>
                ))}
              </div>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPasswordForm;
