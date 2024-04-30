const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    image: String!
    productName: String!
    description: String!
    price: Float!
    availableSizes: String
    availableColors: String
    materialType: String
    category: String!
  }

  type Query {
    productsByCategory(category: String!): [Product]
    productsByPriceRange(minPrice: Float!, maxPrice: Float!): [Product]
  }
`;

module.exports = typeDefs;
