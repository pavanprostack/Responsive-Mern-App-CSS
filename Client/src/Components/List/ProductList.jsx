import Axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import '../List/list.scss'

const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = `https://dull-jade-lemming-coat.cyclic.app/product/all`
    Axios.get(url).then((response) => {
      setProducts(response.data);
    }).catch(() => { })
  }, [])

  return <>
    <div className="container">
      {
        products.length > 0 ? <>
          {
            products.map((product, index) => {
              return <div key={index}>
                <div className="card-list">
                  <div className="card-header">
                    <img src={product.image} alt="img" width='90px' />
                  </div>
                  <div className="card-body">
                    <ul>
                      <li className='list-group-item'><b>Name</b> : {product.name}</li>
                      <li className='list-group-item'><b>Price</b> : {product.price}</li>
                      <li className='list-group-item'><b>Qty</b> : {product.qty}</li>
                    </ul>
                  </div>

                </div>
              </div>
            })
          }
        </> : null
      }
    </div>
  </>
}

export default ProductList
