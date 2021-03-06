import React, { useEffect } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../../../../redux/actions/adminActions'
import Avatar from 'antd/lib/avatar/avatar'


const AdminProfileContent = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.adminReducer.users)
    
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch ])

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <div style={{color: "#1890ff"}}>{text}</div>,
        },
        {
            title: "UserName",
            dataIndex: "username",
            key: "username",
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'age',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          render: (text) => text || "user"
        },
        {
            title: "Phone Num",
            dataIndex: "phone",
            key: 'phone'
        },
        {
          title: 'Action',
          key: 'action',
          render: (data) => (
                <Popconfirm title={'Are you sure?'} onConfirm={() => dispatch(deleteUser(data))} okText="Yes" cancelText="No">
                    <Button icon={<DeleteOutlined />}/>
                </Popconfirm>
        )
        },
      ];
      
      
    return (
      <>
       <div style={{width: "90px", margin: "auto", textAlign: "center"}}>
            <Avatar size={64} icon={<UserOutlined />} />
            <h1>Admin Profile</h1>
        </div>
        <Table columns={columns} dataSource={users} />
      </>
    )
}
export default AdminProfileContent