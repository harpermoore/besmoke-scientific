import { BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Bar, ResponsiveContainer, Legend } from 'recharts';


const StockBarChart = ({data}) => {

    return(
     <ResponsiveContainer width="100%" height={250}>
     <BarChart  height={250} data={data}>
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="name" />
     <YAxis dateKey="value"/>
    <Tooltip />
    <Bar dataKey="value" fill="#7CCED9" />
    </BarChart> 
      </ResponsiveContainer>
    )

}

   

export default StockBarChart