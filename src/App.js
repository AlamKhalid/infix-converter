import "./App.css";
import { useState } from "react";
import { Container, Row, Col, Input, Form, Button } from "reactstrap";
import {
  infixToPostfix,
  infixToPrefix,
  postfixToInfix,
  postfixToPrefix,
  prefixToPostfix,
  prefixToInfix,
} from "./util/conversion";

function App() {
  const [toOptions, setToOptions] = useState([
    { val: "pre", text: "Prefix" },
    { val: "post", text: "Postfix" },
  ]);
  const [fromOptions] = useState([
    { val: "in", text: "Infix" },
    { val: "pre", text: "Prefix" },
    { val: "post", text: "Postfix" },
  ]);
  const [from, setFrom] = useState(fromOptions[0]);
  const [to, setTo] = useState(toOptions[0]);
  const [exp, setExp] = useState("");
  const [output, setOutput] = useState("");

  const handleFrom = ({ currentTarget }) => {
    const val = currentTarget.value;
    switch (val) {
      case "in":
        setToOptions([
          { val: "pre", text: "Prefix" },
          { val: "post", text: "Postfix" },
        ]);
        setFrom({ val: "in", text: "Infix" });
        break;
      case "pre":
        setToOptions([
          { val: "in", text: "Infix" },
          { val: "post", text: "Postfix" },
        ]);
        setFrom({ val: "pre", text: "Prefix" });
        break;
      case "post":
        setToOptions([
          { val: "pre", text: "Prefix" },
          { val: "in", text: "Infix" },
        ]);
        setFrom({ val: "post", text: "Postfix" });
        break;
      default:
    }
  };
  const handleTo = ({ currentTarget }) => {
    switch (currentTarget.value) {
      case "in":
        setTo({ val: "in", text: "Infix" });
        break;
      case "pre":
        setTo({ val: "pre", text: "Prefix" });
        break;
      case "post":
        setTo({ val: "post", text: "Postfix" });
        break;
      default:
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    switch (from.val) {
      case "in":
        switch (to.val) {
          case "pre":
            setOutput(infixToPrefix(exp));
            break;
          case "post":
            setOutput(infixToPostfix(exp));
            break;
          default:
        }
        break;
      case "pre":
        switch (to.val) {
          case "in":
            setOutput(prefixToInfix(exp));
            break;
          case "post":
            setOutput(prefixToPostfix(exp));
            break;
          default:
        }
        break;
      case "post":
        switch (to.val) {
          case "in":
            setOutput(postfixToInfix(exp));
            break;
          case "pre":
            setOutput(postfixToPrefix(exp));
            break;
          default:
        }
        break;
      default:
    }
  };

  return (
    <div className="bg-color">
      <h1 className="pb-5">Prefix Infix Postfix Converter</h1>
      <Container>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col>
              <Input type="select" value={from.val} onChange={handleFrom}>
                {fromOptions.map((op) => (
                  <option value={op.val} key={op.val}>
                    {op.text}
                  </option>
                ))}
              </Input>
            </Col>
            <Col>
              <h2>TO</h2>
            </Col>
            <Col>
              <Input type="select" onChange={handleTo} defaultValue={to.val}>
                {toOptions.map((op) => (
                  <option value={op.val} key={op.val}>
                    {op.text}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
          <p className="my-4">
            Note: It works with both numbers and alphabets. In case of numbers
            only provide numbers less than 10.
          </p>
          <Input
            type="text"
            value={exp}
            onChange={({ currentTarget }) => setExp(currentTarget.value)}
            placeholder={`Enter ${from.text} Notation`}
          />
          <br />
          <Button color="danger">Convert</Button>
        </Form>
        <div className="output mt-4">
          <h4>Output</h4>
          <h6>{output}</h6>
        </div>
      </Container>
    </div>
  );
}

export default App;
