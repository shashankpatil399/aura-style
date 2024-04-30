// import React, { useEffect, useState } from "react";
// import HeaderBar from "./HeaderBar";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Avatar, TextField } from '@mui/material';
// import { Select, MenuItem } from '@mui/material';
// import { InputLabel } from "@mui/material";
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import DialogContentText from '@mui/material/DialogContentText';

// const apiUrl = process.env.REACT_APP_API_URL;

// export default function Product() {
//   const [list, setList] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(null);
//   const [deletepro, setDeletePro] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [size, setSize] = useState([]);
//   // const [selectedSize, setSelectedSize] = useState([]);
//   // const [selectedCategory, setSelectedCategory] = useState([]);
//   const [currentProduct, setCurrentProduct] = useState(null);


//   const validationSchema = Yup.object({
//     productName: Yup.string().required('Product Name is required'),
//     description: Yup.string().required('Description is required'),
//     price: Yup.number().required('Price is required').positive('Price must be positive'),
//     availableColors: Yup.string().required('Available Colors is required'),
//     materialType: Yup.string().required('Material Type is required'),
//     category: Yup.array().min(1, 'Category is required'),
//     availableSizes: Yup.array().min(1, 'Available Sizes is required'),
//   });

//   const formik = useFormik({

//     initialValues: {
//       productName: currentProduct ? currentProduct.productName : '',
//       description: currentProduct ? currentProduct.description : '',
//       price: currentProduct ? currentProduct.price : '',
//       availableColors: currentProduct ? currentProduct.availableColors : '',
//       materialType: currentProduct ? currentProduct.materialType : '',
//       category: currentProduct ? currentProduct.category : [],
//       availableSizes: currentProduct ? currentProduct.availableSizes : [],
//       image: null,
//     },

//     validationSchema: validationSchema,

//     onSubmit: (values) => {
//       const formData = new FormData();
//       formData.append('productName', values.productName);
//       formData.append('description', values.description);
//       formData.append('price', values.price);
//       formData.append('availableColors', values.availableColors);
//       formData.append('materialType', values.materialType);
//       formData.append('availableSizes', values.availableSizes.join(','));
//       formData.append('category', values.category.join(','));
//       formData.append('image', values.image); // Include the image here
//       if (selectedImage && selectedImage.type.startsWith('image/')) {
//         // Use createObjectURL here
//       } else {
//         console.error('Selected file is not an image');
//       }

//       if(currentProduct){
//       handleUpdateProduct(formData, currentProduct._id);
//       }
//       else{
//       handleAddProduct(formData)
//     }},
//   });
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//     setCurrentProduct(null); // Reset the current product
//     formik.resetForm(); // Reset Formik form values
//   };
//   const handleEditOpen = (product) => {
//     console.log("Selected Product:", product); // Log the selected product
//     setCurrentProduct(product);
//     setSelectedImage(product.image);
//     console.log("Current Product State:", currentProduct); // Log the current product state
//     setEditOpen(true);
//   };

//   const hnadleDelete = (productId) => {
//     console.log("Selected Product:", productId);
//     setCurrentProduct(productId);
//     setDeletePro(true)
//   }

//   const handleCancel = () => {
//   setDeletePro(false)

//   }


//   useEffect(() => {
//     if (currentProduct) {
//       formik.setValues({
//         productName: currentProduct.productName,
//         description: currentProduct.description,
//         price: currentProduct.price,
//         availableColors: currentProduct.availableColors,
//         materialType: currentProduct.materialType,
//         category: currentProduct.category ? currentProduct.category.split(',') : [],
//         availableSizes: currentProduct.availableSizes ? currentProduct.availableSizes.split(',') : [],

//       });
//     }
//   }, [currentProduct]);



