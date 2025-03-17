"use client"

import { useState } from "react";
import { Card, CardBody } from "reactstrap";


export default function GroupCreate() {
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleCreateGroup = (groupCode : String, groupName: string) => {

    //check if user has inputed a name and a code
    if(groupCode && groupName) {
      setErrorMessage("")
      fetch('http://localhost:4000/createGroup', {  // connects to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({groupName, groupCode}) 
      })
      .then(response => response.json())
      .then(data => {
        console.log('Backend response:', data);
      })
    } else {
      setErrorMessage("Input group code and name")
    }

  };

  return (
      <Card className="mt-8 p-4 border border-black rounded-lg shadow-lg">
        <CardBody className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Create Your Group</h2>
          <input
            placeholder="Enter Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <input
            placeholder="Enter Group Code"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <div className="flex gap-2">
            <button variant="outline" onClick={() => handleCreateGroup(groupCode, groupName)}>
              Create Group
            </button>
            {errorMessage && ( // Conditionally render the error message
          <p className="text-red-500">{errorMessage}</p>
        )}
          </div>
        </CardBody>
      </Card>
  );
}