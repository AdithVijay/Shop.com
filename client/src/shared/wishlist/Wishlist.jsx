import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const wishlistItems = [
  {
    id: 1,
    name: "Sequined thong body",
    price: "Rs.2,299.00",
    newArrival: true,
    color: "Black",
    image: "https://res.cloudinary.com/dxmoiixw3/image/upload/v1729266344/vhusqafix4hbasxzub14.jpg",
    available: false
  },
  {
    id: 2,
    name: "Regular Fit Zip-top jumper",
    price: "Rs.2,999.00",
    newArrival: true,
    color: "Navy blue",
    image: "https://res.cloudinary.com/dxmoiixw3/image/upload/v1729266344/vhusqafix4hbasxzub14.jpg",
    available: false
  },
  {
    id: 3,
    name: "Regular Fit Wool-blend jumper",
    price: "Rs.2,999.00",
    newArrival: true,
    color: "Light brown marl",
    image: "https://res.cloudinary.com/dxmoiixw3/image/upload/v1729266344/vhusqafix4hbasxzub14.jpg",
    available: false
  },
  {
    id: 4,
    name: "Regular Fit Zip-top jumper",
    price: "Rs.2,999.00",
    newArrival: true,
    color: "White",
    image: "https://res.cloudinary.com/dxmoiixw3/image/upload/v1729266344/vhusqafix4hbasxzub14.jpg",
    available: false
  },
]

export default function Wishlist() {



  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold mb-4">Favourites</h1>
      <p className="text-gray-600 mb-8">{wishlistItems.length} Items</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-2">
        {wishlistItems.map((item) => (
          <div key={item.id} className="flex flex-col transform transition-transform duration-200 hover:scale-105">
            <div className="relative aspect-[3/4] mb-4">
              <img
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-md font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.price}</p>
            <p className="text-sm text-gray-500 mb-2">
              {item.newArrival && "New Arrival"}
            </p>
            <p className="text-sm text-gray-500 mb-4">Colour: {item.color}</p>
            {!item.available && (
              <p className="text-sm text-gray-500 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
                Not available in stores
              </p>
            )}
            <div className="relative w-full mb-4">
              <select className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value="">Select Size</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.25 7.25l4.5 4.5 4.5-4.5" />
                </svg>
              </div>
            </div>
            <Button className="w-full">Add</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
