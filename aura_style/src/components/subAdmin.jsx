import React, { useEffect,useState } from "react";
import Axios from 'axios';
import HeaderBar from './HeaderBar';
const apiUrl = process.env.REACT_APP_API_URL;

export default function SubAdmin() {
  const [list, setList] = useState([]);

const fetchData = async () => {
  try {
    const res = await Axios.get(`${apiUrl}/admin`);
    setList(res.data);
  } catch (error) {
    console.error("Data not found", error);
  }
};

useEffect(() => {
  fetchData();
}, []);

  return (
    <>
      <HeaderBar />
      <div style={{ marginLeft: "270px", marginRight: "100px", marginTop: "30px" }}>
        <table style={{ width: '60%', borderCollapse: 'collapse', border: '5px solid rgba(255, 153, 153)' }}>
          <thead>
            <tr>
            <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Serial No. </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>First Name </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Last Name</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Email ID</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Mobile No</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Role      </th>
              
            </tr>
          </thead>
          <tbody>

            {list.map((profile, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{index + 1}</td>
                {/* <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>
                {profile.image && (
  <img
    src={`${apiUrl}/upload/images/${profile.image}`}
    alt={profile.firstName}
    style={{ width: "80px", height: "80px" }}
  />
)}
                </td> */}

        
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{profile.firstName}     </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{profile.lastName}     </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{profile.emailId}     </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{profile.mobileNo}        </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{profile.role}           </td>


                <td 
                style={{ justifyContent : "center",width : "1px" ,borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}
                >

                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
</>
  );
}

