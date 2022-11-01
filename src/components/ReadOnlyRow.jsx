import React from "react";
import "./ReadOnlyRow.css"

const ReadOnlyRow = ({ expense, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{expense.expense}</td>
      <td>{expense.value}</td>
      <td>{expense.category}</td>

      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, expense)
          }
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(expense.id)} className="delete">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
