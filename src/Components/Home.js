import { DataContext } from "../store/ContextProvider";
import React, { useState, useContext } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [amount, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editIndex, setEditIndex] = useState(null);  
  const [editAmount, setEditAmount] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const expenseCtx = useContext(DataContext);

  const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Health",
    "Vacation",
    "Others",
  ];


  const addExpense = (e) => {
    e.preventDefault();
    if (amount && description && category) {
      expenseCtx.setExpenses([
        ...expenseCtx.expenses,
        {
          amount,
          description,
          category,
          id: expenseCtx.expenses.length === 0 ? 1 : expenseCtx.expenses.length + 1,
        },
      ]);
      setMoneySpent("");
      setDescription("");
      setCategory("");
    }
  };

  const deleteExpense = (id) => {
    expenseCtx.setExpenses(expenseCtx.expenses.filter((expense) => expense.id !== id));
  };

  const startEditing = (expense, index) => {
    setEditIndex(index);
    setEditAmount(expense.amount);
    setEditDescription(expense.description);
    setEditCategory(expense.category);
  };

  const saveEdit = () => {
    const updatedExpenses = expenseCtx.expenses.map((expense, index) =>
      index === editIndex
        ? { ...expense, amount: editAmount, description: editDescription, category: editCategory }
        : expense
    );
    expenseCtx.setExpenses(updatedExpenses);
    setEditIndex(null);  
    setEditAmount("");
    setEditDescription("");
    setEditCategory("");
  };

  return (
    <>
      <h4>
        Your profile is incomplete! Please update your profile to continue{" "}
        <NavLink to="/profileupdate">Click here to update</NavLink>
      </h4>
      <Container className="mt-5">
        <h2>Expense Tracker</h2>

        <Form onSubmit={addExpense}>
          <Form.Group controlId="moneySpent">
            <Form.Label>Money Spent</Form.Label>
            <Form.Control
              type="number"
              value={amount}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenseCtx.expenses.map((expense, index) => (
              <tr key={expense.id}>
                <td>{index + 1}</td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                  ) : (
                    `$${expense.amount}`
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      <option value="">Select a Category</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  ) : (
                    expense.category
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <Button variant="success" onClick={saveEdit}>
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button variant="warning" onClick={() => startEditing(expense, index)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="ml-2"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default HomePage;
