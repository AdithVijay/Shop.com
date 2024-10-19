import React, { useEffect, useState } from 'react'
import { Star, ChevronDown, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import Header from '@/Majorcomponents/bars/Header'
import Card3 from '@/Majorcomponents/cards/Card3'
import axiosInstance from '@/config/axiosInstance'

const products = [
  {
    id: 1,
    name: 'Classic T-Shirt',
    category: 'Tops',
    price: 29.99,
    image: 'https://res.cloudinary.com/dupo7yv88/image/upload/v1729091942/ya9agzofv8tchupo7riy.jpg',
    stock: 3,
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    category: 'Bottoms',
    price: 59.99,
    image: 'https://res.cloudinary.com/dupo7yv88/image/upload/v1729091942/ya9agzofv8tchupo7riy.jpg',
    stock: 10,
  },
  {
    id: 3,
    name: 'Hooded Sweatshirt',
    category: 'Outerwear',
    price: 49.99,
    image: 'https://res.cloudinary.com/dupo7yv88/image/upload/v1729091942/ya9agzofv8tchupo7riy.jpg',
    stock: 7,
  },

]

const FilterSidebar = ({ className }) => (
  
  <div className={className}>
    <h2 className="text-xl font-semibold mb-4">Filters</h2>
    <Accordion type="single" collapsible className="w-full">
      {['Category', 'Fit', 'Sleeve', 'Size'].map((filter) => (
        <AccordionItem key={filter} value={filter.toLowerCase()}>
          <AccordionTrigger className="text-sm font-medium">{filter}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {['Option 1', 'Option 2', 'Option 3'].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={`${filter}-${option}`} />
                  <label
                    htmlFor={`${filter}-${option}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
)

// ==========================================================================================================================
                                                // SHOPPING PAGE
// ==========================================================================================================================
const ShoppingPage = () => {

  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const [productData, setproductData] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const response = await axiosInstance.get("admin/getproducts")
      console.log("card3", response)
      var productData = response.data.data
      setproductData(productData)
      console.log(productData);
    }
    fetchData()
  }, []);

  


  
  return (
    <div>
    <Header></Header>
    <div className="container mx-auto px-4 py-8">
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Responsive Sidebar */}
        <Sheet >
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden mb-4">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <FilterSidebar className="mt-4" />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <FilterSidebar className="hidden lg:block w-64 flex-shrink-0" />

        {/* Main Content */}
        <div className="flex-grow pl-8 pr-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">Products</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort by: {sortBy} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('featured')}>Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-low-to-high')}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-high-to-low')}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('newest')}>Newest</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productData.map((product) => {
               if(product.isListed){
            
                
              return  <Card key={product._id} className="overflow-hidden flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="relative pt-[100%]">
                    <img
                    src={product.images[0]}
                    // alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                    />
                </div>
                <CardContent className="p-2 flex-grow">
                    <h3 className="text-md mb-1   text-gray-800">{product.productName }</h3>
                    <p className="text-sm text-gray-500">{product.category.category}</p>
                    <p className="text-md   text-gray-700">${product.regularPrice}</p>
                    <div className="flex items-center ">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">4.5 (24 reviews)</span>
                    </div>
                </CardContent>
                <CardFooter className=" flex justify-between items-center">
                    <Button 
                        className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                        >
                        Add to Cart
                        </Button>
                    {product.stock <= 5 && (
                    <Badge variant="destructive" className="ml-2 bg-red-100 text-red-700 border-red-200">
                        {product.totalStock === 0 ? "Out of Stock" : `Only ${product.totalStock} left!`}
                    </Badge>
                    )}
                </CardFooter>
                </Card>
                  }})}
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ShoppingPage