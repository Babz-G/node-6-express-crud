// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// import our node modules
import express from "express";
import fs from "fs/promises";

// declare app variable - creating a new instance of express for us to use
const app = express();

// define our port number
const port = 3000;

// tell our server what kind of data it will be recieving and responding - JSON
app.use(express.json());

// Turn on our sever so it can listen and respond at port #
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// ✅ 1. getAllRecipes()
// make a helper function that will get the name and descrition of all books
async function getAllRecipes() {
  // read the data from recipes-data.json
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes;
}
// ✅ 2. getOneRecipe(index)

// async function getOneRecipe(index) {
//   const data = await fs.readFile("recipes-data.json", "utf8");
//   const parsedRecipe = JSON.parse(data);
//   return parsedRecipe[index];
// }

// ✅ 3. getAllRecipeNames()

// async function getAllRecipeNames() {
//   const data = await fs.readFile("recipes-data.json", "utf8");
//   const parsedRecipes = JSON.parse(data);
//   return parsedRecipes.map((recipe) => recipe.name);
// }

// ✅ 4. getRecipesCount()
async function getRecipesCount() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// ✅ 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  // res.send() sends text data
  // res.json() sends JSON data
  res.json(recipes);
});

// ✅ 2. GET /get-one-recipe/:index

// app.get("/get-one-recipe/:index", async (req, res) => {
//   const index = req.params.index;
//   const recipe = await getOneRecipe(index);
//   res.json(recipe);
// });

// ✅ 3. GET /get-all-recipe-names
// app.get("/get-all-recipe-names", async (req, res) => {
//   const names = await getAllRecipeNames();
//   res.json(names);
// });

// ✅  4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
  const count = await getRecipesCount();
  res.json(count);
});

// ---------------------------------------------
//  ✨✨ Add Error Handling for getOneRecipe ✨✨
// ---------------------------------------------

// async function getOneRecipe(index) {
//   const data = await fs.readFile("recipes-data.json", "utf8");
//   const parsedRecipe = JSON.parse(data);

//   const recipe = parsedRecipe[index];
//   if (!recipe) {
//     throw new Error("Recipe was not found");
//   }
//   return recipe;
// }

// app.get("/get-one-recipe/:index", async (req, res) => {
//   try {
//     const index = req.params.index;
//     const recipe = await getOneRecipe(index);
//     res.json(recipe);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Server error. Something went wrong while getting the recipe",
//     });
//   }
// });

// ---------------------------------------
//        ✨✨ getAllRecipeNames ✨✨
// ---------------------------------------

async function getAllRecipeNames() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes.map((recipe) => recipe.name);
}

app.get("/get-all-recipe-names", async (req, res) => {
  try {
    const names = await getAllRecipeNames();
    res.json(names);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error. Something went wrong while getting recipe names",
    });
  }
});

// ✨✨ COMMENTED CODE BELOW ✨✨

async function getOneRecipe(index) {
  // function that finds one recipe by its position in the list
  const data = await fs.readFile("recipes-data.json", "utf8"); // opens & readss the recipes file
  const parsedRecipe = JSON.parse(data); // turns the file contents into usable js data

  const recipe = parsedRecipe[index]; // picks the recipe at the given position
  if (!recipe) {
    // if no recipe exists tops and report an error
    throw new Error("Recipe was not found");
  }
  return recipe; // returns the recipe
}

app.get("/get-one-recipe/:index", async (req, res) => {
  // listens for requests to this URL
  try {
    const index = req.params.index; // grabs the number from the URL aka /get-one-recipe/3)
    const recipe = await getOneRecipe(index); // uses the function above to find that recipe
    res.json(recipe); // sends the recipe back to the user
  } catch (error) {
    console.error(error);
    res.status(500).json({
      // tells the user somethings not ok
      error: "Server error. Something went wrong while getting the recipe",
    });
  }
});
