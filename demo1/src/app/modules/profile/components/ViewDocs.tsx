/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
// import {Card5} from '../../../../_metronic/partials/content/cards/Card5'
import { useEffect, useState } from 'react';
import { useAuth } from './../../../../app/modules/auth';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Document {
  _id: string;
  filename: string;
  userId: string;
  type: string;
  // Other document properties
}
interface EditUserPopupProps {
    userid: string;
    onClose: () => void;
  }

export const ViewDocs: React.FC<EditUserPopupProps> = ({
    userid,
    onClose,
  }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchDocuments(userid);
  }, [currentUser]);

  const fetchDocuments = async (userId: string | undefined) => {
    try {
      const response = await fetch(`http://localhost:8080/api/file/upload/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      const updatedDocuments = data.files.map((document: Document) => {
        const fileParts = document.filename.split('.');
        const fileType = fileParts[fileParts.length - 1];
        return {
          ...document,
          type: fileType,
        };
      });

      setDocuments(updatedDocuments);
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/file/deletedocs/${documentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      // Remove the deleted document from the list
      setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc._id !== documentId));
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };
  return (
    <>
     <div>
      <h3>
            User Documents</h3>
            <i className='fas fa-close'style={{fontSize: '30px', color:'white'}} onClick={onClose}>
            </i> 
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul>
          <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document._id}>
                <td>{document.filename}</td>
                <td>{document.type}</td>
                <td>
                  <i className='fas fa-trash' onClick={() => deleteDocument(document._id)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </ul>
      )}
      
    </div>
      {/* <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          View docs
          <span className='fs-6 text-gray-400 fw-bold ms-1'>30 Days</span>
        </h3>

        <div className='d-flex align-items-center my-2'>
          <div className='w-100px me-5'>
            <select
              name='status'
              data-control='select2'
              data-hide-search='true'
              className='form-select form-select-white form-select-sm'
              defaultValue='1'
            >
              <option value='1'>30 Days</option>
              <option value='2'>90 Days</option>
              <option value='3'>6 Months</option>
              <option value='4'>1 Year</option>
            </select>
          </div>
          <button className='btn btn-primary btn-sm' data-bs-toggle='tooltip' title='Coming soon'>
            Add Campaign
          </button>
        </div>
      </div> */}

      {/* <div className='row g-6 g-xl-9'>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/twitch.svg'
            title='Twitch Posts'
            description='$500.00'
            status='down'
            statusValue={40.5}
            statusDesc='more impressions'
            progress={0.5}
            progressType='MRR'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/twitter.svg'
            title='Twitter Followers'
            description='807k'
            status='up'
            statusValue={17.62}
            statusDesc='Followers growth'
            progress={5}
            progressType='New trials'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/spotify.svg'
            title='Spotify Listeners'
            description='1,073'
            status='down'
            statusValue={10.45}
            statusDesc='Less comments than usual'
            progress={40}
            progressType='Impressions'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/pinterest-p.svg'
            title='Pinterest Posts'
            description='97'
            status='up'
            statusValue={26.1}
            statusDesc='More posts'
            progress={10}
            progressType='Spend'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/github.svg'
            title='Github Contributes'
            description='4,109'
            status='down'
            statusValue={32.8}
            statusDesc='Less contributions'
            progress={40}
            progressType='Dispute'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/youtube-play.svg'
            title='Youtube Subscribers'
            description='354'
            status='up'
            statusValue={29.45}
            statusDesc='Subscribers growth'
            progress={40}
            progressType='Subscribers'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/telegram.svg'
            title='Telegram Posts'
            description='566'
            status='up'
            statusValue={11.4}
            statusDesc='more clicks'
            progress={40}
            progressType='Profit'
          />
        </div>
        <div className='col-sm-6 col-xl-4'>
          <Card5
            image='/media/svg/brand-logos/reddit.svg'
            title='Reddit Awards'
            description='2.1M'
            status='up'
            statusValue={46.7}
            statusDesc='more adds'
            progress={0.0}
            progressType='Retention'
          />
        </div>
      </div> */}

      {/* <div className='d-flex flex-stack flex-wrap pt-10'>
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
