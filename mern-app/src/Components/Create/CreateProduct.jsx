import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Navigate } from 'react-router-dom'

import '../Create/create.scss'

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: ""
  })

  const [submitted, setSubmitted] = useState(false)

  const getInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const url = `http://127.66.77.88:5000/product/create/`
    Axios.post(url, product).then((response) => {
      console.log(response.data);
      setSubmitted(true);
    }).catch(() => { })
  }

  let changeImage = (event) => {
    console.log(event);
    let imageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener('load', () => {
      if (reader.result) {
        setProduct({ ...product, image: reader.result });
      }
      else {
        alert('Error Occurred');
      }
    });
  };

  return <>
    {
      submitted ? <Navigate to="/admin" /> :
        <div className="card">
          <div className="card-header">
            <h2>Select Product</h2>
          </div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className='form-group'>
                <input type="text" placeholder='Product Name' onChange={getInput} name='name' />
              </div>
              <div className='form-group'>
                <input type="file" className='file' onChange={changeImage} name='image' />
              </div>
              <div className='form-group'>
                <input type="text" placeholder='Price' onChange={getInput} name='price' />
              </div>
              <div className='form-group'>
                <input type="text" placeholder='qty' onChange={getInput} name='qty' />
              </div>
              <div className='form-group'>
                <input type="text" placeholder='info' onChange={getInput} name='info' />
              </div>
              <input type="submit" value='Add Product' className='btn' />
            </form>
          </div>
        </div>

    }
  </>
}

export default CreateProduct
