import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
 import logo from './logo.svg';
import './App.css';

const App = () => {
  const APP_ID = '87b6dbfc';
  const APP_KEY ='4eb7b454490cc437d69fb2ebf31092d5 ';
//creating state
const [recipes, setRecipes]=useState([]);
const [search, setSearch] =useState('');
const [query, setQuery]=useState('chicken');

  useEffect ( () =>{
    getRecipes();
  }, [query]);

  //funstion to get rcipes
  const getRecipes = async () =>{
    const response =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  //function to get the changes
  const updateSearch = e=>{
    setSearch(e.target.value);
  }
  const getSearch=e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch}></input>
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='reci'>
       {recipes.map(recipe =>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div> 
  );
}

export default App;
