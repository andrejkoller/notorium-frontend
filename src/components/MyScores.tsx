import { Card } from "@chakra-ui/react";

export default function MyScores() {
  return (
    <Card.Root className="my-scores-card">
      <Card.Header className="my-scores-header">
        <h1 className="my-scores-title">My Scores</h1>
      </Card.Header>
      <Card.Body className="my-scores-body">
        <p className="my-scores-content">
          This is where your scores will be displayed.
        </p>
      </Card.Body>
    </Card.Root>
  );
}
