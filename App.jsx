import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load students from localStorage
  useEffect(() => {
    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Save students to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (e) => {
    e.preventDefault();

    if (!name.trim() || !course.trim()) {
      alert("Please... Enter all details");
      return;
    }

    // Update existing student
    if (editingId !== null) {
      const updatedStudents = students.map((student) =>
        student.id === editingId
          ? {
              ...student,
              name: name,
              course: course,
            }
          : student
      );

      setStudents(updatedStudents);
      setEditingId(null);
    } else {
      // Add new student
      const newStudent = {
        id: Date.now(),
        name: name,
        course: course,
      };

      setStudents([...students, newStudent]);
    }

    setName("");
    setCourse("");
  };

  // Edit student
  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setEditingId(student.id);
  };

  // Delete student
  const deleteStudent = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);
  };

  // Search students
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button type="submit">
          {editingId !== null ? "Update Student" : "Add Student"}
        </button>
      </form>



      <input
        className="search"
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>

                <td>
                  <button onClick={() => editStudent(student)} >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students found</td>
            </tr>
            
  )}
 
        </tbody>
      </table>
    </div>
  );
}

export default App;