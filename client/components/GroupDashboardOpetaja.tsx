"use client"

import { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { m, motion } from "framer-motion";
import GroupCreate from "./GroupCreate";


export default function GroupDashboard() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

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

  const removePerson = (member:String, groupId: string) => {
      if(member) {
        fetch("http://localhost:4000/removePerson", {  // connects to backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({member, groupId
      
          }),
      })
      .then((response) => response.json())
        .then((data) => {
          console.log("Person removed")
          setTimeout(() => {
            window.location.reload();
          }, 1500);})
        
     } else {
      console.log("Failed to find member.")
     } 
  }

  

  return (
    <div className="p-6 bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
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
            {selectedGroup.members.map((member, index) => (
              <li key={index} className="flex justify-between items-center">
                {member}
                <button
                  className="ml-4 bg-red-500 m-1 text-white p-1 rounded"
                  onClick={() => removePerson(member, selectedGroup.id)}
                >
                  Remove
                </button>
                </li>
            ))}
          </ul>
          <button className="mt-4" onClick={() => setSelectedGroup(null)}>
            Close
          </button>
        </motion.div>
      )}

      <GroupCreate />
    </div>
  );
}