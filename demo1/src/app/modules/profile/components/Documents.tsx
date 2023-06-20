/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
// import {KTSVG} from '../../../../_metronic/helpers'
// import {Card4} from '../../../../_metronic/partials/content/cards/Card4'
import { useEffect, useState } from 'react';
import { useAuth } from './../../../../app/modules/auth';

export function Documents() {
  const { currentUser,  saveAuth, auth, setCurrentUser } = useAuth();
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [age, setAge] = useState(currentUser?.age);
  const [salary, setSalary] = useState(currentUser?.salary);
  const [role, setrole] = useState(currentUser?.role);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the update API call using fetch or any other library
    try {
      const response = await fetch(`http://localhost:8080/api/users/update/${currentUser?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age, salary, role }),
      });

      if (response.ok) {
        // User updated successfully
        const updatedUser = { ...currentUser, name, email, age, salary, role };
        setUpdateSuccess(true);
        setCurrentUser(updatedUser);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 2000);
        // saveAuth(auth);
        
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
              style={{padding: '5px', borderRadius:'5px', margin:'10px'}}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              style={{padding: '5px', borderRadius:'5px', margin:'10px'}}
              onChange={(e) => setAge((e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              value={salary}
              style={{padding: '5px', borderRadius:'5px', margin:'10px'}}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
           <div className="form-group">
            <label  htmlFor="email">Email :</label>
            <input
              type="string"
              id="email"
              value={email}
              style={{padding: '5px', borderRadius:'5px', margin:'10px'}}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button type="submit" style={{padding: '5px', borderRadius:'5px'}}>Update</button>
          </div>
        </form>
        {updateSuccess && <p className='alert alert-success'>User updated successfully!</p>}
      </div>
    </div>
  );
}
