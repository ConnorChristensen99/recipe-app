import React, { useState } from "react";
import "./App.css"
import "./modal.css"




const App = () => {
const [editing, setEditing] = useState(false);
  let viewMode = {};
  let editMode = {};
  editMode.className = "editing"
  if (editing) {
    viewMode.display = 'none';
    
  } else {
    editMode.display = 'none';
  }



  //Recipes
  const [favRecipies, setFavRecipies] = useState(["Fried Ocra"])
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Burrito",
      calories: 1000,
      serves: 5,
      ingredients: ["1 tortilla, ", "1 cup meat, ", "2 cups cheese, "]
    },
    {
      id: 2,
      name: "Taco",
      calories: 500,
      serves: 1,
      ingredients: ["1 tortilla, ", "1 cup meat, ", "2 cups cheese, "]
    }
  ])






//Lets the user edit Recipes
const handleEditing = () => {
  setEditing(true);
};

const handleUpdatedDone = (event) => {
  if (event.key === 'Enter') {
    setEditing(false);
  }
};


//Changes the text when editing
const setUpdate = (updatedInformation, id) => {
  setRecipes(
    recipes.map((recipe) => {
      if (recipe.id === id) {
        recipe.name = updatedInformation;
      }
      return recipe;
    })
  );
};
const setUpdate1 = (updatedInformation, id) => {
  setRecipes(
    recipes.map((recipe) => {
      if (recipe.id === id) {
        recipe.calories = updatedInformation;
      }
      return recipe;
    })
  );
};
const setUpdate2 = (updatedInformation, id) => {
  setRecipes(
    recipes.map((recipe) => {
      if (recipe.id === id) {
        recipe.serves = updatedInformation;
      }
      return recipe;
    })
  );
};
const setUpdate3 = (updatedInformation, id) => {
  setRecipes(
    recipes.map((recipe) => {
      if (recipe.id === id) {
        recipe.ingredients = updatedInformation;
      }
      return recipe;
    })
  );
};

const editButton = <button onClick={handleEditing}>Edit</button>







  //Renders the Recipes
   const recipeList = recipes.map(recipe => (
      <div id="recipeCard">
          <h2 key={recipe.name}>{recipe.name} <input type="text" defaultValue={recipe.name} class="textInput" style={editMode} onKeyDown={handleUpdatedDone} onChange={(e) => setUpdate(e.target.value, recipe.id)}/></h2>  
          <div id="cardInfo">
          <h4>Extra Information:</h4>
          <ul>
            <li key={recipe.calories}>Calories: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;{recipe.calories} <input type="text" defaultValue={recipe.calories} class="textInput" style={editMode} onKeyDown={handleUpdatedDone} onChange={(e) => setUpdate1(e.target.value, recipe.id)}/></li>
            <li key={recipe.serves}>Serves: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{recipe.serves} <input type="text" defaultValue={recipe.serves} class="textInput" style={editMode} onKeyDown={handleUpdatedDone} onChange={(e) => setUpdate2(e.target.value, recipe.id)}/></li>
            <li key={recipe.ingredients}>Ingredients: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{recipe.ingredients} <input type="text" defaultValue={recipe.ingredients} class="textInput" style={editMode} onKeyDown={handleUpdatedDone} onChange={(e) => setUpdate3(e.target.value, recipe.id)}/></li>
          </ul>
          </div>
          <div id="buttons">
          <button onClick={() => deleteRecipe(recipe.name)}>Delete</button>
          {editButton}
          <button onClick={() => addToFavorites(recipe.name)}>Add to Favorites</button>
          </div>
          <p id="warning">*Press enter when finished editing</p>
          </div>
        ))

         



  //Lets the user delete Recipes
  function deleteRecipe(name) {
    setRecipes(recipes.filter(recipe => recipe.name !== name))
  }

  


   //Lets the user add Recipe to favorites
  const favRecipiesList = favRecipies.map(favRecipie => (
    <li id="favorites">{favRecipie}</li>
  ))

   function addToFavorites(name) {
    setFavRecipies(current => [...current, name])
  }






        //Lets the user add a recipe via a nifty Modal
        ///////// BEGIN MODAL STUFF ////////
        function Modal() {
          const [modal, setModal] = useState(false);
          const [calories, setCalories] = useState(0);
          const [name, setName] = useState('');
          const [servings, setServings] = useState(0);
          const [ingredients, setIngredients] = useState('');
        
        
          //Checks modal status --Dont mess with
          const toggleModal = () => {
            setModal(!modal);
          };
        
        
          //Gets information from the form to add to array
          const getInformation = (e) => {
            e.preventDefault();
            console.log(calories,name,servings,ingredients)

            setRecipes(current => [...current, {
                  id: recipes.length +1,
                  name: name,
                  calories: calories,
                  serves: servings,
                  ingredients: ingredients
                }])
        
          }
        
          //Returns the modal and form
          return (
            <>
                <button onClick={toggleModal} className="btn-modal">
                Add a Recipe
              </button>
              {modal && (
                <div className="modal">
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal-content">
                   <h2>Add a Recipe</h2>
                   <form onSubmit={getInformation}>
        
                    <label for="recipe-name">Name:</label>
                    <input type="text" id="recipe-name" required onChange={(event) => setName(event.target.value)}/> <br />
                    <label for="recipe-name">Calories:</label>
                    <input type="number" id="recipe-calories" required onChange={(event) => setCalories(event.target.value)}/> <br />
                    <label for="recipe-serves">Number of Servings:</label>
                    <input type="number" id="recipe-name" required onChange={(event) => setServings(event.target.value)}/> <br />
                    <label for="recipe-ingredients">Ingredients:</label>
                    <input type="text" id="recipe-name" required onChange={(event) => setIngredients(event.target.value)}/> <br />
        
                    <button type="submit">Add Recipe</button>
        
                  </form>
                    <button className="close-modal" onClick={toggleModal}>
                      CLOSE
                    </button>
                  </div>
                </div>
              )}
                </>
            );
        }
///////// END MODAL STUFF ////////






  return (
    <div class="App">
      <h1 id="secondHeader">Recipe App</h1>
      <Modal />
      <div id="appRecipes">
        {recipeList}
        </div>
        <h3>Favorite Recipes:</h3>
        <div id="favoriteRecipies">
        {favRecipiesList}
        </div>
    </div>

  );
};


export default App;


