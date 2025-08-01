import { Button, Form, Input, Select, Flex, Modal, Divider, DatePicker } from 'antd';


const CreateOperationModal = ({isOperationModalOpen, setIsOperationModalOpen, selectedProduct, onSuccess}) => {

    const handleOperationCancel = () => {
    setIsOperationModalOpen(false);
    };

    const onChange = (date, dateString) => {
    console.log(date, dateString);
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
            <Divider/>
            <Flex vertical style={{marginTop: -16}}>
            <strong>Product Name</strong>
            <p style={{marginTop: 0}}>{selectedProduct?.name}</p>
            </Flex>

            <strong>Product Id</strong>
            <p style={{marginTop: 0}}>{selectedProduct?.id}</p>

            <Form>
                <Form.Item name="quantityChange" label="Quantity Change" rules={[{ required: true, message: 'Please enter quantity change.' }]}>
                    <Input type="number" style={{width: 64}}/>
                </Form.Item>

                
                <Form.Item name="date" label="Created Date" rules={[{ required: true, message: 'Please Enter operation created date.' }]}>
                    <DatePicker onChange={onChange} />
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