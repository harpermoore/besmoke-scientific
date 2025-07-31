import { getAllProducts } from "../api/ProductApi";
import { useEffect, useState } from "react";
import { Space, Table, Modal, Tag, Button } from 'antd';
import { EditFilled } from '@ant-design/icons'
import ProductForm from "../components/NewProductModal";
import NewProductModal from "../components/NewProductModal";


const ProductList = () =>  { 
    const [products, setProducts] = useState([]);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
    title: 'Quantity',
    dataIndex: 'inventoryStatus',
    key: 'inventoryStatus',
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
     <div>
      <h1>Products</h1>

      <Button type="primary" onClick={()=>showAddModal()}>Add New Product</Button>

      <NewProductModal 
      isAddModalOpen={isAddModalOpen} 
      setIsAddModalOpen={setIsAddModalOpen}
      handleAddOk={handleAddOk}
      handleAddCancel={handleAddCancel}  
      />  

      <Table columns={columns} dataSource={products} />
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
    </div>
)  
}


export default ProductList;