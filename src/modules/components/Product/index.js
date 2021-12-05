import React, {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../Shared/Spinner";
import {Button, Col, Divider, Image, Modal, Row} from "antd";
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

import { Roles } from '../../../const/Roles';

import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../../redux/actions/cartActions";
import {deleteProduct} from "../../../redux/actions/itemActions";
import ModifyProduct from "./ModifyProduct";

import ReviewList from './Reviews/ReviewList'

import ExtraImages from "../ExtraImages";
import {extraImages} from "../../../const/productExtraImages";
import { API_URL } from "../../../redux/constants";


const {confirm} = Modal;
const Product = ({id}) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const role = useSelector(state => state.authReducer.role)

  const history = useHistory();
  const dispatch = useDispatch();

  const addToCartLoading = useSelector(
    (state) => state.cartReducer.addToCartLoading
  );
  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/products?id=${id}`)
      .then((response) => {
        setProduct(response.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  function confirmDeleteModal(id) {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined/>,
      onOk() {
        dispatch(deleteProduct(id));
        history.replace('/');
      },
      onCancel() {
      },
    });
  }

  return (
    <div className="product-detailed container">
      {isLoading ? (
        <Spinner/>
      ) : (
        <>

          <Row className="product-detail">
            <Col sm={24} md={10} className="product-col-1">
              <button onClick={history.goBack} className="btn-back">
                <ArrowLeftOutlined/>
              </button>
              <div style={{display: "flex", justifyContent:"center"}}>
                 {/*<img src={product?.image} alt="product"/>*/}
                <Image
                  src={product?.image}
                />
              </div>


              {/*Should be dynamic*/}
              <ExtraImages sliderData={extraImages}/>
            </Col>
            <Col sm={24} md={14}>
              {user.sub === product.userId || role === Roles.admin ? (
              <ModifyProduct
                confirmDeleteModal={confirmDeleteModal}
                product={product}
              />
            ) : null}
              <div className="product-content-holder">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">${product.price}</p>
                <Divider/>
                <p
                  className="product-description"
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />
                <div style={{display: "flex", justifyContent:"center"}}>
                  <Button
                    type={"primary"}
                    loading={addToCartLoading}
                    className="product-btn"
                    onClick={() => {
                      const {userId, ...pr} = product;
                      dispatch(addToCart(pr, user));
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>

              </div>
            </Col>

          </Row>

          {/* REVIEWS */}
          {
            product // when product exists
            &&
            <ReviewList
              dispatch={dispatch}
              useSelector={useSelector}
              user={user}
              product={product}
            />
          }

        </>
      )}
    </div>
  );
};

export default Product;
