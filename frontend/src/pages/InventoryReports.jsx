import {Table, Flex, Button, Typography,Tabs, Segmented } from 'antd';
import { useState, useEffect} from 'react';
import { getAllOperations } from "../api/InventoryOperationApi"
import FilterBy from "../components/FilterBy"
import { IoCaretUp, IoCaretDownOutline } from "react-icons/io5";
import {getAllProducts} from "../api/ProductApi"
import { getAllSale } from '../api/InventoryOperationApi';
import Banner from '../components/Banner';
import InventoryBarChart from '../components/InventoryBarChart';

const { Title } = Typography;



const InventoryReports = () =>  { 
    const [operations, setOperations] = useState([]);
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
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

    const fetchAllSale = async () => {
        try {
          const response = await getAllSale();
          setSales(response.data);
        } catch (err) {
          console.error("loading failed", err.message);
          setError(err.message);
        }
      };    

    useEffect(() => {
        fetchOperations();
        fetchAllSale();
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

    let stockData=[];
    let salesData=[];


    // Product data to Bar chart data
    if (products != null){ 
      products.map((product)=> { 
        let item = { 
          name: product.name,
          value: product.inventoryStatus, 
        }; 
        stockData.push(item)
      })
    }

    // Sale data to Bar Chart data
    if (sales != null){ 
      sales.map((product)=> { 
        let item = { 
          name: product.productName,
          value: product.totalSold, 
        }; 
        salesData.push(item)
      })
    }

    // tab options
    const tabs = [
      {name: "Current Stock", 
        key: 1, 
        content: <InventoryBarChart data={stockData} barColor={"#7CCED9"}  />
      }, 
      {
        name: "Total Sales", 
        key: 2, 
        content: <><Segmented options={['All Time','This Month', 'This Year']} onChange={value => {
      console.log(value); // string
    }}/><InventoryBarChart data={salesData} barColor={"#85D276"}  /></>
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
             style={{width: "100%", marginTop: 24}}
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
    

    <Flex justify='flex-end' style={{marginTop: 32}}>
    <FilterBy fetchOperations={fetchOperations} />

    </Flex>
    <Table columns={columns} dataSource={operations} />
    </>)
}

export default InventoryReports;