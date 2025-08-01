import { Select, Radio, Flex, Button } from 'antd'
import { useState } from 'react'

const typeOptions = [
  {
    name: "Erlenmeyer Flask",
    typeId: 1,
  }, 
  {
    name: "Dewar Flask", 
    typeId: 2
  }, 
  {
    name: "Beaker",
    typeId: 3, 
  },
  {
    name: "Vial", 
    typeId: 4
  }
]

const FilterByType = () => {
  return(
    <Flex
    vertical={false}
    >
    <Radio.Group>
      {typeOptions.map((type)=>{ 
        return<Radio value={type.typeId}>{type.name}</Radio>
      })}
    </Radio.Group>
    </Flex>
  )
}


const FilterBy = () => {
  const [isFilterSelected ,setIsFilterSelect] = useState(false)

    return (<>
     <Flex 
            vertical = {false}
            align='center'
            gap="small"
            style={{width: '100%', flexWrap: 'wrap'}}
            >
        
        <p>Filter</p> 
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
        <Button>Apply filter</Button>
     </Flex>

    {isFilterSelected ? <FilterByType/> : ""}

        </>)
}


export default FilterBy;