import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MoveStatus = ({ title, columnHeaders, endpoint }) => {
    const [historyData, setHistoryData] = useState([]);

    // Fetch the last 10 records from the backend (using the dynamic endpoint)
    useEffect(() => {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                // Limit the data to the last 10 records
                setHistoryData(data.slice(-10));
            })
            .catch(error => {
                console.error("Error fetching move status data:", error);
            });
    }, [endpoint]);

    // Function to create a column for displaying data
    const createColumn = (header, value) => (
        <div className="w-80 px-20 py-5 border border-stone-500 justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-black text-xl font-semibold font-['Open Sans']">{header}</div>
            <div className="text-center text-black text-xl font-normal font-['Open Sans']">{value}</div>
        </div>
    );

    return (
        <div className="flex-col justify-start items-center gap-9 inline-flex">
            {/* Display dynamic title */}
            <div className="self-stretch text-center text-black text-5xl font-bold font-['Open Sans']">
                {title || "Current Move Status (If Applicable)"}
            </div>
            <div className="self-stretch justify-start items-center inline-flex">
                {historyData.map((item, index) => (
                    <div key={index} className="flex-col justify-center items-start inline-flex">
                        {columnHeaders.map((header, idx) => {
                            // Dynamically generate the column based on the header
                            const itemKey = header.toLowerCase().replace(/ /g, ''); // Assuming the field name in `item` matches the header name (lowercase and no spaces)
                            return createColumn(header, item[itemKey] || "N/A");
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

MoveStatus.propTypes = {
  title: PropTypes.string.isRequired,
  columnHeaders: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};


export default MoveStatus;




