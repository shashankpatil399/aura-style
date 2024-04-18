import React, { useEffect,useState } from "react";
import Axios from 'axios';
import HeaderBar from './HeaderBar';

const apiUrl = process.env.REACT_APP_API_URL;
export default function GetProductName({productName}) {
    console.log("Received productName:", productName);

    const [list, setList] = React.useState([]);
    const [url, setUrl] = useState('');
    console.log("lsit",list);

  useEffect(() => {
    const currentUrl = window.location.href;
    console.log("Received URL:", currentUrl);
    setUrl(currentUrl);

    const productName = currentUrl.split('/').pop();
        console.log("Extracted product name:", productName);

      Axios.get( `${apiUrl}/product/${productName}`)
        .then((res) => setList(res.data))
        .catch(error => console.error("Error fetching product data:", error));
        console.log("product naem ",productName);

  }, [productName ]);

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
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Price           </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Available Sizes </th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Available Colors</th>
              <th style={{ backgroundColor: '#f2f2f2', padding: '12px 8px', textAlign: 'left', borderBottom: '5px solid rgba(255, 153, 153)' }}>Material Type   </th>
            </tr>
          </thead>
          <tbody>

            {list.map((product, index) => (
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

                <td style={{ padding: '8px', borderColor: 'rgba(255, 153, 153)', borderBottom: '5px solid rgba(255, 153, 153)' }}>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
  )
}