"use client";

import Link from "next/link";
import Form from "../../src/components/Form";
import { FormEvent, useState } from "react";

enum State {
  IDLE = "IDLE",
  SUBMITTED = "SUBMITTED",
  ERROR = "ERROR",
}

export default function Page() {
  const [submissionState, setSubmissionState] = useState(State.IDLE);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/v1/tickets", {
      method: "POST",
      body: formData,
    });

    setSubmissionState(response.ok ? State.SUBMITTED : State.ERROR);
  };

  const renderData = (state: State) => {
    switch (state) {
      case State.SUBMITTED:
        return <h3>Ticket submitted correctly!</h3>;
      case State.ERROR:
        return <h3>There was an error submitting ticket!</h3>;
      case State.IDLE:
      default:
        return <Form onSubmit={handleSubmit} />;
    }
  };

  return (
    <div>
      <h1>Create ticket</h1>
      <Link href="/">Go back</Link>
      {renderData(submissionState)}
    </div>
  );
}
