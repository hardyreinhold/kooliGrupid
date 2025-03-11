"use client"

import { useState } from "react";
import { Card, CardBody } from "reactstrap";


export default function GroupCreate() {
  const [groupCode, setGroupCode] = useState("");

  const handleCreateGroup = () => {
  };

  return (
      <Card className="mt-8 p-4 border border-black rounded-lg shadow-lg">
        <CardBody className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Create Your Group</h2>
          <input
            placeholder="Enter Group Code"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <div className="flex gap-2">
            <button variant="outline" onClick={handleCreateGroup}>
              Create Group
            </button>
          </div>
        </CardBody>
      </Card>
  );
}