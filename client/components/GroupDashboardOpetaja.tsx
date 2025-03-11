"use client"

import { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { motion } from "framer-motion";
import GroupCreate from "./GroupCreate";

const groups = [
  { id: 1, name: "Group A", members: ["Alice", "Bob", "Taavi"] , code: "1A" },
  { id: 2, name: "Group B", members: ["Charlie", "David"], code: "1B"},
  { id: 3, name: "Group C", members: ["Eve", "Frank"], code: "1C" },
];

export default function GroupDashboard() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const removePerson = () => {console.log("Person removed")}

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
                  onClick={() => removePerson(member)}
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