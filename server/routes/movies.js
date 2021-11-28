const router = require("express").Router();

const Movie = require("../models/Movie.js");
const verify = require("../verifyToken.js");

// create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("You are not allowed to add movie");
  }
});

// Update

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = new Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("You are not allowed to add movie");
  }
});

// delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
     await Movie.findByIdAndDelete(
        req.params.id,
      
      );

      res.status(200).json("successfully deleted the movie.!");
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("You are not allowed to add movie");
  }
});

//get
router.get("/find/:id", async (req, res) => {
  
    try {
       const movie= await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err.message);
    }
  
});

// get random movie
router.get("/random", async(req, res) => {
  const type=req.query.type;
  let movie;
    try {
       if(type==="series"){
          movie=await Movie.aggregate([
              {$match:{isSeries:true}},
              {$sample:{size:1}},
          ]);
       }else{
        movie=await Movie.aggregate([
            {$match:{isSeries:false}},
            {$sample:{size:1}},
        ]);
       }
       res.status(200).json(movie)
    } catch (err) {
      res.status(500).json(err.message);
    }
  
});

//get all
router.get("/", async (req, res) => {
    
      try {
     const movies=  await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err.message);
      }
    
  });

module.exports = router;
