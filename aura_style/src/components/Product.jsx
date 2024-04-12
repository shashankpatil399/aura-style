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
import {InputLabel} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Product() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen]= useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);


  console.log("gdfgdg--------",selectedCategory);

    const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    availableColors: "",
    materialType: "",
    category: "",
    availableSizes: [],
  });

  console.log("list",list);
console.log("categories",categories);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


const handleEditOpen = (product) => {
  setEditOpen(true);
  setFormData({
    productName: product.productName,
    description: product.description,
    price: product.price,
    availableColors: product.availableColors,
    materialType: product.materialType,
    category: product.category,
    availableSizes: product.availableSizes,
  });
};

  const handleEditClose = () => {
    setEditOpen(false);
    
  }

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
      setCategories(res.data);
      return res.data; 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
  fetchCategories(); 
},[apiUrl])


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
},[apiUrl])


const handleDeleteProduct = async (productId) => {
  console.log("product",productId);
  try {
    const url = `${apiUrl}/deleteProduct/${productId}`;
    const response = await axios.delete(url);

    if (response.data.status === 200) {
      fetchData();
      toast.success("Delete successful!");
    }
  } catch (error) {
    console.log("Error:", error);
    toast.error("Error deleting product");
  }
};

  console.log(categories)
  console.log(size)

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
const handleUpdateProduct = async (productId) => {
  try {
    const updatedFormData = {
      productName: formData.productName,
      description: formData.description,
      price: formData.price,
      availableColors: formData.availableColors,
      materialType: formData.materialType,
      category: formData.category,
      availableSizes: formData.availableSizes,
    };

    const response = await axios.put(`${apiUrl}/UpdateProduct/${productId}`, updatedFormData);

    if (response.status === 200) {
      toast.success("Product Update Successful.");
      fetchData();
      setEditOpen(false); // Close the dialog after successful update
    }
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Error updating product.");
  }
};


  return (
    <>
      <HeaderBar />
      <div style={{ marginLeft: "270px", marginRight: "100px", marginTop : "30px" }}>
                <table style={{ width: '60%', borderCollapse: 'collapse',border: '5px solid rgba(255, 153, 153)' }}>
        
          <thead>
             <tr>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' , borderBottom: '5px solid rgba(255, 153, 153)'}}>Serial No.      </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)'}} >Image           </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Product Name    </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)'}}>Description      </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Category        </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' , borderBottom: '5px solid rgba(255, 153, 153)'}}>Price           </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Available Sizes </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Available Colors</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)'}}>Material Type    </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' , borderBottom: '5px solid rgba(255, 153, 153)'}}>Action          </th>
            </tr>
          </thead>
          <tbody>
           
            {list.map((product,index) => (
              <tr key={index}>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)' , borderBottom: '5px solid rgba(255, 153, 153)' }}>{index + 1}</td>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)' , borderBottom: '5px solid rgba(255, 153, 153)' }}>
                  {product.image && (
                    <img
                      src={`${apiUrl}/upload/images/${product.image}`}
                      alt={product.productName}
                      style={{ width: "80px", height: "80px" }}
                    />
                  )}
                </td>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)'  , borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.productName}    </td>
                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)'  , borderBottom: '5px solid rgba(255, 153, 153)' }}>{product.description}    </td>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)'  , borderBottom: '5px solid rgba(255, 153, 153)'}}>{product.category}        </td>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)'  , borderBottom: '5px solid rgba(255, 153, 153)'}}>{product.price}           </td>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)'  , borderBottom: '5px solid rgba(255, 153, 153)'}}>{product.availableSizes}  </td>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)'  , borderBottom: '5px solid rgba(255, 153, 153)'}}>{product.availableColors} </td>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)'  , borderBottom: '5px solid rgba(255, 153, 153)'}}>{product.materialType}    </td>
                <td style={{  padding: '8px', borderColor: 'rgba(255, 153, 153)'  , borderBottom: '5px solid rgba(255, 153, 153)'}}>
  
                  <button onClick={() => handleDeleteProduct(product._id)}><DeleteIcon /></button>
                  <button onClick={() => handleEditOpen(product)}>Update</button>

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
            marginLeft  : "600px",
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


