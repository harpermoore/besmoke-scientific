
import axios from 'axios';

axios.get('https://localhost:7025/api/Products')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('API Error:', error);
  });
  


const ProductList = () =>  { 
    return(  
    <h1>this is product list</h1>
)  
}


export default ProductList;