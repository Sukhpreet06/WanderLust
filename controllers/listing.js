const listing=require("../models/listing");


module.exports.index=async (req, res) => {
    const alllistings = await listing.find({});
    res.render("listings/index.ejs", { alllistings });
};
module.exports.renderNewForm=(req, res) => {
    res.render("listings/new.ejs");
};
module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const foundlisting = await listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path: "author",
    },
})
    .populate("owner");
    if (!foundlisting) {
        req.flash("error", "Listing You Want too access Does Not Exist or May be deleted ");
        res.redirect("/listings");
    }
    console.log(foundlisting);
    res.render("listings/show.ejs", { foundlisting });
    //res.send("hey i am listing shower");
};
module.exports.createListing=async (req, res, next) => {
     let url =req.file.path;
     let filename = req.file.filename;

    req.body.nlisting.price = parseFloat(req.body.nlisting.price);
    console.log(typeof req.body.nlisting.price); 
    const newListing = new listing(req.body.nlisting);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.rendereditForm = async (req, res) => {
    let { id } = req.params;
    const nlisting = await listing.findById(id);
    if (!nlisting) {
        req.flash("error", "Listing You Want too access Does Not Exist or May be deleted ");
        res.redirect("/listings");
    }
    let originalImageUrl=nlisting.image.url;
originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { nlisting ,originalImageUrl});
};


module.exports.updateListing=async (req, res) => {
     req.body.nlisting.price = parseFloat(req.body.nlisting.price);
    let { id } = req.params;
    let listingg =await listing.findByIdAndUpdate(id, { ...req.body.nlisting });
    if( typeof  req.file !== "undefined"){
    let url =req.file.path;
    let filename = req.file.filename;
    listingg.image = {url , filename };
    await listingg.save();
    }
    req.flash("success", "Listing Upadted");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deltedListing = await listing.findByIdAndDelete(id);
    console.log(deltedListing);
    req.flash("success", " Listing Deleted");
    res.redirect("/listings");
};
module.exports.searchoptn = async (req, res) => {
    const { title } = req.query; // Extract 'title' from query parameters
    //console.log("Search query:", title);  // Log the search query
    
    try {
        const listingg = await listing.findOne({ title: new RegExp(title, 'i') }); // Case-insensitive search
        //console.log("Found listing:", listingg);  // Log the found listing

        if (listingg) {
            res.redirect(`/listings/${listingg._id}`); // Redirect to the specific listing's page
        } else {
            req.flash("error", "No listing found with that title.");
            res.redirect("/listings");
        }
    } catch (err) {
        console.error("Error during search:", err);
        res.status(500).send('Server Error');
    }
};