<InputLabel id="category">Category</InputLabel>
<Select
 autoFocus
 margin="dense"
    id="category"
    label="categorylabel"
    fullWidth
    labelId="category"
    variant="standard"
    defaultValue=""
    multiple
    value={selectedCategory}
    onChange={(event) => setSelectedCategory(event.target.value)}>
  
    {categories.map((item,index) => (
      <MenuItem key={index} value={item.category}>
        {item.category}
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
            {/* <TextField
              margin="dense"
              id="availableSizes"
              label="Available Sizes"
              fullWidth
              variant="standard"
            /> */}



<InputLabel id="availableaSizes">Size</InputLabel>
<Select
  autoFocus
  margin="dense"
  id="availableSizes"
  label="Size"
  fullWidth
  labelId="availableSizes"
  variant="standard"
  value={selectedSize}
  multiple
  onChange={(event) => setSelectedSize(event.target.value)}>
  {size.map((item,index) => (
    <MenuItem key={index} value={item.size}>
      {item.size}
    </MenuItem>
  ))}
</Select>

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
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                
                const formData = new FormData();
                formData.append("productName",      document.getElementById("productName").value);
                formData.append("description",      document.getElementById("description").value);
                formData.append("price",            document.getElementById("price").value);
                formData.append("availableColors",  document.getElementById("availableColors").value);
                formData.append("materialType",     document.getElementById("materialType").value);
                formData.append('image',            selectedImage);
                formData.append("availableSizes",   selectedSize);
                formData.append("category",         selectedCategory);

               
                handleAddProduct(formData);
              }}
            >
            Add
            </Button>
          </DialogActions>
        </Dialog>

































        <Dialog open={editOpen} onClose={handleEditClose}>
                    <DialogTitle>Update Product</DialogTitle>
          
          <Avatar
                    sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                    src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
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
    backgroundColor: 'rgba(255, 153, 153)', // Adjust the color as needed
    color: '#fff', // Text color
    '&:hover': {
      backgroundColor: 'rgba(255, 153, 153)', // Hover color
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


<InputLabel id="category">Category</InputLabel>
<Select
 autoFocus
 margin="dense"
    id="category"
    label="categorylabel"
    fullWidth
    labelId="category"
    variant="standard"
    defaultValue=""
    multiple
    value={selectedCategory}
    onChange={(event) => setSelectedCategory(event.target.value)}>
  
    {categories.map((item,index) => (
      <MenuItem key={index} value={item.category}>
        {item.category}
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
            {/* <TextField
              margin="dense"
              id="availableSizes"
              label="Available Sizes"
              fullWidth
              variant="standard"
            /> */}



<InputLabel id="availableaSizes">Size</InputLabel>
<Select
  autoFocus
  margin="dense"
  id="availableSizes"
  label="Size"
  fullWidth
  labelId="availableSizes"
  variant="standard"
  value={selectedSize}
  multiple
  onChange={(event) => setSelectedSize(event.target.value)}>
  {size.map((item,index) => (
    <MenuItem key={index} value={item.size}>
      {item.size}
    </MenuItem>
  ))}
</Select>

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
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button
              onClick={() => {
                
                // const formData = new FormData();
                // formData.append("productName",      document.getElementById("productName").value);
                // formData.append("description",      document.getElementById("description").value);
                // formData.append("price",            document.getElementById("price").value);
                // formData.append("availableColors",  document.getElementById("availableColors").value);
                // formData.append("materialType",     document.getElementById("materialType").value);
                // formData.append('image',            selectedImage);
                // formData.append("availableSizes",   selectedSize);
                // formData.append("category",         selectedCategory);


                
               
                handleUpdateProduct(formData);
              }}
            >
            Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}


