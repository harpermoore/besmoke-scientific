import { Select, Radio, Flex, Button, Form } from 'antd'
import { useState } from 'react'


// Could be refactored in backend --> dynamic type options
const typeOptions = [
  {
    label: "Erlenmeyer Flask",
    value: 1,
  }, 
  {
    label: "Dewar Flask", 
    value: 2
  }, 
  {
    label: "Beaker",
    value: 3, 
  },
  {
    label: "Vial", 
    value: 4
  }
]

const FilterByType = () => {
  return(
    <Form.Item
    name="typeId"
     rules={[{ required: true, message: 'Please select a product type.'}]}
    >
    <Radio.Group
    options={typeOptions}
  />
  </Form.Item>
  )
}


const FilterBy = ({fetchOperations}) => {
  const [isFilterSelected ,setIsFilterSelect] = useState(false)


      // When form submitted
    const onFinish = async (values) => {
        try {
            console.log('Success:', values);
            fetchOperations(values.typeId);
        } catch (error) {
            console.error('Change failed:', error);
        }
    };

     const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    };

    return (<>
    
        <Form
        onFinish={onFinish}
        nFinishFailed={onFinishFailed}
        >
        <Flex
        gap="small"
        >
        <Form.Item
        name="filterBy"
        >
          <Select
            allowClear
            onSelect={()=>setIsFilterSelect(true)}
            placeholder="Select Filter"
            style={{ width: 180 }}
            options={[
              { value: 'type', label: 'Product Type' },
              // disabled size and material for now.
              { value: 'size', label: 'Product Size', disabled: true },
              { value: 'material', label: 'Product Material', disabled: true },
          ]}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button htmlType="submit">Apply filter</Button>
        </Form.Item>
        </Flex> 

        {isFilterSelected ? <FilterByType/> : ""}
        
        
        </Form>
  

        </>)
}


export default FilterBy;