//   const handleEditClose = () => {
//     setEditOpen(false);
//     formik.setFieldValue('image', null); // Reset the image field
//   };
// const handleImageChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     setSelectedImage(file); // Set the selected image
//     formik.setFieldValue('image', file); // Update the formik values
//   } else {
//     setSelectedImage(null); // Clear the selected image
//   }
// };
//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/getProduct`);
//       setList(res.data);
//     } catch (error) {
//       console.error("Data not found", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/getCategory`);
//       console.log("Categories:", res.data);
//       setCategories(res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };
//   useEffect(() => {
//     fetchCategories();
//   }, [apiUrl])
//   const fetchSize = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/getSize`);
//       console.log("size:", res.data);
//       setSize(res.data);
//       return res.data;
//     } catch (error) {
//       console.error("Error fetching size:", error);
//     }
//   };
//   useEffect(() => {
//     fetchSize();
//   }, [apiUrl])
//   const handleDeleteProduct = async (productId) => {
//     try {
//       const url = `${apiUrl}/deleteProduct/${productId}`;
//       const response = await axios.delete(url);
//       setDeletePro(false)

//       if (response.data.status === 200) {
//         fetchData();
//         toast.success("Delete successful!");
//       }
//     } catch (error) {
//       console.log("Error:", error);
//       toast.error("Error deleting product");
//     }
//   };

//   const handleAddProduct = async (formData) => {
//     try {
//       const response = await axios.post(`${apiUrl}/product`, formData);
//       if (response.status === 200) {
//         fetchData();
//         toast.success("Product added successfully!");
//         handleClose();
//         setCurrentProduct(null);
//       }
//     } catch (error) {
//       toast.error("Error adding product");
//       console.error("Error:", error);
//     }
//   };
//   const handleUpdateProduct = async (formData, productId) => {
//     try {
//       const response = await axios.put(`${apiUrl}/updateProduct/${productId}`, formData);

//       if (response.status === 200) {
//         fetchData();
//         toast.success("Product updated successfully!");
//         handleEditClose();
//       }
//     } catch (error) {
//       toast.error("Error updating product");
//       console.error("Error:", error);
//     }
//   };

//   const fetchAscData = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/sortProduct?sort=asc`);
//       setList(res.data);
//     } catch (error) {
//       console.error("Data not found", error);
//     }
//   };

//   const fetchDescData = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/sortProduct?sort=desc`);
//       setList(res.data);
//     } catch (error) {
//       console.error("Data not found", error);
//     }
//   };


//   return (
//     <>
//       <HeaderBar />
//       <div style={{ marginLeft: "270px", marginRight: "100px", marginTop: "30px" }}>
//         <table style={{ width: '60%', borderCollapse: 'collapse', border: '5px solid rgba(255, 153, 153)' }}>
//           <thead>
//             <tr>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Serial No.      </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }} >Image          </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Product Name    </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Description     </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Category        </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>
//   Price 
//   <button onClick={fetchAscData} style={{ padding: '0', border: 'none', backgroundColor: 'transparent' }}>
//     <ArrowUpwardIcon style={{ fontSize: '16px' }} />
//   </button>
//   <button onClick={fetchDescData} style={{ padding: '0', border: 'none', backgroundColor: 'transparent' }}>
//     <ArrowDownwardIcon style={{ fontSize: '16px' }} />
//   </button>
// </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Available Sizes </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Available Colors</th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Material Type   </th>
//               <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Action          </th>
//             </tr>
//           </thead>
//           <tbody>

//             {list.map((product, index) => (
//               <tr key={index}>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{index + 1}</td>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>
//                 {product.image && (
//   <img
//     src={`${apiUrl}/upload/images/${product.image}`}
//     alt={product.productName}
//     style={{ width: "80px", height: "80px" }}
//   />
// )}
//                 </td>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.productName}     </td>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.description}     </td>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.category}        </td>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.price}           </td>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.availableSizes}  </td>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.availableColors} </td>
//                 <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.materialType}    </td>

//                 <td 
//                 style={{ justifyContent : "center",width : "1px" ,borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}
//                 >

//                   {/* <button onClick={() => handleDeleteProduct(product._id)}><DeleteForeverOutlinedIcon /></button> */}


//                   <button onClick={() => hnadleDelete(product)}><DeleteForeverOutlinedIcon /> </button>
//                   <button onClick={() => handleEditOpen(product)}><ModeEditIcon />                </button>

//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>

//     </div>
// <div>
//     <Dialog
//       open={deletepro}
//       onClose={handleCancel}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description"
//     >
//       <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
//       <DialogContent>
//         <DialogContentText id="alert-dialog-description">
//           Are you sure you want to delete this product?
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCancel} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={() => handleDeleteProduct(currentProduct._id)} color="primary" autoFocus>
//   Confirm Delete
// </Button>
//       </DialogActions>
//     </Dialog>

