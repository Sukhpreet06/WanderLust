// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// async function main() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
//         console.log("Connected to DB");
//         // Initialize DB only if it’s empty (for example, during development)
//         const count = await Listing.countDocuments();
//         if (count === 0) {
//            initData.data= initData.data.map((obj)=>({
//                ...obj,
//                owner: mongoose.Types.obj("66f7d4c0c12fbd9c73e061de")}));
//             await Listing.insertMany(initData.data);
//             console.log("Data was initialized");
//         }
//     } catch (err) {
//         console.error("Connection error:", err);
//     }
// }

// main();






// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// //const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
// .then(()=>{
//     console.log("connection to db ");
// })
// .catch((err) => {
//    console.log(err);
// });
// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data=initData.data.map((obj)=>({...obj,owner:"66f7d4c0c12fbd9c73e061de"}));

//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// initDB();


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    console.log("Connected to DB");

    // Initialize DB only if it’s empty (for example, during development)
    const count = await Listing.countDocuments();
    if (count === 0) {
      // Ensure 'owner' is an ObjectId and properly set
      initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: mongoose.Types.ObjectId("66fb0113c9b535eb488d6386")
         // Correctly setting owner as ObjectId
      }));

      await Listing.insertMany(initData.data);
      console.log("Data was initialized");
    } else {
      console.log("Data already exists, skipping initialization");
    }
  } catch (err) {
    console.error("Connection error:", err);
  }
}

main();


// file that insert data into database