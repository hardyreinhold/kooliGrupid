import { useState } from "react";
import { Card, CardBody } from "reactstrap";


export default function GroupCreate() {
  const [groupCode, setGroupCode] = useState("");

  const handleJoinGroup = () => {
  };

  return (
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardBody className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Create Your Group</h2>
          <input
            placeholder="Enter Group Code"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={handleJoinGroup}>Join Group</button>
            <button variant="outline">
              Create Group
            </button>
          </div>
        </CardBody>
      </Card>
  );
}