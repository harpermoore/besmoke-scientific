import { BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Bar, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';





const InventoryBarChart = ({data, barColor, isLowStockLine}) => {

    return(
     <ResponsiveContainer width="100%" height={250} style={{marginLeft: -30}}>
     <BarChart  height={250} data={data}>
    
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="name" />
     <YAxis dateKey="value"/>
    <Tooltip />
    <Bar dataKey="value" fill={barColor} />  { isLowStockLine ? 
        <ReferenceLine y={50} label="Low Stock" stroke="red"  isFront={true} strokeWidth={0.5}/> 
        : ""  
      }
    </BarChart> 
      </ResponsiveContainer>
    )

}

   

export default InventoryBarChart;