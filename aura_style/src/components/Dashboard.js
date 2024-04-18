import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderBar from './HeaderBar'

const apiUrl = process.env.REACT_APP_API_URL;

function Dashboard() {
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
              axios.get( `${apiUrl}/dashboard`)
                const response = await axios.get( `${apiUrl}/dashboard`)
                setData(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, []);

    return (
<> 
           <HeaderBar/>

           <div style={{ 
    marginLeft: '50%', 
    transform: 'translateX(-50%)', 
    display: 'flex', 
    justifyContent: 'space-between' 
}}>

    <div style={{
        backgroundColor: 'rgb(255, 153, 153)',
        borderRadius: '15px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        width: "30%",
        marginTop: "7%"
    }}>
        <p style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold'
        }}>
            Currently there are <span style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                padding: '2px 5px',
                color: 'rgb(255, 153, 153)'
            }}>
                {data.numProducts}
            </span>  products in your inventory.
        </p>
    </div>

    <div style={{
        backgroundColor: 'rgb(255, 153, 153)',
        borderRadius: '15px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        width: "30%",
        marginTop: "7%"
    }}>
        <p style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold'
        }}>
            Currently there are <span style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                padding: '2px 5px',
                color: 'rgb(255, 153, 153)'
            }}>
                {data.numCategories}
            </span>  Category in your inventory.
        </p>
    </div>

    <div style={{
        backgroundColor: 'rgb(255, 153, 153)',
        borderRadius: '15px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        width: "30%",
        marginTop: "7%"
    }}>
        <p style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold'
        }}>
            Currently there are <span style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                padding: '2px 5px',
                color: 'rgb(255, 153, 153)'
            }}>
              {data.numSizes}
            </span>  Sizes in your inventory.
        </p>
    </div>
</div>

        </>   
    );
} 

export default Dashboard;
