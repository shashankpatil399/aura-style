import React, { useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button,Typography,Container, Grid, Box} from '@mui/material';
import * as Yup from 'yup';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginFailure,loginSuccess } from "../redux/authSlice";


const apiUrl = process.env.REACT_APP_API_URL;



const validationSchema = Yup.object().shape({
    emailId: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')});

const ValidationMessage = ({ children }) => (
    <span style={{ color: 'red' }}>{children}</span>
);

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/Dashboard");
        }
    }, [navigate]);

    const initialValues = {
        emailId: "",
        password: ""
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post( `${apiUrl}/login`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                dispatch(loginSuccess({token :response.data.token
                }))
                tokenSave(response.data.token);
                console.log('Login successful');
                toast.success('Login successful!');
                navigate("/Dashboard");
            } else {
                console.log('Unexpected response status:', response.status);
                toast.error("An unexpected error occurred");
            }
        } catch (error) {
            console.error('Error:', error);
            dispatch(loginFailure({error : "login unsuccesfull"
            }))
    
            if (error.response) {
                const { status, data } = error.response;
                console.log('Error response status:', status);
                console.log('Error response data:', data);
                
                if (status === 404) {
                    toast.error(data.error || "User not found !");
                } else if (status === 401) {
                    toast.error(data.error || "Incorrect password !");
                } else {
                    toast.error("An unexpected error occurred");
                }
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    
        setSubmitting(false);
    };
    
    const tokenSave = (token) => {
        localStorage.setItem("token", token);
    };

    return (
        <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{
                boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
                p: 7,
                borderRadius: 4,
                marginTop: 10,
                bgcolor: 'rgba(255, 153, 153, 0.4)',
            }}>
                <div className="App">
                    <Typography variant="h4" style={{ fontFamily: "'Ojuju', sans-serif" }}>
                        Login at Aurastyle
                    </Typography>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Email"
                                        name="emailId"
                                        placeholder="Enter Your Email"
                                        sx={{ padding: '2px', marginTop: 4 }}
                                    />
                                    <ErrorMessage name="emailId" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="password"
                                        label="Password"
                                        name="password"
                                        placeholder="Enter Your Password"
                                        sx={{ padding: '2px', marginTop: 4 }}
                                    />
                                    <ErrorMessage name="password" component={ValidationMessage} />
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000', padding: '2px', marginTop: 4 }}
                                        disabled={isSubmitting}
                                        fullWidth >
                                        {isSubmitting ? "LOGIN..." : "LOGIN"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>

                <Typography variant="body2">
                    <Link to="/Forget" style={{ textDecoration: 'none', color: 'blue' }}>Forget Password</Link> {}
                </Typography>
<span>
                <Typography variant="body2">
                    <Link to="/Signup" style={{ textDecoration: 'none', color: 'blue' }}>Sign Up Here</Link> {}
                </Typography>
                </span>
            </Box>
        </Container>
    );
}






// <Dialog open={open} onClose={handleClose}>
// <DialogTitle>Add Product</DialogTitle>

// <Avatar
//           sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
//           src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
//           alt="Profile"
//       />      


// <input
//     accept="image/*"
//     id="image-upload"
//     type="file"
//     style={{ display: "none" }}
//     onChange={handleImageChange}
//   />
//   <label htmlFor="image-upload">
//   <Button
// sx={{
// marginLeft: 24,
// backgroundColor: 'rgba(255, 153, 153)', // Adjust the color as needed
// color: '#fff', // Text color
// '&:hover': {
// backgroundColor: 'rgba(255, 153, 153)', // Hover color
// },
// }}
// component="span"
// >
// Upload Image
// </Button>
//   </label>
//         <DialogContent>
//   <TextField
//     autoFocus
//     margin="dense"
//     id="productName"
//     label="Product Name"
//     fullWidth
//     variant="standard"
//   />
//   <TextField
//     margin="dense"
//     id="description"
//     label="Description"
//     fullWidth
//     variant="standard"
//   />


// <InputLabel id="category">Category</InputLabel>
// <Select
// autoFocus
// margin="dense"
// id="category"
// label="categorylabel"
// fullWidth
// labelId="category"
// variant="standard"
// defaultValue=""
// multiple
// value={selectedCategory}
// onChange={(event) => setSelectedCategory(event.target.value)}>

// {categories.map((item,index) => (
// <MenuItem key={index} value={item.category}>
// {item.category}
// </MenuItem>

// ))}
// </Select>

//   <TextField
//     margin="dense"
//     id="price"
//     label="Price"
//     fullWidth
//     variant="standard"
//   />
//   {/* <TextField
//     margin="dense"
//     id="availableSizes"
//     label="Available Sizes"
//     fullWidth
//     variant="standard"
//   /> */}



// <InputLabel id="availableaSizes">Size</InputLabel>
// <Select
// autoFocus
// margin="dense"
// id="availableSizes"
// label="Size"
// fullWidth
// labelId="availableSizes"
// variant="standard"
// value={selectedSize}
// multiple
// onChange={(event) => setSelectedSize(event.target.value)}>
// {size.map((item,index) => (
// <MenuItem key={index} value={item.size}>
// {item.size}
// </MenuItem>
// ))}
// </Select>

//   <TextField
//     margin="dense"
//     id="availableColors"
//     label="Available Colors"
//     fullWidth
//     variant="standard"
//   />
//   <TextField
//     margin="dense"
//     id="materialType"
//     label="Material Type"
//     fullWidth
//     variant="standard"
//   />
 
// </DialogContent>
// <DialogActions>
//   <Button onClick={handleClose}>Cancel</Button>
//   <Button
//     onClick={() => {
      
//       const formData = new FormData();
//       formData.append("productName",      document.getElementById("productName").value);
//       formData.append("description",      document.getElementById("description").value);
//       formData.append("price",            document.getElementById("price").value);
//       formData.append("availableColors",  document.getElementById("availableColors").value);
//       formData.append("materialType",     document.getElementById("materialType").value);
//       formData.append('image',            selectedImage);
//       formData.append("availableSizes",   selectedSize);
//       formData.append("category",         selectedCategory);

     
//       handleAddProduct(formData);
//     }}
//   >
//   Add
//   </Button>
// </DialogActions>
// </Dialog>