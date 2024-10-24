"use client"

import React, { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useParams } from "react-router-dom"
import axiosInstance from "@/config/axiosInstance"

const reviews = [
  { id: 1, author: "Samantha D.", rating: 5, content: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to look!", date: "August 14, 2023" },
  { id: 2, author: "Alex M.", rating: 4, content: "This t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this shirt definitely gets a thumbs up from me.", date: "August 13, 2023" },
  { id: 3, author: "Ethan R.", rating: 4, content: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.", date: "August 16, 2023" },
]

export default function ProductReview() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("reviews")
  const [userRating, setUserRating] = useState(0)
  const [reviewContent, setReviewContent] = useState("")
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    async function fetchProduct(){
      try {
        const response = await axiosInstance.get(`/user/getproduct/${id}`)
        const SingleproductData = response.data.data
        setproductData(SingleproductData)

      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct()
  }, [id]);
  

  const handleSubmitReview = (e) => {
    e.preventDefault()
    console.log("Submitted review:", { rating: userRating, content: reviewContent })
    setUserRating(0)
    setReviewContent("")
  }

  return (
    <div className="  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="reviews">Rating & Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <h3 className="text-2xl font-semibold mb-4">Product Details</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium">Description</h4>
              <p className="text-muted-foreground">
                {productData.description}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium">Category</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>{productData?.category?.category}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium">Sleeve type</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>{productData.sleeveType}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium">Size & Fit</h4>
              <ul className="list-disc list-inside text-muted-foreground">
              <li>Available Sizes: {productData.sizes ? Object.keys(productData.sizes).join(", ") : "N/A"}</li>
              {productData.sizes ? (
                   Object.entries(productData.sizes).map(([size, count]) => (
                    <li key={size}>
                      {size}:{" "}
                      <span style={{ color: count === 0 ? "gray" : count < 5 ? "red" : "inherit" }}>
                        {count === 0 ? "Out of Stock" : count < 5 ? `Only ${count} more left` : count}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>Loading sizes...</li>
                )}
                <li>Model is 6'1" and wearing a size M</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium">Wash Care</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Machine wash cold, inside out</li>
                <li>Tumble dry low</li>
                <li>Do not bleach</li>
                <li>Iron on low heat, avoiding the print</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium">Adiitional Info</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>{productData.additionalInfo}</li>
              </ul>
            </div>
          </div>
          
        </TabsContent>
        <TabsContent value="reviews">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{review.author}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="outline"
                        size="sm"
                        className={`p-1 ${
                          userRating >= star ? "text-yellow-400" : "text-muted-foreground"
                        }`}
                        onClick={() => setUserRating(star)}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="review" className="block text-sm font-medium mb-1">
                    Your Review
                  </label>
                  <Textarea
                    id="review"
                    placeholder="Write your review here..."
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button type="submit" disabled={userRating === 0 || reviewContent.trim() === ""}>
                  Submit Review
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
