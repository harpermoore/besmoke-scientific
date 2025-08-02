import {Table, Flex, Button, Typography, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { getAllOperations } from "../api/InventoryOperationApi"
import FilterBy from "../components/FilterBy"
import { IoCaretUp, IoCaretDownOutline } from "react-icons/io5";
import Banner from '../components/Banner';
const { Title } = Typography;


const InventoryReports = () =>  { 
    const [operations, setOperations] = useState([]);
    const [error, setError] = useState(null);

     const fetchOperations = async (typeId) => {
        try {
          const response = await getAllOperations(typeId);
          setOperations(response.data);
        //   console.log(response.data);
        } catch (err) {
        //   console.error("loading failed", err.message);
          setError(err.message);
        }
      };

    useEffect(() => {
        fetchOperations();
      }, []);  

    // Table column   
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
          render: (_, record) => 
              (record.quantityChange > 0 ? 
              <Flex  align='center' justify='flex-start' gap="small"><IoCaretUp size={24} color='green'/><p>{record.quantityChange}</p></Flex> : 
              <Flex align='center' justify='flex-start' gap="small"><IoCaretDownOutline size={24} color='red'/><p>{record.quantityChange}</p></Flex>)
        },
        {
          title: 'Date',
          dataIndex: 'timestamp',
          key: 'timestamp',
        },
    ];

    return(<>
          <Flex
            vertical
            justify="flex-start"
            align="flex-start"
            style={{width: '100%'}}
            >

            <Banner/>
            <Title style={{marginTop: 10}}>Inventory Reports</Title>
            
            <FilterBy fetchOperations={fetchOperations} />
          
          </Flex> 
    
    
    <Table columns={columns} dataSource={operations} />
    </>)
}

export default InventoryReports;