//     </div>


//       <div>
//         <Button
//           variant="outlined"
//           onClick={handleClickOpen}
//           sx={{
//             bgcolor: "rgba(255, 153, 153)",
//             color: "#000",
//             marginLeft: "530px",
//             cursor: "pointer",
//             marginTop: "30px",
//             marginLeft: "600px",
//             borderColor: "rgba(255, 153, 153)",
//           }}
//         >
//           Add Product
//         </Button>
//         <Dialog open={open} onClose={handleClose}>

//           <DialogTitle>Add Product</DialogTitle>

//           <Avatar
//             sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
//             src={formik.values.image ? URL.createObjectURL(formik.values.image) : ""}
//             alt="Profile"
//           />


//           <input
//             accept="image/*"
//             id="image-upload"
//             type="file"
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />
//           <label htmlFor="image-upload">
//             <Button
//               sx={{
//                 marginLeft: 24,
//                 backgroundColor: 'rgba(255, 153, 153)',
//                 color: '#fff',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255, 153, 153)',
//                 },
//               }}
//               component="span"
//             >
//               Upload Image
//             </Button>
//           </label>
//           <DialogContent>
//             <TextField
//               margin="dense"
//               id="productName"
//               name="productName"
//               label="Product Name"
//               fullWidth
//               variant="standard"
//               value={formik.values.productName}
//               onChange={formik.handleChange}
//               error={formik.touched.productName && Boolean(formik.errors.productName)}
//               helperText={formik.touched.productName && formik.errors.productName}
//             />
//             <TextField
//               margin="dense"
//               id="description"
//               name="description"
//               label="Description"
//               fullWidth
//               variant="standard"
//               value={formik.values.description}
//               onChange={formik.handleChange}
//               error={formik.touched.description && Boolean(formik.errors.description)}
//               helperText={formik.touched.description && formik.errors.description}
//             />
//             <InputLabel id="category">Category</InputLabel>
//             <Select
//               autoFocus
//               margin="dense"
//               id="category"
//               name="category"
//               label="Category"
//               fullWidth
//               variant="standard"
//               multiple
//               value={formik.values.category}
//               onChange={(event) => {
//                 formik.setFieldValue('category', event.target.value);
//               }}
//               error={formik.touched.category && Boolean(formik.errors.category)}
//               helperText={formik.touched.category && formik.errors.category}
//             >
//               {categories.map((item, index) => (
//                 <MenuItem key={index} value={item.category}>
//                   {item.category}
//                 </MenuItem>
//               ))}
//             </Select>


//             <TextField
//               margin="dense"
//               id="price"
//               name="price"
//               label="Price"
//               fullWidth
//               variant="standard"
//               value={formik.values.price}
//               onChange={formik.handleChange}
//               error={formik.touched.price && Boolean(formik.errors.price)}
//               helperText={formik.touched.price && formik.errors.price}
//             />
//             <InputLabel id="availableaSizes">Size</InputLabel>
//             <Select
//               autoFocus
//               margin="dense"
//               id="availableSizes"
//               name="availableSizes"
//               label="Available Sizes"
//               fullWidth
//               variant="standard"
//               multiple
//               value={formik.values.availableSizes}
//               onChange={(event) => {
//                 formik.setFieldValue('availableSizes', event.target.value);
//               }}
//               error={formik.touched.availableSizes && Boolean(formik.errors.availableSizes)}
//               helperText={formik.touched.availableSizes && formik.errors.availableSizes}
//             >
//               {size.map((item, index) => (
//                 <MenuItem key={index} value={item.size}>
//                   {item.size}
//                 </MenuItem>
//               ))}
//             </Select>

