import React, {useEffect} from "react"
import {Button, Card, Col} from "antd";
import {useSelector} from "react-redux";
import {fetchProducts} from "../../../redux/actions/productsAction";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import "./index.css"
import Spinner from "../Spinner";

const {Meta} = Card;

const Products = ({category}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [])

  const {products, productsFetchLoading} = useSelector(state => state.productsReducer);
  return productsFetchLoading ? <Spinner /> : products.map((product, i) => (<Col xs={12} sm={8} md={6} lg={4} key={i}>
      <Card className="product-item" cover={
        <img
          alt="product picture"
          src={product.image}
        />
      }>
        <Meta
          title=<Link to={`/products/${category}/${product.id}`}>{product.title}</Link>
          description={`Price: ${product.price}`}
          style={{width: "100%"}}
        />
        <Button type="primary" style={{marginTop: "15px"}}>Add to Cart</Button>
      </Card>
    </Col>)
  )
}

export default Products;
