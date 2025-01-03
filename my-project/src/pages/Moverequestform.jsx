import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Address from "../component/address";

const MoveRequestForm = () => {
  // State for form fields
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [moveDate, setMoveDate] = useState("");
  const [moveTime, setMoveTime] = useState(""); // New state for time
  const [typeOfMove, setTypeOfMove] = useState("");
  const [vehicleRequired, setVehicleRequired] = useState("");
  const [hoursOfService, setHoursOfService] = useState("");
  const [moverRequired, setMoverRequired] = useState(false);
  const [moverHours, setMoverHours] = useState("");
  const [additionalServices, setAdditionalServices] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [inventoryList, setInventoryList] = useState("");
  const [insuranceRequired, setInsuranceRequired] = useState(false);
  const [timingPreferences, setTimingPreferences] = useState("");
  const [accessDetails, setAccessDetails] = useState("");
  const [packingSupplies, setPackingSupplies] = useState(false);
  const [petOrPlantDetails, setPetOrPlantDetails] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [paymentPreferences, setPaymentPreferences] = useState("");
  const [followUpServices, setFollowUpServices] = useState([]);
  const [indemnityAgreement, setIndemnityAgreement] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      fromLocation,
      toLocation,
      moveDate,
      moveTime, // Include moveTime in the console log
      typeOfMove,
      vehicleRequired,
      hoursOfService,
      moverRequired,
      moverHours,
      additionalServices,
      specialInstructions,
      inventoryList,
      insuranceRequired,
      timingPreferences,
      accessDetails,
      packingSupplies,
      petOrPlantDetails,
      budgetRange,
      contactName,
      contactPhone,
      contactEmail,
      paymentPreferences,
      followUpServices,
      indemnityAgreement,
    });
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Link back to Customer Dashboard */}
        <Link
          to="/CustomerDashboard"
          className="text-teal-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block"
        >
          &larr; Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-center text-teal-600 mb-8">
          Plan Your Move with Ease
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Moving Locations */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Moving Locations
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-1">Moving From</label>
                <Address value={fromLocation} onChange={setFromLocation} />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Moving To</label>
                <Address value={toLocation} onChange={setToLocation} />
              </div>
            </div>
          </div>

          {/* Move Details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Move Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-gray-700">Move Date</span>
                <input
                  type="date"
                  value={moveDate}
                  onChange={(e) => setMoveDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Preferred Move Time</span>
                <input
                  type="time"
                  value={moveTime}
                  onChange={(e) => setMoveTime(e.target.value)} // Handle move time
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Type of Move</span>
                <select
                  value={typeOfMove}
                  onChange={(e) => setTypeOfMove(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Full House Move">Full House Move</option>
                  <option value="Equipment Move">Equipment Move</option>
                  <option value="Apartment Move">Apartment Move</option>
                  <option value="Office Move">Office Move</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Vehicle Required</span>
                <select
                  value={vehicleRequired}
                  onChange={(e) => setVehicleRequired(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Small Van">Small Van</option>
                  <option value="Medium Truck">Medium Truck</option>
                  <option value="Large Moving Truck">Large Moving Truck</option>
                  <option value="Specialized Vehicle">Specialized Vehicle</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Hours of Service Needed</span>
                <input
                  type="number"
                  value={hoursOfService}
                  onChange={(e) => setHoursOfService(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Additional Services
            </h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={moverRequired}
                  onChange={(e) => setMoverRequired(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">
                  Mover Assistance Required
                </span>
              </label>
              {moverRequired && (
                <label className="block">
                  <span className="text-gray-700">Mover Hours Needed</span>
                  <input
                    type="number"
                    value={moverHours}
                    onChange={(e) => setMoverHours(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </label>
              )}
              <label className="block">
                <span className="text-gray-700">Additional Services</span>
                <select
                  multiple
                  value={additionalServices}
                  onChange={(e) =>
                    setAdditionalServices(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Packing">Packing</option>
                  <option value="Unpacking">Unpacking</option>
                  <option value="Furniture Assembly">Furniture Assembly</option>
                  <option value="Storage">Storage</option>
                </select>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-200 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Get a Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoveRequestForm;
