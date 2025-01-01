import React, { useState } from "react";

const RoleSelection = () => {
  // State to manage the selected role
  const [selectedRole, setSelectedRole] = useState("customer");

  // Handle change in radio button selection
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="flex flex-row space-x-4 items-center p-6">
      <span className="text-sm font-medium text-gray-700">Role:</span>
      
      {/* Customer Radio Button */}
      <label className="flex items-center space-x-1">
        <input
          type="radio"
          name="role"
          value="customer"
          checked={selectedRole === "customer"}
          onChange={handleRoleChange}
          className="h-4 w-4 border-gray-300"
        />
        <span className="text-sm">Customer</span>
      </label>

      {/* Driver Radio Button */}
      <label className="flex items-center space-x-1">
        <input
          type="radio"
          name="role"
          value="driver"
          checked={selectedRole === "driver"}
          onChange={handleRoleChange}
          className="h-4 w-4 border-gray-300"
        />
        <span className="text-sm">Driver</span>
      </label>

      {/* Mover Radio Button */}
      <label className="flex items-center space-x-1">
        <input
          type="radio"
          name="role"
          value="mover"
          checked={selectedRole === "mover"}
          onChange={handleRoleChange}
          className="h-4 w-4 border-gray-300"
        />
        <span className="text-sm">Mover</span>
      </label>
    </div>
  );
};

export default RoleSelection;
