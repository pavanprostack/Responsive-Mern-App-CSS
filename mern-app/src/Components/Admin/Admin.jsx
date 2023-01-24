import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Admin/admin.scss'

const Admin = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const url = `http://127.66.77.88:5000/product/all`
        Axios.get(url).then((response) => {
            setProducts(response.data);
        }).catch(() => { })
    }, [])

    const navigate = useNavigate()

    const delProduct = (id) => {
        const url = `http://127.66.77.88:5000/product/${id}`
        Axios.delete(url).then((response) => {
            console.log(response.data);
            navigate(0);
        }).catch(() => { })
    }

    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                    <table className='table table-hover table-striped'>
                        <thead className='text-center'>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>QTY(kgs)</th>
                                <th>Modification</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                products.length > 0 ? <>
                                    {
                                        products.map((product, index) => {
                                            return <tr key={index}>
                                                <td>{product._id.slice(20, 25)}</td>
                                                <td>{product.name}</td>
                                                <td><img src={product.image} alt="img" width='60px' /></td>
                                                <td>{product.price}</td>
                                                <td>{product.qty}</td>
                                                <td>
                                                    <Link to={`/update/${product._id}`} className='edit-btn'>Edit</Link> &nbsp;
                                                    <Link className='del-btn' onClick={delProduct.bind(this, product._id)}>Delete</Link>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </> : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default Admin
