import { Button, Form, Input, Select, Flex, Modal } from 'antd';
import  useSubmitAddProduct from '../hooks/useSubmitAddProduct';




const NewProductModal = ({isAddModalOpen, setIsAddModalOpen, onSuccess}) => {
    const [form] = Form.useForm();
    const {submit} = useSubmitAddProduct();
   
    const handleAddCancel = () => {
        setIsAddModalOpen(false);
    };


    // When form submitted
    const onFinish = async (values) => {
        try {
            console.log('Success:', values);
            await submit(values);
            setIsAddModalOpen(false);
            onSuccess(); 
        } catch (error) {
            console.error('Submit failed:', error);
        }
    };


    const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    };
    
    return (
    <Modal
        title="Add New Product"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isAddModalOpen}
        onCancel={handleAddCancel}
        style={{height : 'auto'}}
        footer={null}
      >
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Product Name" name="Name" required="true" rules={[{ required: true, message: 'Please enter product name' }]}>
          <Input type="text" placeholder="Enter Product Name" />
        </Form.Item>

          <Flex horizontal="true" gap="large"> 
              <Form.Item label="Type" name="TypeId" required="true" rules={[{ required: true, message: 'Please select product type.' }]}>
              <Select
                  defaultValue="Select Product Type"
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
                  defaultValue="Select Product Size"
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
                  defaultValue="Select Product Type"
                  options={[
                      { value: 1, label: 'Glass' },
                      { value: 2, label: 'Plastic' },
                  ]}
              />
        </Form.Item>          
        <Form.Item label="Inventory Quantity" name="Quantity" required="true" rules={[{ required: true, message: 'Please enter inventory quantity.' }]}>
              <Input type="number" placeholder="Enter current inventory quantity" />
        </Form.Item>          

      
      <Flex justify='flex-end' align='center' gap="small">
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
        <Button onClick={()=>{handleAddCancel()}}>
          Cancel
        </Button>      
      </Flex>           
     

      </Form>
    </Modal>
  )
}

export default NewProductModal;