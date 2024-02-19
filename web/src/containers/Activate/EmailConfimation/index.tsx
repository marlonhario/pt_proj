import React from 'react';
import { Container, Row } from 'reactstrap';
import EmailConfirmationCard from './components/EmailConfirmationCard';

const EmailConfirmation = () => (
  <Container className="EmailConfirmation__container">
    <Row>
      <EmailConfirmationCard />
    </Row>
  </Container>
);

export default EmailConfirmation;
