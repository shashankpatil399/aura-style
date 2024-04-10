import React, { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import { Avatar,TextField} from '@mui/material';
import { Select, MenuItem } from '@mui/material';



const apiUrl = process.env.REACT_APP_API_URL;

export default function Product() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  
console.log("categories",categories);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
}

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
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/getCategory`);
      console.log("Categories:", res.data);
      return res.data; 
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchCategoryData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };
  
    fetchCategoryData();
  }, []);
 

  const handleSubmit = async (id) => {
    try {
      const url = `${apiUrl}/deleteProduct/${id}`;
      const response = await axios.delete(url);

      if (response.data.status === 200) {
        fetchData();
        toast.success("Delete successful!");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddProduct = async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}/product`, formData);

      if (response.status === 200) {
        fetchData();
        toast.success("Product added successfully!");
        handleClose();
      }
    } catch (error) {
      toast.error("Error adding product");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <HeaderBar />
      <div style={{ marginLeft: "400px", marginRight: "100px", marginTop : "30px" }}>
                <table style={{ width: '60%', borderCollapse: 'collapse' }}>
        
          <thead>
            <tr>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Serial No.</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }} >Image</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Product Name</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Description</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Category</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Price</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Available Sizes</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Available Colors</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Material Type</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
           
            {list.map((product,index) => (
              <tr key={index}>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{index + 1}</td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>
                  {product.image && (
                    <img
                      src={`${apiUrl}/upload/images/${product.image}`}
                      alt={product.productName}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{product.productName}</td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{product.description}</td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{product.category}</td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{product.price}</td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{product.availableSizes}</td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{product.availableColors}</td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{product.materialType}</td>
                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>
                  <Link to={`/UpdateProduct/${product._id}`}>Edit</Link>
                  <button
                    onClick={() => handleSubmit(product._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
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
            borderColor: "rgba(255, 153, 153)",
          }}
        >
          Add Product
        </Button>

      
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Product</DialogTitle>
          
          <Avatar
                    sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                    src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
                    alt="Profile"
                />        
                  <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="productName"
              label="Product Name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              variant="standard"
            />

<Select
    id="category"
    label="Category"
    fullWidth
    variant="standard"
    defaultValue=""
  >
    {categories.map(category => (
      <MenuItem key={category._id} value={category.name}>
        {category.name}
      </MenuItem>
    ))}
  </Select>
            <TextField
              margin="dense"
              id="price"
              label="Price"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="availableSizes"
              label="Available Sizes"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="availableColors"
              label="Available Colors"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="materialType"
              label="Material Type"
              fullWidth
              variant="standard"
            />
           
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button component="span">Upload Image</Button>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                
                const formData = new FormData();
                formData.append("productName", document.getElementById("productName").value);
                formData.append("description", document.getElementById("description").value);
                formData.append("price", document.getElementById("price").value);
                formData.append("availableSizes", document.getElementById("availableSizes").value);
                formData.append("availableColors", document.getElementById("availableColors").value);
                formData.append("materialType", document.getElementById("materialType").value);
                formData.append('image', selectedImage);

               
                handleAddProduct(formData);
              }}
            >
            Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}


