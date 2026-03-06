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
async function getOneRecipe(index) {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipe = JSON.parse(data);
  return parsedRecipe[index];
}

// ✅ 3. getAllRecipeNames()
async function getAllRecipeNames() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedRecipes = JSON.parse(data);
  return parsedRecipes.map((recipe) => recipe.name);
}

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
app.get("/get-one-recipe/:index", async (req, res) => {
  const index = req.params.index;
  const recipe = await getOneRecipe(index);
  res.json(recipe);
});

// ✅ 3. GET /get-all-recipe-names
app.get("/get-all-recipe-names", async (req, res) => {
  const names = await getAllRecipeNames();
  res.json(names);
});

// ✅  4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
  const count = await getRecipesCount();
  res.json(count);
});
