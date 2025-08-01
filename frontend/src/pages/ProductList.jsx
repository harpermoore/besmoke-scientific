import { getAllProducts } from "../api/ProductApi";
import { useEffect, useState } from "react";
import { Space, Table, Modal, Tag, Button, Flex, Typography } from 'antd';
import { EditFilled, PlusCircleFilled } from '@ant-design/icons'
import NewProductModal from "../components/NewProductModal";
import ProductDetailModal from "../components/ProductDetailModal";
import CreateOperationModal from "../components/CreateOperationModal"
import { FaCircle } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
const { Title } = Typography;


const ProductList = () =>  { 
    const [products, setProducts] = useState([]);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isOperationModalOpen, setIsOperationModalOpen] = useState(false)
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);



    // Product details modal functions
    const showProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

    // Add new product modal functions
    const showAddModal = () => {
        setIsAddModalOpen(true);
    }

    const showOperationModal = (product) => {
      setSelectedProduct(product);
      setIsOperationModalOpen(true)
    }
    
    // Table column: edit, create new operation
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
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
         <Button type="primary" onClick={()=>showProductModal(record)}>
        Edit<EditFilled />
      </Button>
      <Button color="cyan" variant="solid" onClick={()=>showOperationModal(record)}> 
        <BsFillBoxSeamFill />
      </Button>
      </Space>
    ),
  },
];



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
    fetchProducts();
  }, []);


    return(  
    
    <>
        <Flex  
            justify="space-between"
            align="center"
            gap="large"
            style={{ padding: '16px', width: '100%', gap: '0.1rem'}}
        >
            <Title>Products</Title>
           
            <Button type="primary" size="large" onClick={()=>showAddModal()}><PlusCircleFilled />Add New Product</Button>

        </Flex>
        
        <Table columns={columns} dataSource={products} />    


        <NewProductModal 
        isAddModalOpen={isAddModalOpen} 
        setIsAddModalOpen={setIsAddModalOpen}
        onSuccess={fetchProducts}
        />  

        <ProductDetailModal
        isProductModalOpen={isProductModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        selectedProduct={selectedProduct}
        onSuccess={fetchProducts}
        />

        <CreateOperationModal
        isOperationModalOpen={isOperationModalOpen}
        setIsOperationModalOpen={setIsOperationModalOpen}
        onSuccess={fetchProducts}
        selectedProduct={selectedProduct}
        />
    </>
)  
}


export default ProductList;