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
    <Flex
      vertical
    >
     <Flex 
      vertical = {false}
      align='center'
      justify='flex-start'
      gap="small"
      style={{width: '100%', flexWrap: 'wrap'}}
      >
        <Form
        onFinish={onFinish}
        nFinishFailed={onFinishFailed}
        >
            <Form.Item
            name="filterBy"
            >
            <Select
            onSelect={()=>setIsFilterSelect(true)}
            placeholder="Select Filter"
            style={{ width: 120 }}
            options={[
              { value: 'type', label: 'Product Type' },
              { value: 'size', label: 'Product Size' },
              { value: 'material', label: 'Product Material' },
            ]}
            />
            </Form.Item>

            <Form.Item label={null}>
            <Button htmlType="submit">Apply filter</Button>
            </Form.Item>

            {isFilterSelected ? <FilterByType/> : ""}
        </Form>
     </Flex>
       
    
    </Flex>

    

        </>)
}


export default FilterBy;