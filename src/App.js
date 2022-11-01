import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data1 from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Alert from "./components/Alert"
import ApexChart from "./HomePage/HomePage";
import Header from "./components/header";
import swal from "sweetalert";

const App = () => {
  const [addFormData, setAddFormData] = useState({
    expense: "",
    value: "",
    category: "",
    budget: "",
  });

  const [expenses, setexpenses] = useState(data1);


  // const value = expenses.map(item => {return item.value})
  // const name = expenses.map(item => {return item.expense})
  // const [values,setvalues]=useState()
  // const [names,setnames]=useState()
  const [data, setdata] = useState({ value: [], name: [] })
  const [chartdata, setchartdata] = useState([[1000, 25], ["iphone", "bigmac"]])

  // console.log(valuess)
  // console.log(namess)
  const [alert, setAlert] = useState({ show: false });

  useEffect(() => {
    setchartdata([expenses.map((item) => item.value), expenses.map((item) => item.expense)])


  }, [expenses])


  useEffect(() => {
    setdata({ value: chartdata.value, name: chartdata.name })
    console.log(data, "jjjj")
    console.log(chartdata, "jjjjjjjjjj")

  }, [chartdata])



  const [editFormData, setEditFormData] = useState({
    expense: "",
    value: "",
    category: "",

  });

  const [editexpenseId, setEditexpenseId] = useState(null);
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;


    setAddFormData(newFormData);


  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newexpense = {
      id: nanoid(),
      expense: addFormData.expense,
      value: addFormData.value,
      category: addFormData.category,
      budget: addFormData.budget,
    };

    setexpenses(expenses => [...expenses, newexpense]);
    handleAlert({ type: "success", text: "charge added successfully" });


  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedexpense = {
      id: editexpenseId,
      expense: editFormData.expense,
      value: editFormData.value,
      category: editFormData.category,

    };

    const newexpenses = [...expenses];

    const index = expenses.findIndex((expense) => expense.id === editexpenseId);

    newexpenses[index] = editedexpense;

    setexpenses(newexpenses);
    setEditexpenseId(null);
  };

  const handleEditClick = (event, expense) => {
    event.preventDefault();
    setEditexpenseId(expense.id);

    const formValues = {
      expense: expense.expense,
      value: expense.value,
      category: expense.category,

    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditexpenseId(null);
  };

  const handleDeleteClick = (expenseId) => {
    const newexpenses = [...expenses];

    const index = expenses.findIndex((expense) => expense.id === expenseId);

    newexpenses.splice(index, 1);

    setexpenses(newexpenses);
    handleAlert({ type: "success", text: "item deleted !" });

  };
  const handleClear = () => {
    setexpenses([]);
    handleAlert({ type: "success", text: "EXPENSE list cleared !" });

  };
  return (
    <div className="all">
      <Header />
      <div className="container">

        <div className="myForm">
          <form onSubmit={handleAddFormSubmit} id="myForm">

            <input
              type="number"
              name="budget"
              placeholder="Enter a budget..."
              onChange={handleAddFormChange}
            />

            <legend>Add an expense</legend>
            <input
              type="text"
              name="expense"
              required="required"
              placeholder="Enter an expense ..."
              value={addFormData['exp']}
              onChange={handleAddFormChange}
            />
            <input
              type="number"
              name="value"
              required="required"
              placeholder="Enter a value..."
              value={addFormData['pri']}
              onChange={handleAddFormChange}
            />
            <select name="category" value={addFormData['cat']} onChange={handleAddFormChange}>
              <option disabled selected>select une categorie</option>
              <option value="Eat Out" >Eat Out</option>
              <option value="Rent" >Rent</option>
              <option value="Gas" >Gas</option>
              <option value="Subscriptions" >Subscriptions</option>
              <option value="Phone" >Phone</option>
              <option value="Insurance" >Insurance</option>
            </select>
            <button type="submit" className="add">Add</button>
            <button onClick={handleClear} className="clear">
              Clear all items
            </button>
          </form>

          <h3>
            total spending :{" "}
            <span className="total">
              $
              {expenses.reduce((acc, curr) => {
                return (acc += parseInt(curr.value));
              }, 0)}
            </span>
          </h3>
          <h3>
            total budget :{" "}
            <span className="totalB">
              $
              {expenses.reduce((acc, curr) => {
                return ((acc -= parseInt(curr.value))+(acc += parseInt(curr.budget)));
              }, 0)}
            </span>
          </h3>
        </div>
        <div className="tab">

          <form onSubmit={handleEditFormSubmit} id="tab">
            <table>
              <thead>
                <tr>
                  <th>expense</th>
                  <th>value</th>
                  <th>category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <Fragment>
                    {editexpenseId === expense.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        expense={expense}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>


        </div>

        <br />
        <div className="chartjs">
          <div className="chart" >
            <ApexChart dat={chartdata} />
          </div>
        </div>


      </div>
    </div>

  );
};

export default App;
