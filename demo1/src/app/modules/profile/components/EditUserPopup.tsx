import React from 'react';
import {useState} from 'react'
interface EditUserPopupProps {
  userId: string;
  userName: string;
  userEmail: string;
  userAge: number;
  userSalary: number;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditUserPopup: React.FC<EditUserPopupProps> = ({
  userId,
  userName,
  userEmail,
  userAge,
  userSalary,
  onClose,
  onUpdate,
}) => {
  // Add state variables to handle input changes
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [age, setAge] = useState(userAge);
  const [salary, setSalary] = useState(userSalary);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the update API call using fetch or any other library
    try {
      const response = await fetch(`http://localhost:8080/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age, salary }),
      });

      if (response.ok) {
        // User updated successfully
        onUpdate();
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error updating user:', errorData);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="edit-user-popup" style={{display: 'flex', width:'100%', justifyContent:'center', height:'50%', alignItems:'center'}}>
      <div className="edit-user-popup-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{padding: '5px', borderRadius:'5px', margin:'10px'}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{padding: '5px', borderRadius:'5px', margin:'10px'}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              style={{padding: '5px', borderRadius:'5px', margin:'10px'}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(parseInt(e.target.value))}
              style={{padding: '5px', borderRadius:'5px', margin:'10px'}}
            />
          </div>
          <div className="buttons">
            <button type="submit"  style={{padding: '5px', borderRadius:'5px'}}>Update</button>
            <button type="button" style={{padding: '5px', borderRadius:'5px'}} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
