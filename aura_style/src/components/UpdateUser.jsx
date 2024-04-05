// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
// import HeaderBar from './HeaderBar';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';
// import { Formik, Form, Field, ErrorMessage } from 'formik';




// const validationSchema = Yup.object().shape({
//         firstName: Yup.string().required('First Name is required'),
//         lastName: Yup.string().required('Last Name is required'),
//         emailId: Yup.string().email('Invalid email format').required('Email is required'),
//         mobileNo: Yup.string()
//             .matches(/^[0-9]+$/, 'Must be only digits')
//             .required('Mobile No. is required'),
//     });

//      const ValidationMessage = ({ children }) => (
//             <span style={{ color: 'red' }}>{children}</span>
//         );


// function Update() {
//     let { id } = useParams();
//     const [update, setUpdate] = useState({
//         firstName: '',
//         lastName: '',
//         emailId: '',
//         mobileNo: '',

//     });                    

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setUpdate((prev) => ({ ...prev, [name]: value }));
//     };

//     useEffect(() => {
//         axios.get(`http://localhost:8040/getUserById/${id}`)
//             .then(res => {
//                 console.log(res.data);
//                 setUpdate(prevState => ({
//                     ...prevState,
//                     firstName: res.data.firstName,
//                     lastName: res.data.lastName,
//                     emailId: res.data.emailId,
//                     mobileNo: res.data.mobileNo

//                 }));

//             })
//             .catch(err => console.log(err));
//     }, [id]);





//     const Navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.post(`http://localhost:8040/Update/${id}`, update);
//             Navigate('/Customer');
//             toast.success('update successful!');

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (

//       <>
//       <HeaderBar/>
//         <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//             <Box sx={{
//                 boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
//                 p: 3,
//                 borderRadius: 4,
//                 marginTop: 4,
//                 bgcolor: 'rgba(255, 153, 153, 0.4)',
//             }}>
//                 <Typography variant="h4" style={{ fontFamily: "'Marck Script', cursive" }} align="center" gutterBottom>
//                     Update Customer
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 label="First Name"
//                                 name="firstName"
//                                 value={update.firstName}
//                                 onChange={handleChange}
//                             />

//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Last Name"
//                                 name="lastName"
//                                 value={update.lastName}
//                                 onChange={handleChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Email"
//                                 name="emailId"
//                                 value={update.emailId}
//                                 onChange={handleChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Mobile No."
//                                 name="mobileNo"
//                                 value={update.mobileNo}
//                                 onChange={handleChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000' }}
//                                 fullWidth
//                             >
//                                 Update
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </Box>
//         </Container>
//         </>
//     );
// }

// export default Update;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import HeaderBar from './HeaderBar';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const apiUrl = process.env.REACT_APP_API_URL;



const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailId: Yup.string().email('Invalid email format').required('Email is required'),
    mobileNo: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Mobile No. is required'),
});

function Update() {
    let { id } = useParams();
    const [update, setUpdate] = useState(null);
    console.log("update", update);

    useEffect(() => {
        axios.get(`${apiUrl}/getUserById/${id}`)
            .then(res => {
                console.log(res.data);
                setUpdate(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            await axios.post(`${apiUrl}/Update/${id}`, values);
            Navigate('/Customer');
            toast.success('Update successful!');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderBar />
            <Container maxWidth="xs" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {update !== null && (
                    <Box sx={{
                        boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.9)',
                        p: 3,
                        borderRadius: 4,
                        marginTop: 4,
                        bgcolor: 'rgba(255, 153, 153, 0.4)',
                    }}>
                        <Typography variant="h4" style={{ fontFamily: "'Marck Script', cursive" }} align="center" gutterBottom>
                            Update Customer
                        </Typography>
                        <Formik
                            initialValues={update}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                label="First Name"
                                                name="firstName"
                                                error={errors.firstName && touched.firstName}
                                                helperText={<ErrorMessage name="firstName" component={ValidationMessage} />}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                label="Last Name"
                                                name="lastName"
                                                error={errors.lastName && touched.lastName}
                                                helperText={<ErrorMessage name="lastName" component={ValidationMessage} />}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                label="Email"
                                                name="emailId"
                                                error={errors.emailId && touched.emailId}
                                                helperText={<ErrorMessage name="emailId" component={ValidationMessage} />}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                label="Mobile No."
                                                name="mobileNo"
                                                error={errors.mobileNo && touched.mobileNo}
                                                helperText={<ErrorMessage name="mobileNo" component={ValidationMessage} />}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ bgcolor: 'rgba(255, 153, 153, 0.4)', color: '#000' }}
                                                fullWidth
                                            >
                                                Update
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>

                )}

            </Container>
        </>
    );
}

const ValidationMessage = ({ children }) => (
    <span style={{ color: 'red' }}>{children}</span>
);

export default Update;

