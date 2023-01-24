import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

import '../Edit/edit.scss'

const Edit = () => {
    const [product_Id] = useState(useParams().id)
    const [updated, setUpdated] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({
        name: "",
        image: "",
        price: "",
        qty: "",
        info: ""
    });

    const updateHandler = (e) => {
        setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        Axios.get(`https://dull-jade-lemming-coat.cyclic.app/product/${product_Id}`).then((response) => {
            setSelectedProduct(response.data);
        }).catch(() => { })
    }, [product_Id])

    const submitHandler = (e) => {
        e.preventDefault();
        const url = `https://dull-jade-lemming-coat.cyclic.app/product/${product_Id}`
        Axios.put(url, selectedProduct).then((res) => {
            console.log(res.data);
            setUpdated(true)
        }).catch(() => { })
    }

    const changeImage = (event) => {
        console.log(event);
        const imageFile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load', () => {
            if (reader.result) {
                setSelectedProduct({ ...selectedProduct, image: reader.result })
            }
            else {
                alert('Error Occured')
            }
        })
    }

    return <>
        {
            updated ? <Navigate to='/admin' /> :
                <div className="card">
                    <div className="card-header">
                        <h2>Update Product</h2>
                    </div>
                    <div className="card-body">

                        <form onSubmit={submitHandler}>
                            <div className='form-group'>
                                <input type="text" name='name' value={selectedProduct.name} onChange={updateHandler} placeholder='product name' />
                            </div>
                            <div className='form-group'>
                                <input type="file" name='image' className='file' onChange={changeImage} placeholder='image' />
                            </div>
                            <div className='form-group'>
                                <input type="number" name='price' value={selectedProduct.price} onChange={updateHandler} placeholder='price' />
                            </div>
                            <div className='form-group'>
                                <input type="number" name='qty' value={selectedProduct.qty} onChange={updateHandler} placeholder='qty(kgs)' />
                            </div>
                            <div className='form-group'>
                                <input type="text" name='info' value={selectedProduct.info} onChange={updateHandler} placeholder='info' />
                            </div>
                            <input type="submit" className='btn' value='Update' onChange={updateHandler} />
                        </form>
                    </div>
                </div>
        }
    </>
}

export default Edit
