import React, { useEffect,useState } from "react";
import Axios from 'axios';
import HeaderBar from './HeaderBar';
import { toast } from 'react-toastify';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, TextField } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useFormik,Field } from 'formik';
import * as Yup from 'yup';
import { Select, MenuItem } from '@mui/material';
import { InputLabel } from "@mui/material";
const apiUrl = process.env.REACT_APP_API_URL;

export default function Admin() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(null);
  const [updatedProfile, setUpdatedProfile]  = useState(null);


  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailId: Yup.string()
        .email('Invalid email format')
        .test(
            'isValidDomain',
            'Invalid domain extension',
            (value) => {
                if (!value || !value.includes('@')) return false; 
                const domainParts = value.split('@')[1].split('.');
                const domainExtension = domainParts[domainParts.length - 1];
                return ['com', 'org', 'net'].includes(domainExtension.toLowerCase());
            }
        ),
    mobileNo: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Mobile No. is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password is required'),
    role: Yup.string().required('Role is required'), // Add role validation
});


  const formik = useFormik({

    initialValues: {
      firstName: updatedProfile ? updatedProfile.firstName : '',
      lastName: updatedProfile ?  updatedProfile.lastName : '',
      mobileNo: updatedProfile ?  updatedProfile.mobileNo : '',
      emailId : updatedProfile ?  updatedProfile.emailId  :  "",
      password : updatedProfile ? updatedProfile.password : "",
      confirmPassword : updatedProfile ? updatedProfile.confirmPassword : "",
      role: updatedProfile ?      updatedProfile.role : [],
      
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('mobileNo', values.mobileNo);
      formData.append('emailId', values.emailId);
      formData.append('password', values.password);
      formData.append('role', values.role);
      

 
      if(updatedProfile){
      handleUpdateProduct(formData, updatedProfile._id);
      }

      else{
      handleAddProduct(formData)
    }},
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdatedProfile(null); // Reset the current product
    formik.resetForm(); // Reset Formik form values
  };


  const handleEditOpen = (profile) => {
    console.log("Selected profile:", profile); 
    setUpdatedProfile(profile);
    console.log("Current Product State:", updatedProfile); 
    setEditOpen(true);
  };


  useEffect(() => {
    if (updatedProfile) {
      formik.setValues({
       firstName: updatedProfile.firstName,
       lastName:  updatedProfile.lastName,
       mobileNo:  updatedProfile.mobileNo,
       emailId :  updatedProfile.emailId,
       role:      updatedProfile.role,
      });
    }
  }, [updatedProfile]);


  const handleEditClose = () => {
    setEditOpen(false);
   // Reset the image field
  };

// const handleImageChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     setSelectedImage(file); // Set the selected image
//     formik.setFieldValue('image', file); // Update the formik values
//   } else {
//     setSelectedImage(null); // Clear the selected image
//   }
// };


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



const handleDeleteProduct = async (productId) => {
  try {
    const url = `${apiUrl}/admin/delete/${productId}`;
    const response = await Axios.delete(url);

    if (response.data.status === 200) {
      fetchData();
      toast.success("Delete successful!");
    }
  } catch (error) {
    console.log("Error:", error);
    toast.error("Error deleting product");
  }
};



const handleAddProduct = async (formData) => {
  try {
    const response = await Axios.post(`${apiUrl}/admin/addData`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.status === 200) {
      fetchData();
      toast.success("data added successfully!");
      handleClose();
      setUpdatedProfile(null);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === "User with this email already exists") {
      toast.error("User with this email already exists");
    } else {
      toast.error(error.response ? error.response.data.message : "Error adding data");
      console.error("Error:", error);
    }
  }
};



  const handleUpdateProduct = async (formData, profileId) => {
    try {
      const response = await Axios.post(`${apiUrl}/admin/update/${profileId}`, formData,{

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        fetchData();
        toast.success("DATA updated successfully!");
        handleEditClose();
      }
    } catch (error) {
      toast.error("Error updating DATA");
      console.error("Error:", error);
    }
  };

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
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Action      </th>
              
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

                  <button onClick={() => handleDeleteProduct(profile._id)}><DeleteForeverOutlinedIcon /></button>
                  <button onClick={() => handleEditOpen(profile)}><ModeEditIcon /> </button>

                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{
            bgcolor: "rgba(255, 153, 153)",
            color: "#000",
            marginLeft: "530px",
            cursor: "pointer",
            marginTop: "30px",
            marginLeft: "600px",
            borderColor: "rgba(255, 153, 153)",
          }}
        >
          Add ADMIN
        </Button>
        <Dialog open={open} onClose={handleClose}>

          <DialogTitle>Add admin</DialogTitle>

          <DialogContent>
    
            <TextField
              margin="firstName"
              id="firstName"
              name="firstName"
              label="first Name"
              fullWidth
              variant="standard"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          
            <TextField
              margin="lastName"
              id="lastName"
              name="lastName"
              label="last Name"
              fullWidth
              variant="standard"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            
  

            <TextField
              margin="dense"
              id="mobileNo"
              name="mobileNo"
              label="mobile No "
              fullWidth
              variant="standard"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
              helperText={formik.touched.mobileNo && formik.errors.mobileNo}
            />
        <InputLabel id="role">Role</InputLabel>
<Select
  autoFocus
  margin="dense"
  id="role"
  label="role"
  fullWidth
  variant="standard"
  value={formik.values.role  || []}  onChange={(event) => {
    formik.setFieldValue('role', event.target.value);  // Updated 'category' to 'role'
  }}
  error={formik.touched.role && Boolean(formik.errors.role)}
  helperText={formik.touched.role && formik.errors.role}
>
  <MenuItem value="user">User</MenuItem>
  <MenuItem value="Admin">Admin</MenuItem>
  <MenuItem value="Subadmin">Subadmin</MenuItem>
</Select>


<TextField
              margin="dense"
              id="emailId"
              name="emailId"
              label="emailId "
              fullWidth
              variant="standard"
              value={formik.values.emailId}
              onChange={formik.handleChange}
              error={formik.touched.emailId && Boolean(formik.errors.emailId)}
              helperText={formik.touched.emailId && formik.errors.emailId}
            />  

<TextField
  margin="dense"
  id="password"
  name="password"
  label="Password"
  type="password"
  fullWidth
  variant="standard"
  value={formik.values.password}
  onChange={formik.handleChange}
  error={formik.touched.password && Boolean(formik.errors.password)}
  helperText={formik.touched.password && formik.errors.password}
/>

<TextField
  margin="dense"
  id="confirmPassword"
  name="confirmPassword"
  label="Confirm Password"
  type="password"
  fullWidth
  variant="standard"
  value={formik.values.confirmPassword}
  onChange={formik.handleChange}
  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
/>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={formik.handleSubmit}>Add</Button>

          </DialogActions>
        </Dialog>





        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Update ADMIN</DialogTitle>
        

        
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              variant="standard"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />

            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="standard"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />

           
            <TextField
              autoFocus
              margin="dense"
              id="mobileNo"
              name="mobileNo"
              label="Mobile No"
              fullWidth
              variant="standard"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
            />

<TextField
              margin="dense"
              id="emailId"
              name="emailId"
              label="emailId "
              fullWidth
              variant="standard"
              value={formik.values.emailId}
              onChange={formik.handleChange}
              error={formik.touched.emailId && Boolean(formik.errors.emailId)}
              helperText={formik.touched.emailId && formik.errors.emailId}
            />  

<InputLabel id="role">Role</InputLabel>
<Select
  autoFocus
  margin="dense"
  id="role"
  label="role"
  fullWidth
  variant="standard"
  value={formik.values.role  || []}  onChange={(event) => {
    formik.setFieldValue('role', event.target.value);  // Updated 'category' to 'role'
  }}
  error={formik.touched.role && Boolean(formik.errors.role)}
  helperText={formik.touched.role && formik.errors.role}
>
  <MenuItem value="user">User</MenuItem>
  <MenuItem value="Admin">Admin</MenuItem>
  <MenuItem value="Subadmin">Subadmin</MenuItem>
</Select>


           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={formik.handleSubmit}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}



