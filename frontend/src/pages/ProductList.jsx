import { getAllProducts } from "../api/ProductApi";
import { useEffect, useState } from "react";
import { Space, Table, Modal, Tag, Button } from 'antd';
import { EditFilled } from '@ant-design/icons'


const ProductList = () =>  { 
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Modal functions
    const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
    const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
         <Button type="primary" onClick={()=>showModal(record)}>
        Edit<EditFilled />
      </Button>
      </Space>
    ),
  },
];

//     const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

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
      <Table columns={columns} dataSource={products} />
         <Modal
        title="Prodcut Detail"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p><strong>Name:</strong> {selectedProduct?.name}</p>
      <p><strong>Type:</strong> {selectedProduct?.type}</p>
      <p><strong>Quantity:</strong> {selectedProduct?.inventoryStatus}</p>
      </Modal>
    </div>
)  
}


export default ProductList;