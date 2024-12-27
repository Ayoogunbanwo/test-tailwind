// RoleSelection.js
import React from "react";

const RoleSelection = () => {
  return (
    <div className="flex flex-row space-x-4 items-center p-6">
      <span className="text-sm font-medium text-gray-700">Role:</span>
      <label className="flex items-center space-x-1">
        <input
          type="radio"
          name="role"
          value="customer"
          defaultChecked
          className="h-4 w-4 border-gray-300"
        />
        <span className="text-sm">Customer</span>
      </label>
      <label className="flex items-center space-x-1">
        <input
          type="radio"
          name="role"
          value="driver"
          className="h-4 w-4 border-gray-300"
        />
        <span className="text-sm">Driver</span>
      </label>
      <label className="flex items-center space-x-1">
        <input
          type="radio"
          name="role"
          value="mover"
          className="h-4 w-4 border-gray-300"
        />
        <span className="text-sm">Mover</span>
      </label>
    </div>
  );
};

export default RoleSelection;