//             <TextField
//               margin="dense"
//               id="availableColors"
//               name="availableColors"
//               label="available Colors"
//               fullWidth
//               variant="standard"
//               value={formik.values.availableColors}
//               onChange={formik.handleChange}
//               error={formik.touched.availableColors && Boolean(formik.errors.availableColors)}
//               helperText={formik.touched.availableColors && formik.errors.availableColors}
//             />
//             <TextField
//               margin="dense"
//               id="materialType"
//               name="materialType"
//               label="Material Type"
//               fullWidth
//               variant="standard"
//               value={formik.values.materialType}
//               onChange={formik.handleChange}
//               error={formik.touched.materialType && Boolean(formik.errors.materialType)}
//               helperText={formik.touched.materialType && formik.errors.materialType}
//             />

//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button onClick={formik.handleSubmit}>Add</Button>

//           </DialogActions>
//         </Dialog>

//         <Dialog open={editOpen} onClose={handleEditClose}>
//           <DialogTitle>Update Product</DialogTitle>
//           <Avatar
//   sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
//   src={
//     selectedImage && selectedImage.type && selectedImage.type.startsWith('image/')
//       ? URL.createObjectURL(selectedImage)
//       : (currentProduct && currentProduct.image ? `${apiUrl}/upload/images/${currentProduct.image}` : "")
//   }
//   alt="Profile"
// />

//           <input
//             accept="image/*"
//             id="image-upload"
//             type="file"
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />
//           <label htmlFor="image-upload">
//             <Button
//               sx={{
//                 marginLeft: 24,
//                 backgroundColor: 'rgba(255, 153, 153)',
//                 color: '#fff',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255, 153, 153)',
//                 },
//               }}
//               component="span"
//             >
//               Upload Image
//             </Button>
//           </label>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="productName"
//               name="productName"
//               label="Product Name"
//               fullWidth
//               variant="standard"
//               value={formik.values.productName}
//               onChange={formik.handleChange}
//             />

//             <TextField
//               autoFocus
//               margin="dense"
//               id="description"
//               name="description"
//               label="Description"
//               fullWidth
//               variant="standard"
//               value={formik.values.description}
//               onChange={formik.handleChange}
//             />

//             <InputLabel id="category">Category</InputLabel>
//             <Select
//               autoFocus
//               margin="dense"
//               id="category"
//               label="Category"
//               fullWidth
//               variant="standard"
//               multiple
//               value={formik.values.category}
//               onChange={(event) => {
//                 formik.setFieldValue('category', event.target.value);
//               }}
//               error={formik.touched.category && Boolean(formik.errors.category)}
//               helperText={formik.touched.category && formik.errors.category}
//             >
//               {categories.map((item, index) => (
//                 <MenuItem key={index} value={item.category}>
//                   {item.category}
//                 </MenuItem>
//               ))}
//             </Select>

//             <TextField
//               autoFocus
//               margin="dense"
//               id="price"
//               name="price"
//               label="price"
//               fullWidth
//               variant="standard"
//               value={formik.values.price}
//               onChange={formik.handleChange}
//             />

//             <InputLabel id="availableaSizes">Size</InputLabel>
//             <Select
//               autoFocus
//               margin="dense"
//               id="availableSizes"
//               label="Size"
//               fullWidth
//               variant="standard"
//               multiple
//               value={formik.values.availableSizes}
//               onChange={(event) => {
//                 formik.setFieldValue('availableSizes', event.target.value);
//               }}
//               error={formik.touched.availableSizes && Boolean(formik.errors.availableSizes)}
//               helperText={formik.touched.availableSizes && formik.errors.availableSizes}

//             >
//               {size.map((item, index) => (
//                 <MenuItem key={index} value={item.size}>
//                   {item.size}
//                 </MenuItem>
//               ))}
//             </Select>

//             <TextField
//               autoFocus
//               margin="dense"
//               id="availableColors"
//               name="availableColors"
//               label="Available Colors"
//               fullWidth
//               variant="standard"
//               value={formik.values.availableColors}
//               onChange={formik.handleChange}
//             />

//             <TextField
//               autoFocus
//               margin="dense"
//               id="materialType"
//               name="materialType"
//               label="material Type"
//               fullWidth
//               variant="standard"
//               value={formik.values.materialType}
//               onChange={formik.handleChange}
//             />

