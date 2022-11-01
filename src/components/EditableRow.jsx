import React from "react";
import "./EditableRow.css";
const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter en expense..."
          name="expense"
          value={editFormData.expense}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Enter an value..."
          name="value"
          value={editFormData.value}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <select value={editFormData.category}
          onChange={handleEditFormChange}
          name="category">
          <option value="Eat Out" >Eat Out</option>
          <option value="Rent" >Rent</option>
          <option value="Gas" >Gas</option>
          <option value="Subscriptions" >Subscriptions</option>
          <option value="Phone" >Phone</option>
          <option value="Insurance" >Insurance</option>
        </select>
  
      </td>

      <td>
        <button type="submit">Save</button>
        <button type="button"  onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
