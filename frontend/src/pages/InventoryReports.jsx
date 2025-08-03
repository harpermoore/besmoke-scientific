import {Table, Flex, Button, Typography, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { getAllOperations } from "../api/InventoryOperationApi"
import FilterBy from "../components/FilterBy"
import { IoCaretUp, IoCaretDownOutline } from "react-icons/io5";
import {getAllProducts} from "../api/ProductApi"
import Banner from '../components/Banner';
import { BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Bar, ResponsiveContainer, Legend } from 'recharts';
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

    if (products != null){ 
      products.map((product)=> { 
        let item = { 
          name: product.name,
          value: product.inventoryStatus, 
        }; 
        data.push(item)
      })
    }

    console.log(data);
    


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
    
    {/* Bar Chart for current inventory by product */}
     <ResponsiveContainer width="100%" height={250}>
     <BarChart  height={250} data={data}>
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="name" />
     <YAxis dateKey="value"/>
    <Tooltip />
    <Bar dataKey="value" fill="#7CCED9" />
    </BarChart> 
      </ResponsiveContainer>

    <Table columns={columns} dataSource={operations} />
    </>)
}

export default InventoryReports;