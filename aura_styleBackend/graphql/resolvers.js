const Product = require('../models/productModel');

const resolvers = {
  Query: {
    
    productsByCategory: async (_, { category }) => {
      try {
        const products = await Product.find({ category });
        return products;
      } catch (error) {
        throw new Error('Error fetching products by category');
      }
    },

    productsByPriceRange: async (_, { minPrice, maxPrice }) => {
        try {
          const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });
          return products;
        } catch (error) {
          throw new Error('Error fetching products by price range');
        }
  },
},
}

module.exports = resolvers;


 
 
 
// query {
//     getAllUser {
//       id
//       name
//       email
//       mobileNo
//     }
//   }
  
//   mutation {
//     createUser(input:
    
//      {
//       name: "shashank", 
//      email: "shashankpail499gmail.com",
//      mobileNo :  "8290594456",
//      password : "qwertyuiop",
     
//       }
//       )
//        {
     
//       id
//       name
//       email
//       mobileNo
//       password
//     }
//   }
  
//   query GetProductsByCategory($category: String!) {
//     productsByCategory(category: $category) {
//       id
//       productName
//       description
//       price
//       category
//     }
//   }
    
    
//     {
//     "category": "SHOES"
//   }
  
//   query GetProductsByPriceRange($minPrice: Float!, $maxPrice: Float!) {
//     productsByPriceRange(minPrice: $minPrice, maxPrice: $maxPrice) {
//       id
//       productName
//       description
//       price
//       category
//     }
//   }
  
//   {
//     "minPrice": 100,
//     "maxPrice": 2000
//   }
  
  
  
  