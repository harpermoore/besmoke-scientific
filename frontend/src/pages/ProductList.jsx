import { getAllProducts } from "../api/ProductApi";
import { useEffect, useState } from "react";
import { Space, Table, Modal, Tag, Button, Flex, Typography } from 'antd';
import { EditFilled, PlusCircleFilled } from '@ant-design/icons'
import NewProductModal from "../components/NewProductModal";
import { FaCircle } from "react-icons/fa";
const { Title } = Typography;


const ProductList = () =>  { 
    const [products, setProducts] = useState([]);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    
    console.log(products)
    // Product Modal functions
    const showProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
    const handleProductOk = () => {
    setIsProductModalOpen(false);
  };
    const handleProductCancel = () => {
    setIsProductModalOpen(false);
    };


    const showAddModal = () => {
        setIsAddModalOpen(true);
    }

    const handleAddOk = () => {
        setIsAddModalOpen(false);
    };

    const handleAddCancel = () => {
        setIsAddModalOpen(false);
    };


    const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'Material',
    dataIndex: 'material',
    key: 'material',
  },
  {
    title: 'Inventory Status',
    dataIndex: 'inventoryStatus',
    key: 'inventoryStatus',
    render : (_, record) => (
        record.isStockLow ? <div style={{display: 'flex', flexDirection:'row', justifyContent: 'start', alignItems: 'center', gap: '1rem' 
        }}><FaCircle color="red" size={12}/><p>{record.inventoryStatus}</p></div>: 
        <div style={{display: 'flex', flexDirection:'row', justifyContent: 'start', alignItems: 'center', gap: '1rem' }}><FaCircle color="green" size={12} /><p>{record.inventoryStatus}</p></div>
    )
  },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (_, { tags }) => (
//       <>
//         {tags.map(tag => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
         <Button type="primary" onClick={()=>showProductModal(record)}>
        Edit<EditFilled />
      </Button>
      </Space>
    ),
  },
];



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (err) {
        console.error("loading failed", err.message);
        setError(err.message);
      }
    };

    fetchProducts(); 
  }, []);


    return(  
    
    <>
        <Flex
            vertical="true"   
            justify="center"
            align="flex-start"
            style={{ padding: '16px', width: '100%', flexWrap: 'wrap', gap: '0.1rem'}}
        >
            <Title>Products</Title>
            <Flex 
            horizontal="true"
            style={{width: '100%', flexWrap: 'wrap', gap: '0.5rem'}}
            >
            <Button type="primary" onClick={()=>showAddModal()}><PlusCircleFilled />Add New Product</Button>
            <Button type="primary" ><PlusCircleFilled />Add Inventory Operation</Button>
            </Flex>
        </Flex>
        
        <Table columns={columns} dataSource={products} />    


        <NewProductModal 
        isAddModalOpen={isAddModalOpen} 
        setIsAddModalOpen={setIsAddModalOpen}
        handleAddOk={handleAddOk}
        handleAddCancel={handleAddCancel}  
        />  

     
        <Modal
        title="Prodcut Detail"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isProductModalOpen}
        onOk={handleProductOk}
        onCancel={handleProductCancel}
        >
            <p><strong>Name:</strong> {selectedProduct?.name}</p>
            <p><strong>Type:</strong> {selectedProduct?.type}</p>
            <p><strong>Quantity:</strong> {selectedProduct?.inventoryStatus}</p>
        </Modal>
    </>
)  
}


export default ProductList;