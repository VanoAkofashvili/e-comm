import React from "react";
import {useParams} from "react-router-dom";
import {Layout, Row} from "antd";
import Products from "../modules/components/ProductCards";
import ProductsFilter from "../modules/components/ProductsFilter";
const {Content} = Layout;


export const ProductList = () => {
  console.log('ProductList')
  const params = useParams();
  console.log(params)
  return <Layout className="container">
    <Content>
      <ProductsFilter />

          <Products category={params.category} />

    </Content>
  </Layout>



  
}