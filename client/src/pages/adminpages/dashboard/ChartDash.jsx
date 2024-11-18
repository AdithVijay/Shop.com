import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data
const data = [
  { month: "Jan", metric1: 4000, metric2: 2400 },
  { month: "Feb", metric1: 3000, metric2: 1398 },
  { month: "Mar", metric1: 2000, metric2: 9800 },
  { month: "Apr", metric1: 2780, metric2: 3908 },
  { month: "May", metric1: 1890, metric2: 4800 },
  { month: "Jun", metric1: 2390, metric2: 3800 },
  { month: "Jul", metric1: 3490, metric2: 4300 },
];

const [orderDatas, setOrderData] = useState([]);

  //=====================FETCHING ORDER DATA================
  async function fetchOrderData() {
    try {
      const response = await axiosInstance.get(`admin/retrieveorder?page=${page}&limit=6`);
      setOrderData(response.data.order);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }
  }

export default function ChartDash() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Sample Line Chart</CardTitle>
        <CardDescription>Displaying two metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="metric1"
              stroke="hsl(200, 70%, 50%)"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="metric2"
              stroke="hsl(100, 70%, 50%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
