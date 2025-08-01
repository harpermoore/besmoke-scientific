import { Button, Form, InputNumber, Select, Flex, Modal, Divider, DatePicker, message } from 'antd';
import { SlEarphones } from 'react-icons/sl';
import useSubmitNewOperation from "../hooks/useSubmitNewOperation"

const ACTION_TYPES = {
  STOCK_IN: 1,
  STOCK_OUT: -1
};

const CreateOperationModal = ({isOperationModalOpen, setIsOperationModalOpen, selectedProduct, onSuccess}) => {
    const { create } = useSubmitNewOperation();
    const [messageApi, contextHolder] = message.useMessage();


    const handleOperationCancel = () => {
    setIsOperationModalOpen(false);
    };


    // When form submitted
    const onFinish = async (values) => {
    const result = await create(values, selectedProduct, messageApi);
    if (result?.success) {
    setIsOperationModalOpen(false)
    setIsOperationModalOpen(false);
    onSuccess();
    }
  };



    const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    };


    return (
        <Modal
        title="New Inventory Operation"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOperationModalOpen}
        onCancel={handleOperationCancel}
        style={{height : 'auto'}}
        footer={null}
        >
            {/* Error message / Success message */}
            {contextHolder}

            <Divider/>

            <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            
            <div>
            <strong>Product Name</strong>
            <p style={{marginTop: 0}}>{selectedProduct?.name}</p>
            </div>
            <div>
            <strong>Product Id</strong>
            <p style={{marginTop: 0}}>{selectedProduct?.id}</p>
            </div>
           
            <div>
            <strong>Current Inventory</strong>
            <p style={{marginTop: 0}}>{selectedProduct?.inventoryStatus}</p>
            </div>

           <Form.Item label="Select Action Type" name="actionType" rules={[{ required: true, message: 'Please select action type.' }]}>
            <Select
            style={{ width: 120 }}
            options={[
            { value: ACTION_TYPES.STOCK_IN, label: 'Stock In' },
            { value: ACTION_TYPES.STOCK_OUT, label: 'Stock Out' },
             ]}
            />
           </Form.Item>
           
           
           
            <Form.Item name="quantity" label="Quantity Change" rules={[{ required: true, message: 'Please enter quantity change.' }]}>
              <InputNumber min={1} max={1000} style={{ width: 100 }} />
            </Form.Item>
    

                
                <Form.Item name="date" label="Created Date" rules={[{ required: true, message: 'Please Enter operation created date.' }]}>
                    <DatePicker/>
                </Form.Item>

                <Flex gap="small" justify='flex-end'>
                    <Button type='primary' htmlType="submit">Create Operation</Button>
                    <Button onClick={()=>handleOperationCancel()}>Cancel</Button>
                </Flex>
            </Form>
        
        

        </Modal>
    )
}

export default CreateOperationModal