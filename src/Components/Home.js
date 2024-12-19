
import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const HomePage = () => {

  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const categories = ["Food", "Transportation", "Entertainment", "Health", "Others"];


  const addExpense = (e) => {
    e.preventDefault();
    if (moneySpent && description && category) {
      setExpenses([
        ...expenses,
        { moneySpent, description, category, id: Date.now() },
      ]);
      setMoneySpent("");
      setDescription("");
      setCategory("");
    }
  };


  return (
    <>
   
   

      <h4>Your profile is incomplete! Please update your profile to continue <NavLink to='/profileupdate'>Click here to update</NavLink></h4>
      <Container className="mt-5">
      <h2>Expense Tracker</h2>
 
      <Form onSubmit={addExpense}>
        <Form.Group controlId="moneySpent">
          <Form.Label>Money Spent</Form.Label>
          <Form.Control
            type="number"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
            placeholder="Enter amount"
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>

  
      <h3 className="mt-4">All Expenses</h3>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Money Spent</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>${expense.moneySpent}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>



    </>
  );
};

export default HomePage;



