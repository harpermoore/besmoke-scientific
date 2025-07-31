import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal} from 'antd';
import useDeleteProduct from '../hooks/useDeleteProduct';



const ConfirmDeleteModal = ({productId, setIsProductModalOpen, onSuccess}) => { 
    const { confirmDelete } = useDeleteProduct();
    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
    modal.confirm({
    title: 'Confirm Delete',
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure you want to delete this product permanently?',
    okText: 'Confirm Delete',
    cancelText: 'Cancel',
    okButtonProps: {
      danger: true
    },
    onOk: async () => {
        await confirmDelete(productId)
        setIsProductModalOpen(false)
        onSuccess()
    }
    });
    };
    return(
        <>
        <Button danger size="small" onClick={confirm}>Delete Product</Button>
        {contextHolder}
        </>
    )

}

export default ConfirmDeleteModal;