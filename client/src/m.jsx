function addCategoryOffer({ offerData, targetId }) {
    return axiosInstance.post("/admin/create-category-offer", {
      offerData,
      categoryId: targetId
    });
  }
  
  <OfferModal 
    targetId={categoryId} 
    handleReloadChangeForOffer={handleReloadChangeForOffer}
    submitOffer={addCategoryOffer}
  />