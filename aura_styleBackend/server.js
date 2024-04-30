const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = require("./routes/routess")
 require("dotenv").config();
 const port = process.env.PORT;
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)

mongoose.connect('mongodb://localhost:27017/userdb').then(()=>{

    console.log("mongodb connect")
    }).catch((error)=>{
    console.log("mongodb connect",error);
    })
    app.listen(port,()=>{
    console.log(`server is run on ${port}`)
    })


// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const typeDefs = require('./graphql/schema');
// const resolvers = require('./graphql/resolvers');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/userdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const startServer = async () => {
    
//     const app = express();
  
//     app.use(cors()); 
//     const server = new ApolloServer({ typeDefs, resolvers });

//     await server.start();


//     server.applyMiddleware({ app });

//     app.listen({ port: 4010 }, () => {
  
//       console.log(`Server running at http://localhost:4010${server.graphqlPath}`);
    
//     });
//   };

//   startServer().catch(err => {
//     console.error('Failed to start server', err);
//     });





// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const typeDefs = require('./graphql/schema');
// const resolvers = require('./graphql/resolvers');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/userdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("MongoDB connected");
// })
// .catch((error) => {
//   console.error("MongoDB connection error:", error);
// });

// const startServer = async () => {
//   const app = express();

//   // Middleware
//   app.use(express.json());
//   app.use(cors());

//   const server = new ApolloServer({ typeDefs, resolvers });

//   await server.start();

//   server.applyMiddleware({ app });

//   const PORT = process.env.PORT || 4010;
//   app.listen({ port: PORT }, () => {
//     console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// };

// startServer().catch((error) => {
//   console.error('Failed to start server', error);
// });
