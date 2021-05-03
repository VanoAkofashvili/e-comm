import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import {message, Form, Input, InputNumber, Modal, Select, Button} from "antd";
import {useDispatch} from "react-redux";
import {addProduct, closeAddProductModal, editProduct, setNowEditing} from "../../../redux/actions/itemActions";
import {Link} from "react-router-dom";
import {CloudUploadOutlined} from "@ant-design/icons";
import "./index.css"
import {Upload} from "antd";
import {beforeImageUpload} from "../../../utils/Shared/imgUpload";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dompurify from "dompurify";
import {fetchProducts} from "../../../redux/actions/productsAction";
import ProductForm from "./ProductForm";

const sanitizer = dompurify.sanitize;
const {TextArea} = Input;
const {Option} = Select;


const initialImg = {
    uid: "-1",
    name: "no-img.png",
    status: "done",
    url: "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png",
    thumbUrl: "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"
  }

const AddProduct = () => {
  const [selectedImg, setSelectedImg] = useState([initialImg]);

  const [form] = Form.useForm();


  const dispatch = useDispatch();
  const {isModalOpen, addProductLoading, nowEditing} = useSelector(state => state.itemReducer);
  const userId = useSelector(state => state.authReducer.user.sub);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        const image = selectedImg[0].thumbUrl;
        const productInfo = {...values, description: sanitizer(values.description), image, userId,}
        if (nowEditing) {
          dispatch(editProduct(nowEditing.id, productInfo));
        }
        dispatch(addProduct(productInfo));
        form.resetFields();
        dispatch(fetchProducts());
        dispatch(closeAddProductModal());
        setSelectedImg([initialImg])
      })
      .catch(error => {
        console.log(error, 'failed')
      })
  }

  const handleCancel = () => {
    dispatch(closeAddProductModal())
    dispatch(setNowEditing(null))
  }

  const handleImgChange = (info) => {
    let fileList = [...info.fileList]
    console.log(fileList);
    setSelectedImg(fileList);
  }

  const beforeImgUpload = (file) => {
    const [status, errors] = beforeImageUpload(file);
    errors.forEach(err => {
      message.error(err)
    })
  }

  return <Modal
    title={nowEditing ? "Update product" : "Add a New Product"}
    visible={isModalOpen}
    onOk={handleSubmit}
    okText={nowEditing ? "Update" : "Add"}
    cancelText="Cancel"
    confirmLoading={addProductLoading}
    onCancel={handleCancel}
    width={"auto"}
    style={{maxWidth: "800px"}}
  >
  <ProductForm
    form={form}
    selectedImg={selectedImg}
    beforeImgUpload={beforeImgUpload}
    handleImgChange={handleImgChange}
  />
  </Modal>
}

export default AddProduct;