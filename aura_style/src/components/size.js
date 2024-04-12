import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderBar from "./HeaderBar";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const apiUrl = process.env.REACT_APP_API_URL;

function Size() {
    const [list, setList] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/getSize`);
            setList(res.data);
        } catch (error) {
            console.error("Data not found", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (id) => {
        try {
            const url = `${apiUrl}/deleteSize/${id}`;
            console.log("id", id);
            const response = await axios.delete(url);
    
            if (response.data.status === 200) {
                fetchData();
                toast.success('Delete successful!');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleAddSize = async () => {
        const sizeName = document.getElementById("name").value;
    
        try {
            const response = await axios.post(`${apiUrl}/addSize`, { size: sizeName });
            if (response.status === 200) {
                fetchData();
                toast.success('size added successfully!');
                handleClose();
            } else {
                console.log('Invalid data', response.status);
            }
        } catch (error) {
            toast.error("Error adding category");
            console.error('Error:', error);
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
                            <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Size</th>
                            <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((value, index) => (
                            <tr key={index}>
                                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{index + 1}</td>
                                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>{value.size}</td>      
                                <td style={{ border: '5px solid rgba(255, 153, 153)', padding: '8px', borderColor: 'rgba(255, 153, 153)' }}>
    <button style={{ backgroundColor: 'rgba(255, 153, 153)', color: '#000', padding: '12px 14px', cursor: 'pointer', borderRadius: '12%', borderColor: 'rgba(255, 153, 153)' }} onClick={() => handleSubmit(value._id)}>Delete</button>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <Button variant="outlined" onClick={handleClickOpen}  sx={{ bgcolor: 'rgba(255, 153, 153)', color: '#000',marginLeft:'530px',cursor: 'pointer', marginTop : "30px",borderColor: 'rgba(255, 153, 153)' }}>Add Size</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleAddSize,
                }}
            >
                <DialogTitle>Add size</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="SIZE"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
            </div>
        </>
    );
}

export default Size;
