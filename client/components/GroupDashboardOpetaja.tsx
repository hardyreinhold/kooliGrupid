"use client"

import { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { m, motion } from "framer-motion";
import GroupCreate from "./GroupCreate";

interface Group {
  id: string;
  name: string;
  members: string[];
  courses?: string[];
}

interface Course {
  id: string;
  name: string;
}


export default function GroupDashboard() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const[availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
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

    useEffect(() => {
      async function fetchCourses() {
        try {
          const res = await fetch("http://localhost:4000/getCourses");
          const data = await res.json();
          setAvailableCourses(data);
        } catch (err) {
          console.error("Failed to fetch courses", err);
        }
      }
    
      fetchCourses();
    }, []);

    const assignCourse = async () => {
      if (!selectedCourse || !selectedGroup?.id) return;
    
      const res = await fetch("http://localhost:4000/addCourseToGroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: selectedGroup.id,
          courseId: selectedCourse,
        }),
      });
    
      const data = await res.json();
      console.log(data);
    
      // Refresh group data manually or refetch
      setTimeout(() => window.location.reload(), 1500);
    };

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

          <div className="mt-6">
            <h3 className="font-semibold">Courses</h3>
            <ul className="list-disc pl-6 mt-2">
              {(selectedGroup.courses || []).map((course, idx) => (
                <li key={idx}>{course}</li>
              ))}
            </ul>

            <div className="mt-3 flex gap-2 items-center">
              <select
                className="p-2 border rounded"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select a course</option>
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={assignCourse}
              >
                Add Course
              </button>
            </div>
          </div>

          <button className="mt-4" onClick={() => setSelectedGroup(null)}>
            Close
          </button>
        </motion.div>
      )}

      <GroupCreate />
    </div>
  );
}