//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleEditClose}>Cancel</Button>
//             <Button onClick={formik.handleSubmit}>Update</Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, TextField } from '@mui/material';
import { Select, MenuItem, FormControl } from '@mui/material';
import { InputLabel } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DialogContentText from '@mui/material/DialogContentText';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Product() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(null);
  const [deletepro, setDeletePro] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  // const [selectedSize, setSelectedSize] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2); 

  const validationSchema = Yup.object({
    productName: Yup.string().required('Product Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    availableColors: Yup.string().required('Available Colors is required'),
    materialType: Yup.string().required('Material Type is required'),
    category: Yup.array().min(1, 'Category is required'),
    availableSizes: Yup.array().min(1, 'Available Sizes is required'),
  });

  const formik = useFormik({

    initialValues: {
      productName: currentProduct ? currentProduct.productName : '',
      description: currentProduct ? currentProduct.description : '',
      price: currentProduct ? currentProduct.price : '',
      availableColors: currentProduct ? currentProduct.availableColors : '',
      materialType: currentProduct ? currentProduct.materialType : '',
      category: currentProduct ? currentProduct.category : [],
      availableSizes: currentProduct ? currentProduct.availableSizes : [],
      image: null,
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('productName', values.productName);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('availableColors', values.availableColors);
      formData.append('materialType', values.materialType);
      formData.append('availableSizes', values.availableSizes.join(','));
      formData.append('category', values.category.join(','));
      formData.append('image', values.image); 
      if (selectedImage && selectedImage.type.startsWith('image/')) {
      } else {
        console.error('Selected file is not an image');
      }

      if (currentProduct) {
        handleUpdateProduct(formData, currentProduct._id);
      }
      else {
        handleAddProduct(formData)
      }
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null); 
    formik.resetForm();
  };
  const handleEditOpen = (product) => {
    console.log("Selected Product:", product); 
    setCurrentProduct(product);
    setSelectedImage(product.image);
    console.log("Current Product State:", currentProduct); 
    setEditOpen(true);
  };

  const hnadleDelete = (productId) => {
    console.log("Selected Product:", productId);
    setCurrentProduct(productId);
    setDeletePro(true)
  }

  const handleCancel = () => {
    setDeletePro(false)

  }


  useEffect(() => {
    if (currentProduct) {
      formik.setValues({
        productName: currentProduct.productName,
        description: currentProduct.description,
        price: currentProduct.price,
        availableColors: currentProduct.availableColors,
        materialType: currentProduct.materialType,
        category: currentProduct.category ? currentProduct.category.split(',') : [],
        availableSizes: currentProduct.availableSizes ? currentProduct.availableSizes.split(',') : [],

      });
    }
  }, [currentProduct]);



  const handleEditClose = () => {
    setEditOpen(false);
    formik.setFieldValue('image', null); 
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); 
      formik.setFieldValue('image', file); 
    } else {
      setSelectedImage(null); 
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/getProduct`);
      setList(res.data);
    } catch (error) {
      console.error("Data not found", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/getCategory`);
      console.log("Categories:", res.data);
      setCategories(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [apiUrl])
  const fetchSize = async () => {
    try {
      const res = await axios.get(`${apiUrl}/getSize`);
      console.log("size:", res.data);
      setSize(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching size:", error);
    }
  };
  useEffect(() => {
    fetchSize();
  }, [apiUrl])
  const handleDeleteProduct = async (productId) => {
    try {
      const url = `${apiUrl}/deleteProduct/${productId}`;
      const response = await axios.delete(url);
      setDeletePro(false)

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
      const response = await axios.post(`${apiUrl}/product`, formData);
      if (response.status === 200) {
        fetchData();
        toast.success("Product added successfully!");
        handleClose();
        setCurrentProduct(null);
      }
    } catch (error) {
      toast.error("Error adding product");
      console.error("Error:", error);
    }
  };
  const handleUpdateProduct = async (formData, productId) => {
    try {
      const response = await axios.put(`${apiUrl}/updateProduct/${productId}`, formData);

      if (response.status === 200) {
        fetchData();
        toast.success("Product updated successfully!");
        handleEditClose();
      }
    } catch (error) {
      toast.error("Error updating product");
      console.error("Error:", error);
    }
  };

  const fetchAscData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/sortProduct?sort=asc`);
      setList(res.data);
    } catch (error) {
      console.error("Data not found", error);
    }
  };

  const fetchDescData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/sortProduct?sort=desc`);
      setList(res.data);
    } catch (error) {
      console.error("Data not found", error);
    }
  };

  const paginate = (array, pageNumber, pageSize) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };




  return (
    <>
      <HeaderBar />
      <div style={{ marginLeft: "270px", marginRight: "100px", marginTop: "30px" }}>
        <table style={{ width: '60%', borderCollapse: 'collapse', border: '5px solid rgba(255, 153, 153)' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Serial No.      </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }} >Image          </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Product Name    </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Description     </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Category        </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>
                Price
                <button onClick={fetchAscData} style={{ padding: '0', border: 'none', backgroundColor: 'transparent' }}>
                  <ArrowUpwardIcon style={{ fontSize: '16px' }} />
                </button>
                <button onClick={fetchDescData} style={{ padding: '0', border: 'none', backgroundColor: 'transparent' }}>
                  <ArrowDownwardIcon style={{ fontSize: '16px' }} />
                </button>
              </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Available Sizes </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Available Colors</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Material Type   </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Action          </th>
            </tr>
          </thead>
          <tbody>

            {paginate(list, currentPage, itemsPerPage).map((product, index) => (

              <tr key={index}>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{index + 1}</td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>
                  {product.image && (
                    <img
                      src={`${apiUrl}/upload/images/${product.image}`}
                      alt={product.productName}
                      style={{ width: "80px", height: "80px" }}
                    />
                  )}
                </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.productName}     </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.description}     </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.category}        </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.price}           </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.availableSizes}  </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.availableColors} </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.materialType}    </td>

                <td
                  style={{ justifyContent: "center", width: "1px", borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}
                >

                  {/* <button onClick={() => handleDeleteProduct(product._id)}><DeleteForeverOutlinedIcon /></button> */}


                  <button onClick={() => hnadleDelete(product)}><DeleteForeverOutlinedIcon /> </button>
                  <button onClick={() => handleEditOpen(product)}><ModeEditIcon />                </button>

                </td>

              </tr>

            ))}
          </tbody>
        </table>

        <FormControl style={{ minWidth: '60px', marginRight: '20px', marginTop: "20px" }}>
          {/* <InputLabel id="items-per-page-label">Items Per Page</InputLabel> */}
          <Select
            labelId="items-per-page-label"
            id="items-per-page"
            value={itemsPerPage}
            onChange={(event) => setItemsPerPage(event.target.value)}
          >

            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            {/* Add more options as per your requirement */}
          </Select>
        </FormControl>




        <div style={{ marginLeft: "550px" }}>
          <Button variant="contained" color="primary" width="100px" onClick={prevPage}>
            Previous
          </Button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <Button width="30px" variant="contained" color="primary" onClick={nextPage}>
            Next
          </Button>
        </div>




      </div>
      <div>
        <Dialog
          open={deletepro}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleDeleteProduct(currentProduct._id)} color="primary" autoFocus>
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>

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
          Add Product
        </Button>
        <Dialog open={open} onClose={handleClose}>

          <DialogTitle>Add Product</DialogTitle>

          <Avatar
            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
            src={formik.values.image ? URL.createObjectURL(formik.values.image) : ""}
            alt="Profile"
          />


          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button
              sx={{
                marginLeft: 24,
                backgroundColor: 'rgba(255, 153, 153)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 153, 153)',
                },
              }}
              component="span"
            >
              Upload Image
            </Button>
          </label>
          <DialogContent>
            <TextField
              margin="dense"
              id="productName"
              name="productName"
              label="Product Name"
              fullWidth
              variant="standard"
              value={formik.values.productName}
              onChange={formik.handleChange}
              error={formik.touched.productName && Boolean(formik.errors.productName)}
              helperText={formik.touched.productName && formik.errors.productName}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              fullWidth
              variant="standard"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <InputLabel id="category">Category</InputLabel>
            <Select
              autoFocus
              margin="dense"
              id="category"
              name="category"
              label="Category"
              fullWidth
              variant="standard"
              multiple
              value={formik.values.category}
              onChange={(event) => {
                formik.setFieldValue('category', event.target.value);
              }}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              {categories.map((item, index) => (
                <MenuItem key={index} value={item.category}>
                  {item.category}
                </MenuItem>
              ))}
            </Select>


            <TextField
              margin="dense"
              id="price"
              name="price"
              label="Price"
              fullWidth
              variant="standard"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <InputLabel id="availableaSizes">Size</InputLabel>
            <Select
              autoFocus
              margin="dense"
              id="availableSizes"
              name="availableSizes"
              label="Available Sizes"
              fullWidth
              variant="standard"
              multiple
              value={formik.values.availableSizes}
              onChange={(event) => {
                formik.setFieldValue('availableSizes', event.target.value);
              }}
              error={formik.touched.availableSizes && Boolean(formik.errors.availableSizes)}
              helperText={formik.touched.availableSizes && formik.errors.availableSizes}
            >
              {size.map((item, index) => (
                <MenuItem key={index} value={item.size}>
                  {item.size}
                </MenuItem>
              ))}
            </Select>

            <TextField
              margin="dense"
              id="availableColors"
              name="availableColors"
              label="available Colors"
              fullWidth
              variant="standard"
              value={formik.values.availableColors}
              onChange={formik.handleChange}
              error={formik.touched.availableColors && Boolean(formik.errors.availableColors)}
              helperText={formik.touched.availableColors && formik.errors.availableColors}
            />
            <TextField
              margin="dense"
              id="materialType"
              name="materialType"
              label="Material Type"
              fullWidth
              variant="standard"
              value={formik.values.materialType}
              onChange={formik.handleChange}
              error={formik.touched.materialType && Boolean(formik.errors.materialType)}
              helperText={formik.touched.materialType && formik.errors.materialType}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={formik.handleSubmit}>Add</Button>

          </DialogActions>
        </Dialog>

        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Update Product</DialogTitle>
          <Avatar
            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
            src={
              selectedImage && selectedImage.type && selectedImage.type.startsWith('image/')
                ? URL.createObjectURL(selectedImage)
                : (currentProduct && currentProduct.image ? `${apiUrl}/upload/images/${currentProduct.image}` : "")
            }
            alt="Profile"
          />

          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button
              sx={{
                marginLeft: 24,
                backgroundColor: 'rgba(255, 153, 153)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 153, 153)',
                },
              }}
              component="span"
            >
              Upload Image
            </Button>
          </label>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="productName"
              name="productName"
              label="Product Name"
              fullWidth
              variant="standard"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />

            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              fullWidth
              variant="standard"
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <InputLabel id="category">Category</InputLabel>
            <Select
              autoFocus
              margin="dense"
              id="category"
              label="Category"
              fullWidth
              variant="standard"
              multiple
              value={formik.values.category}
              onChange={(event) => {
                formik.setFieldValue('category', event.target.value);
              }}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              {categories.map((item, index) => (
                <MenuItem key={index} value={item.category}>
                  {item.category}
                </MenuItem>
              ))}
            </Select>

            <TextField
              autoFocus
              margin="dense"
              id="price"
              name="price"
              label="price"
              fullWidth
              variant="standard"
              value={formik.values.price}
              onChange={formik.handleChange}
            />

            <InputLabel id="availableaSizes">Size</InputLabel>
            <Select
              autoFocus
              margin="dense"
              id="availableSizes"
              label="Size"
              fullWidth
              variant="standard"
              multiple
              value={formik.values.availableSizes}
              onChange={(event) => {
                formik.setFieldValue('availableSizes', event.target.value);
              }}
              error={formik.touched.availableSizes && Boolean(formik.errors.availableSizes)}
              helperText={formik.touched.availableSizes && formik.errors.availableSizes}

            >
              {size.map((item, index) => (
                <MenuItem key={index} value={item.size}>
                  {item.size}
                </MenuItem>
              ))}
            </Select>

            <TextField
              autoFocus
              margin="dense"
              id="availableColors"
              name="availableColors"
              label="Available Colors"
              fullWidth
              variant="standard"
              value={formik.values.availableColors}
              onChange={formik.handleChange}
            />

            <TextField
              autoFocus
              margin="dense"
              id="materialType"
              name="materialType"
              label="material Type"
              fullWidth
              variant="standard"
              value={formik.values.materialType}
              onChange={formik.handleChange}
            />

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