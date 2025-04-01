"use client";

import { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { motion } from "framer-motion";
import { data } from "framer-motion/client";

interface Group {
  name: string;
  members: string[];
  code: string;
}

export default function GroupDashboard() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleJoinGroup = (groupCode: String, personName: string) => {
    //check if user has inputed a name and a code
    if (groupCode && personName) {
      setErrorMessage("");
      fetch("http://localhost:4000/joinGroup", {
        // connects to backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ personName, groupCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Backend response:", data);
          if (data.message == "Code is wrong")
            setErrorMessage("Recived code is wrong");
          else {
            setSuccessMessage(data.message)
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          };
        });
    } else {
      setErrorMessage("Input group code and name");
    }
  };

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch("http://localhost:4000/getFirestoreObject");
        const data = await res.json();
        if (data) {
          setGroups(Array.isArray(data) ? data : [data]); // Ensure it's an array
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }

    fetchGroups();
  }, []);

  return (
    <div className="p-6 bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group: Group) => (
          <Card
            key={group.id}
            className="cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedGroup(group)}
          >
            <CardBody className="p-4 border border-black rounded-lg">
              <h2 className="text-xl font-semibold">{group.name}</h2>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedGroup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 border border-black rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold">{selectedGroup.name} Members</h2>
          <ul className="list-disc pl-6 mt-2">
            {selectedGroup.members.map((member: String, index: number) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <button className="mt-4" onClick={() => setSelectedGroup(null)}>
            Close
          </button>
        </motion.div>
      )}

      <div className="mt-8 p-4 border border-black rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Join a Group</h2>
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <input
          placeholder="Group Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-2"
        />
        <button onClick={() => handleJoinGroup(code, name)}>Join</button>
        {errorMessage && ( // Conditionally render the error message
          <p className="text-red-500">{errorMessage}</p>
        )}
        {successMessage && ( // Conditionally render the success message
          <p className="text-green-500">{successMessage}</p>
        )}
      </div>
    </div>
  );
}
