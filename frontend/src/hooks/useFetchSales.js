import {getAllSale} from "../api/InventoryOperationApi"
import {useState} from 'react'



export default function useFetchSales()  {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sales, setSales] = useState([])
        

    
    const getSale = async(timeOption) => {
        let timeFrame = null

        if (timeOption == "This Month") {
            timeFrame = "month"
        } else if (timeOption == "This Year")
        {
            timeFrame = "year"
        }
    
        try {
          const response = await getAllSale(timeFrame);
          setSales(response.data);
        } catch (err) {
          console.error("loading failed", err.message);
          setError(err.message);
        }        
      };    

      
    return { getSale, sales, isLoading, error };

    }

