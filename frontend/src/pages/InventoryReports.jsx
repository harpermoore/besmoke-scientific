import {Table, Flex, Button, Typography,Tabs } from 'antd';
import { useState, useEffect } from 'react';
import { getAllOperations } from "../api/InventoryOperationApi"
import FilterBy from "../components/FilterBy"
import { IoCaretUp, IoCaretDownOutline } from "react-icons/io5";
import {getAllProducts} from "../api/ProductApi"
import Banner from '../components/Banner';
import StockBarChart from '../components/StockBarChart';
const { Title } = Typography;



const InventoryReports = () =>  { 
    const [operations, setOperations] = useState([]);
    const [products, setProducts] = useState([]);
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

    const fetchProducts = async () => {
        try {
          const response = await getAllProducts();
          setProducts(response.data);
        } catch (err) {
          console.error("loading failed", err.message);
          setError(err.message);
        }
      };  


    useEffect(() => {
        fetchOperations();
        fetchProducts();
        ;
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

    let data = []; 

    // Product data to Bar chart data
    if (products != null){ 
      products.map((product)=> { 
        let item = { 
          name: product.name,
          value: product.inventoryStatus, 
        }; 
        data.push(item)
      })
    }
    
    const tabs = [
      {name: "Current Stock", 
        key: 1, 
        content: <StockBarChart data={data}/>
      }, 
      {
        name: "Total Sale", 
        key: 2, 
        content: <StockBarChart data={data}/>
      }
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
            

            <Tabs
             style={{width: "100%"}}
             type="card"
              items={tabs.map((i) => {
                return {
                  label: i.name,
                  key: i.key,
                  children: i.content,
                };
              })}
            />
          
          </Flex> 
    

    <Flex justify='flex-end'>
    <FilterBy fetchOperations={fetchOperations} />
    </Flex>
    <Table columns={columns} dataSource={operations} />
    </>)
}

export default InventoryReports;