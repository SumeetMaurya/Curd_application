/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState, useEffect } from 'react';
import {useAuth} from './../../../../app/modules/auth'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { right } from '@popperjs/core';
// import {Card2} from '../../../../_metronic/partials/content/cards/Card2'
// import {IconUserModel} from '../ProfileModels'

export function Projects() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [id, setId] = useState(''); // Update with the actual user ID
  const {currentUser, logout} = useAuth()
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [Errorupload, erroruploadset] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = (userId: string) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch(`http://localhost:8080/api/file/upload/${userId}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          if(data == "File uploaded and saved successfully"){
          setUploadSuccess(true);
          } 
          else{
          erroruploadset(true)
          }// File uploaded and saved successfully
          // Perform any additional actions after successful upload
        })
        .catch((error) => {
          erroruploadset(true)
          console.error('Error uploading file:', error);
          // Handle error case
        });
    }
  };

  useEffect(() => {
    // Fetch user ID or set it dynamically
    setId('your-user-id'); // Replace with actual user ID
  }, []);

  
  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => {
        setSelectedFile(null); // Reset selectedFile to null
        setUploadSuccess(false); // Remove the success message
        erroruploadset(false);
      }, 2000); // Adjust the time (in milliseconds) as per your requirement
      return () => clearTimeout(timer);
    }
    if( Errorupload){
      const timer = setTimeout(() => {
        setSelectedFile(null); // Reset selectedFile to null
        erroruploadset(false);
      }, 2000); // Adjust the time (in milliseconds) as per your requirement
      return () => clearTimeout(timer);
    }
  }, [uploadSuccess]);

  return (
    <>

<div>
<label htmlFor="file-input" className="file-input-label">
          <input id="file-input"  style={{display: 'none' }} type="file" onChange={handleFileChange} />
          <span className="file-input-button">
            <i style={{ fontSize: '4rem', padding: '0 20px 0 40vw' }}  className="fas fa-upload"></i>
          </span>
        </label>



        <span style={{ fontSize: '8rem' }}  className="upload-button" onClick={() => handleFileUpload(`${currentUser?._id}`)}>
            <i style={{ fontSize: '4rem' }}  className="fas fa-plus fa-3x"></i>
          </span>
    </div>
    {selectedFile && (
<span style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          Selected file: {selectedFile.name}
          </span>
      )}

    {uploadSuccess && (
        <div className="alert alert-success" role="alert">
          Document uploaded successfully!
        </div>
      )}
      {Errorupload && (
        <div className="alert alert-danger" role="alert">
          File is larger than 25 mb
        </div>
      )}
      {/* <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          My Projects
          <span className='fs-6 text-gray-400 fw-bold ms-1'>Active</span>
        </h3>

        <div className='d-flex flex-wrap my-2'>
          <div className='me-4'>
            <select
              name='status'
              data-control='select2'
              data-hide-search='true'
              className='form-select form-select-sm form-select-white w-125px'
              defaultValue='Active'
            >
              <option value='Active'>Active</option>
              <option value='Approved'>In Progress</option>
              <option value='Declined'>To Do</option>
              <option value='In Progress'>Completed</option>
            </select>
          </div>
          <a
            href='#'
            className='btn btn-primary btn-sm'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_project'
          >
            New Project
          </a>
        </div>
      </div>

      <div className='row g-6 g-xl-9'>
        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/plurk.svg'
            badgeColor='primary'
            status='In Progress'
            statusColor='primary'
            title='Fitnes App'
            description='CRM App application to HR efficiency'
            date='November 10, 2021'
            budget='$284,900.00'
            progress={50}
            users={users1}
          />
        </div>

        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/disqus.svg'
            badgeColor='info'
            status='Pending'
            statusColor='info'
            title='Leaf CRM'
            description='CRM App application to HR efficiency'
            date='May 10, 2021'
            budget='$36,400.00'
            progress={30}
            users={users2}
          />
        </div>

        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/figma-1.svg'
            badgeColor='success'
            status='Completed'
            statusColor='success'
            title='Atica Banking'
            description='CRM App application to HR efficiency'
            date='Mar 14, 2021'
            budget='$605,100.00'
            progress={100}
            users={users3}
          />
        </div>

        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/sentry-3.svg'
            badgeColor='info'
            status='Pending'
            statusColor='info'
            title='Finance Dispatch'
            description='CRM App application to HR efficiency'
            date='Mar 14, 2021'
            budget='$605,100.00'
            progress={60}
            users={users4}
          />
        </div>

        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/xing-icon.svg'
            badgeColor='primary'
            status='In Progress'
            statusColor='primary'
            title='9 Degree'
            description='CRM App application to HR efficiency'
            date='Mar 14, 2021'
            budget='$605,100.00'
            progress={40}
            users={users5}
          />
        </div>

        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/tvit.svg'
            badgeColor='primary'
            status='In Progress'
            statusColor='primary'
            title='9 Degree'
            description='CRM App application to HR efficiency'
            date='Mar 14, 2021'
            budget='$605,100.00'
            progress={70}
            users={users6}
          />
        </div>

        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/aven.svg'
            badgeColor='primary'
            status='In Progress'
            statusColor='primary'
            title='Buldozer CRM'
            description='CRM App application to HR efficiency'
            date='Mar 14, 2021'
            budget='$605,100.00'
            progress={70}
            users={users7}
          />
        </div>

        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/treva.svg'
            badgeColor='danger'
            status='Overdue'
            statusColor='danger'
            title='Aviasales App'
            description='CRM App application to HR efficiency'
            date='Mar 14, 2021'
            budget='$605,100.00'
            progress={10}
            users={users8}
          />
        </div>

        <div className='col-md-6 col-xl-4'>
          <Card2
            icon='/media/svg/brand-logos/kanba.svg'
            badgeColor='success'
            status='Completed'
            statusColor='success'
            title='Oppo CRM'
            description='CRM App application to HR efficiency'
            date='Mar 14, 2021'
            budget='$605,100.00'
            progress={100}
            users={users9}
          />
        </div>
      </div>

      <div className='d-flex flex-stack flex-wrap pt-10'>
        <div className='fs-6 fw-bold text-gray-700'>Showing 1 to 10 of 50 entries</div>

        <ul className='pagination'>
          <li className='page-item previous'>
            <a href='#' className='page-link'>
              <i className='previous'></i>
            </a>
          </li>

          <li className='page-item active'>
            <a href='#' className='page-link'>
              1
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              2
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              3
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              4
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              5
            </a>
          </li>

          <li className='page-item'>
            <a href='#' className='page-link'>
              6
            </a>
          </li>

          <li className='page-item next'>
            <a href='#' className='page-link'>
              <i className='next'></i>
            </a>
          </li>
        </ul>
      </div> */}
    </>
  )
}

// const users1: Array<IconUserModel> = [
//   {name: 'Emma Smith', avatar: '/media/avatars/300-6.jpg'},
//   {name: 'Rudy Stone', avatar: '/media/avatars/300-1.jpg'},
//   {name: 'Susan Redwood', initials: 'S', color: 'primary'},
// ]

// const users2 = [
//   {name: 'Alan Warden', initials: 'A', color: 'warning'},
//   {name: 'Brian Cox', avatar: '/media/avatars/300-5.jpg'},
// ]

// const users3 = [
//   {name: 'Mad Masy', avatar: '/media/avatars/300-6.jpg'},
//   {name: 'Cris Willson', avatar: '/media/avatars/300-1.jpg'},
//   {name: 'Mike Garcie', initials: 'M', color: 'info'},
// ]

// const users4 = [
//   {name: 'Nich Warden', initials: 'N', color: 'warning'},
//   {name: 'Rob Otto', initials: 'R', color: 'success'},
// ]

// const users5 = [
//   {name: 'Francis Mitcham', avatar: '/media/avatars/300-20.jpg'},
//   {name: 'Michelle Swanston', avatar: '/media/avatars/300-7.jpg'},
//   {name: 'Susan Redwood', initials: 'S', color: 'primary'},
// ]

// const users6 = [
//   {name: 'Emma Smith', avatar: '/media/avatars/300-6.jpg'},
//   {name: 'Rudy Stone', avatar: '/media/avatars/300-1.jpg'},
//   {name: 'Susan Redwood', initials: 'S', color: 'primary'},
// ]

// const users7 = [
//   {name: 'Meloday Macy', avatar: '/media/avatars/300-2.jpg'},
//   {name: 'Rabbin Watterman', initials: 'S', color: 'success'},
// ]

// const users8 = [
//   {name: 'Emma Smith', avatar: '/media/avatars/300-6.jpg'},
//   {name: 'Rudy Stone', avatar: '/media/avatars/300-1.jpg'},
//   {name: 'Susan Redwood', initials: 'S', color: 'primary'},
// ]

// const users9 = [
//   {name: 'Meloday Macy', avatar: '/media/avatars/300-2.jpg'},
//   {name: 'Rabbin Watterman', initials: 'S', color: 'danger'},
// ]