//   const handleUpdate = async () => {
//     try {
//         const formData = new FormData();
//         formData.append('firstName', updatedProfile.firstName);
//         formData.append('lastName', updatedProfile.lastName);
//         formData.append('emailId', updatedProfile.emailId);
//         formData.append('mobileNo', updatedProfile.mobileNo);
//         formData.append("role",updatedProfile.role);
//         // formData.append('password', values.password);
//         // formData.append('confirmPassword', values.confirmPassword);


//         const response = await Axios.post(`${apiUrl}/updateone`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           }
//         });
//         if (response.data) {
//           setUpdatedProfile(response.data);
//           window.location.reload()
      
//           // Fetch updated profile data
//           // fetchData();
//         } else {
//             console.log('Invalid credentials or unexpected response status:', response.status);
//         }
//     } catch (error) {
//         // toast.error("User Already Register")
//         console.error('Error:', error);
//     } 
// };

//   return (
//     <>
//       <HeaderBar />
//       <div style={{ marginLeft: "250px", marginRight: "100px" }}>

//         <table style={{ width: '60%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Image     </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>First Name</th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Last Name </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Email     </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Mobile    </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Update    </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Delete    </th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((profile, key) => (
//               <tr key={key}>
                
// <td>{value.image && (
//                   <img
//                     src={`http://localhost:8040/upload/images/${value.image}`}
//                     alt={value.name}
//                     style={{ width: "50px", height: "50px" }}
//                   />
//                 )}
// </td>
//                 <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{value.firstName}</td>
//                 <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{value.lastName}</td>
//                 <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{value.emailId}</td>
//                 <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{value.mobileNo}</td>
//                 <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
//                   <Link to={`/update/${value._id}`} style={{ textDecoration: 'none' }}>Update</Link>
//                 </td>

//                 <td style={{ border: '1px solid #dddddd', padding: '8px' }}>
//                   <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }} onClick={() => handleSubmit(value._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }
