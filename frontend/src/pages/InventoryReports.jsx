import {Table, Flex, Button, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { getAllOperations } from "../api/InventoryOperationApi"
import FilterBy from "../components/FilterBy"
const { Title } = Typography;



const InventoryReports = () =>  { 
    const [operations, setOperations] = useState([]);
    const [error, setError] = useState(null);

     const fetchOperations = async (typeId) => {
        try {
          const response = await getAllOperations(typeId);
          setOperations(response.data);
          console.log(response.data);
        } catch (err) {
          console.error("loading failed", err.message);
          setError(err.message);
        }
      };

    useEffect(() => {
        fetchOperations();
      }, []);  

    const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Product ID',
    dataIndex: 'productId',
    key: 'productId',
  },
  {
    title: 'Quantity Change',
    dataIndex: 'quantityChange',
    key: 'quantityChange',
  },
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
//   {
//     title: 'Inventory Status',
//     dataIndex: 'inventoryStatus',
//     key: 'inventoryStatus',
//     render : (_, record) => (
//         record.isStockLow ? <div style={{display: 'flex', flexDirection:'row', justifyContent: 'start', alignItems: 'center', gap: '1rem' 
//         }}><FaCircle color="red" size={12}/><p>{record.inventoryStatus}</p></div>: 
//         <div style={{display: 'flex', flexDirection:'row', justifyContent: 'start', alignItems: 'center', gap: '1rem' }}><FaCircle color="green" size={12} /><p>{record.inventoryStatus}</p></div>
//     )
//   },
];

    return(<>
    <Flex
            vertical="true"   
            justify="center"
            align="flex-start"
            style={{ padding: '16px', width: '100%', flexWrap: 'wrap', gap: '0.1rem'}}
        >
            <Title>Inventory Reports</Title>

            <FilterBy fetchOperations={fetchOperations} />
          
        </Flex>
    <Table columns={columns} dataSource={operations} />
    </>)
}

export default InventoryReports;