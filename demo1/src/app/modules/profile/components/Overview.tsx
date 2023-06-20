import React from 'react'
import "./overview.css"
import { EditUserPopup } from './EditUserPopup'
import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {ViewDocs} from './ViewDocs'
import { useAuth } from './../../../../app/modules/auth';
// import {
//   FeedsWidget2,
//   FeedsWidget3,
//   FeedsWidget4,
//   FeedsWidget5,
//   FeedsWidget6,
//   ChartsWidget1,
//   ListsWidget5,
//   ListsWidget2,
// } from '../../../../_metronic/partials/widgets'
interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  salary: number;
  countr: string;
  stat: string;
  cit: string;
}
interface User2 {
  _id: string;
}
export function Overview() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] =useState(0);
  const [editUserId, setEditUserId] = useState('');
const [editUserName, setEditUserName] = useState('');
const [editUserEmail, setEditUserEmail] = useState('');
const [editUserAge, setEditUserAge] = useState(0);
const [editUserSalary, setEditUserSalary] = useState(0);
const [showEditPopup, setShowEditPopup] = useState(false);
const [docsUserId, docsEditUserId] = useState('');
const [showdocs, setShowdocsPopup] = useState(false);
const [sortColumn, setSortColumn] = useState('');
const [sortOrder, setSortOrder] = useState('');
const { currentUser} = useAuth();

  const getUsers = async ()=>{
    const response = await fetch('http://localhost:8080/api/users/allusers',{
      method:'GET',
    })
   const data = await response.json();
   setUsers(data);
   setTotalPages(Math.ceil(data.length / 5));
  }

    // pagination logic
    const handlePageChange = (newPage: number)=>{
      setCurrentPage(newPage)
  }
  const handleNextClick = ()=>{
      if(currentPage < totalPages){
          setCurrentPage(currentPage + 1)
      }
  }
  const handlePrevClick = ()=>{
      if(currentPage > 1){
          setCurrentPage(currentPage - 1)
      }
  }
  const preDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages
  
  const itemsPerPage = 5;
  const startIndex = (currentPage-1)* itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDiaplay = users.slice(startIndex, endIndex);
  useEffect(()=>{
    getUsers();
  },[])
  if(currentPage==1) var no = 0
  else no =  (currentPage-1) * 5

  // Delete a user 
  
  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/deleteuser/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // User deleted successfully, update the user list
        getUsers();
      } else {
        const errorData = await response.json();
        console.error('Error deleting user:', errorData);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // update a user
  const showEditUserPopup = (user: User) => {
    setEditUserId(user._id);
    setEditUserName(user.name);
    setEditUserEmail(user.email);
    setEditUserAge(user.age);
    setEditUserSalary(user.salary);
    setShowEditPopup(true);
  };
  const showdocsPopup = (user: User) => {
    docsEditUserId(user._id)
    setShowdocsPopup(true);
  };


  // sorting logic
  const sortTable = (column: string) => {
    let newSortOrder = 'asc';

    if (sortColumn === column && sortOrder === 'asc') {
      newSortOrder = 'desc';
    }

    setSortColumn(column);
    setSortOrder(newSortOrder);

    let sortedUsers = [...users];

    if (column === 'age') {
      sortedUsers.sort((a, b) => {
        const aValue = parseInt(a.age.toString());
        const bValue = parseInt(b.age.toString());

        if (newSortOrder === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    } else if (column === 'salary') {
      sortedUsers.sort((a, b) => {
        const aValue = parseInt(a.salary.toString());
        const bValue = parseInt(b.salary.toString());

        if (newSortOrder === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    setUsers(sortedUsers);
  };


  return (
    <>{currentUser?.role=="admin" &&
    <div className='row g-5 g-xxl-8'>
      <div className="showinglist">
      <table id="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th> Age{' '}
                <button
                  className="sort-button"
                  onClick={() => sortTable('age')}
                >
                  {sortColumn === 'age' && sortOrder === 'asc' ? (
                    <i className="fas fa-sort-up"></i>
                  ) : (
                    <i className="fas fa-sort-down"></i>
                  )}
                </button></th>
            <th>Salary{' '}
                <button
                  className="sort-button"
                  onClick={() => sortTable('salary')}
                >
                  {sortColumn === 'salary' && sortOrder === 'asc' ? (
                    <i className="fas fa-sort-up"></i>
                  ) : (
                    <i className="fas fa-sort-down"></i>
                  )}
                </button></th>
            <th>view docs</th>
            <th>Options</th>
            {/* <th>Country</th>
            <th>State</th>
            <th>City</th> */}
          </tr>
        </thead>
        <tbody id="tableBody">
        
        {
          
        itemsToDiaplay.map(user=>
          <tr id="entry0" key={user._id}>
            <td>{++no}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.salary}</td>
            <td><i style={{ fontSize: '1.5rem', paddingRight: '20px' }}  className="fas fa-file fa-3x" onClick={() => showdocsPopup(user)}></i></td>
            <td><i style={{ fontSize: '1.5rem', paddingRight: '20px' }}  className="fas fa-pencil fa-3x" onClick={() => showEditUserPopup(user)}></i><i  onClick={() => deleteUser(user._id)} style={{ fontSize: '1.5rem' }}  className="fas fa-trash fa-3x"></i></td>
            {/* <td>{user.countr}</td>
            <td>{user.stat}</td>
            <td>{user.cit}</td> */}
          </tr>
          )
        }
        </tbody>
      </table>
      </div>
      <div className='pagebuttons'>
        
      <button 
      className='pagecontrolbutton'
                    onClick={handlePrevClick}
                    disabled={preDisabled}
                    >
                    Prev
                </button>
            {
                Array.from({length:totalPages},(_,i)=>{
                    return (
                        <button 
                        className='pagecontrolbutton'
                            onClick={()=>handlePageChange(i+1)} 
                            key={i}
                            disabled={i+1 === currentPage}
                            >
                            {i+1}
                        </button>
                    )
                })
            }
            
                
                <button 
                className='pagecontrolbutton'
                    onClick={handleNextClick}
                    disabled={nextDisabled}
                    >
                    Next
                </button>
      </div>
      {showEditPopup && (
  <EditUserPopup
    userId={editUserId}
    userName={editUserName}
    userEmail={editUserEmail}
    userAge={editUserAge}
    userSalary={editUserSalary}
    onClose={() => setShowEditPopup(false)}
    onUpdate={getUsers} // Call getUsers to fetch the updated user list after update
  />
)}
{showdocs && (
  <ViewDocs
    userid={docsUserId}
    onClose={() => setShowdocsPopup(false)}
  />
)}
      {/* <div className='col-xl-6'>
        <FeedsWidget2 className='mb-5 mb-xxl-8' />

        <FeedsWidget3 className='mb-5 mb-xxl-8' />

        <FeedsWidget4 className='mb-5 mb-xxl-8' />

        <FeedsWidget5 className='mb-5 mb-xxl-8' />

        <FeedsWidget6 className='mb-5 mb-xxl-8' />
      </div> */}

      {/* <div className='col-xl-6'>
        <ChartsWidget1 className='mb-5 mb-xxl-8' />

        <ListsWidget5 className='mb-5 mb-xxl-8' />

        <ListsWidget2 className='mb-5 mb-xxl-8' />
      </div> */}
    </div>
    }</>
  )
}