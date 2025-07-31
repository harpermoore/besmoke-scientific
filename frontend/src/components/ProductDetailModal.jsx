import { Button, Modal, Form, Input, Select, Flex } from "antd";
import useUpdateProduct from "../hooks/useUpdateProduct";


const ProductDetailModal = ({isProductModalOpen, setIsProductModalOpen, handleProductOk, handleProductCancel, selectedProduct}) => {
    const [form] = Form.useForm();  
    const {saveChange} = useUpdateProduct();

    const onFinish = values => {
    console.log('Success:', values);
    saveChange(selectedProduct.id, values);
    setIsProductModalOpen(false);
    };
    const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    };

    return (
        <Modal
        title="Prodcut Detail"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isProductModalOpen}
        onOk={handleProductOk}
        onCancel={handleProductCancel}
        footer={null}
        >
            <Button danger size="small">Delete Product</Button>
            <p><strong>Name:</strong> {selectedProduct?.name}</p>
            <p><strong>Type:</strong> {selectedProduct?.type}</p>
            <p><strong>Size:</strong> {selectedProduct?.size}</p>
            <p><strong>Material:</strong> {selectedProduct?.material}</p>
            <p><strong>Quantity:</strong> {selectedProduct?.inventoryStatus}</p>
        <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Product Name" name="Name" required="true" rules={[{ required: true, message: 'Please enter product name' }]}>
          <Input type="text" placeholder="Enter New Product Name" />
        </Form.Item>

          <Flex horizontal="true" gap="large"> 
              <Form.Item label="Type" name="TypeId" required="true" rules={[{ required: true, message: 'Please select product type.' }]}>
              <Select
                  placeholder="Select New Product Type"
                  style={{ flex : 1 }}
                  options={[
                      { value: 1, label: 'Erlenmeyer Flask' },
                      { value: 2, label: 'Dewar Flask' },
                      { value: 3, label: 'Beaker' },
                      { value: 4, label: 'Vial'},
                  ]}
              />
        </Form.Item>
              <Form.Item label="Size" name="SizeId" required="true" rules={[{ required: true, message: 'Please select product size.' }]}>
              <Select
                  placeholder="Select New Product Size"
                  style={{ flex : 1 }}
                  options={[
                      { value: 1, label: '1 mL' },
                      { value: 2, label: '10 mL' },
                      { value: 3, label: '50 mL' },
                      { value: 4, label: '250 mL'},
                      { value: 5, label: '500 mL'},
                      { value: 6, label: '1 L'},
                  ]}
              />
        </Form.Item>
          </Flex>
          <Form.Item label="Material" name="MaterialId" required="true" rules={[{ required: true, message: 'Please select product material.' }]}>
              <Select
                  placeholder="Select New Product Material"
                  options={[
                      { value: 1, label: 'Glass' },
                      { value: 2, label: 'Plastic' },
                  ]}
              />
        </Form.Item>          
        <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Save Change
        </Button>
      </Form.Item>
      </Form> 
        </Modal>
    )
}


export default ProductDetailModal;