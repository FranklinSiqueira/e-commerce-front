/*jshint esversion: 9 */
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { readProductId, listRelatedProducts } from "./apiCore";
import Card from "./Card";
//
const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);
  //
  const loadProduct = productId => {
    //
    readProductId(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // Fetch related products to show on product card's side
        listRelatedProducts(data._id)
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };
  //
  useEffect(() => {
    const productId = props.match.params.productId;
    loadProduct(productId);
  }, [props]);
  //
  return (
    <Layout title={product.name}
      description={product.description}
      class_Name="container-fluid">
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="mb-4">Details</h4>
          <hr/>
          {product && product.description && <Card product={product} showViewButton={false} />}
        </div>
        <div className="col-4">
          <h4 className="mb-4">Related items</h4>
          <hr/>
          {relatedProducts.map((p, i) => (
            <div className="mb-3">
              <Card key={i} product={p}/>
            </div>
          ))}
        </div>
      </div>
      <hr/>
    </Layout>
  )
};
//
export default Product;
