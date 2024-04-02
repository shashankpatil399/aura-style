import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import HeaderBar from './HeaderBar';
import { toast } from 'react-toastify';

export default function Customer() {
  const [list, setList] = React.useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    
    if (!isAuthenticated) {
    } else {
      Axios.get('http://localhost:8040/customer')
        .then((res) => setList(res.data))
        .catch(error => console.error("Error fetching customer data:", error));
    }
  }, [ ]);

  const handleSubmit = async (id) => {
    try {
      const url = `http://localhost:8040/deleteItem/${id}`;
      console.log("id", id);
      const response = await Axios.delete(url);

      if (response.data.status === 200) {
        window.location.reload();
        toast.success('Delete successful!');
        
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      <HeaderBar />
      <div style={{ marginLeft: "250px", marginRight: "100px" }}>

        <table style={{ width: '60%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}> First Name</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}> Last Name</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Email</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Mobile</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Update</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list.map((value, key) => (
              <tr key={key}>

                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{value.firstName}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{value.lastName}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{value.emailId}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{value.mobileNo}</td>
                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
                  <Link to={`/update/${value._id}`} style={{ textDecoration: 'none' }}>Update</Link>
                </td>

                <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
                  <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }} onClick={() => handleSubmit(value._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
