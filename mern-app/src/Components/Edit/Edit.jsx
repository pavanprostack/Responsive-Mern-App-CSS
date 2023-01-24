import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

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
        Axios.get(`http://127.66.77.88:5000/product/${product_Id}`).then((response) => {
            setSelectedProduct(response.data);
        }).catch(() => { })
    }, [product_Id])

    const submitHandler = (e) => {
        e.preventDefault();
        const url = `http://127.66.77.88:5000/product/${product_Id}`
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
    
        <div className="container mt-5">
            {/* <pre>{JSON.stringify(selectedProduct)}</pre>
            <pre>{JSON.stringify(product_Id)}</pre>
            <pre>{JSON.stringify(updated)}</pre> */}
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header-form">
                            <h1>Update Product</h1>
                        </div>
                        <div className="card-body bg-dark">

                            <form onSubmit={submitHandler}>
                                <div className='form-group'>
                                    <input type="text" name='name' value={selectedProduct.name} className='form-control' onChange={updateHandler} placeholder='Product Name' />
                                </div>
                                <div className='form-group'>
                                    <input type="file" name='image' className='form-control-file' onChange={changeImage} placeholder='Image' />
                                </div>
                                <div className='form-group'>
                                    <input type="number" name='price' value={selectedProduct.price} className='form-control' onChange={updateHandler} placeholder='Price' />
                                </div>
                                <div className='form-group'>
                                    <input type="number" name='qty' value={selectedProduct.qty} className='form-control' onChange={updateHandler} placeholder='Qty' />
                                </div>
                                <div className='form-group'>
                                    <input type="text" name='info' value={selectedProduct.info} className='form-control' onChange={updateHandler} placeholder='Info' />
                                </div>
                                <input type="submit" className='btn1' value='Update'  onChange={updateHandler}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
}

export default Edit
