import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [fetchIsLoading, setFetchIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setFetchIsLoading(true);
      try {
        const response = await fetch(
          "https://react-app-aa08b-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("SOMETHIND WRONG HAPPEN");
          
        }

        const data = await response.json();
        const loadedMeals = [];
        for (const meal in data) {
          loadedMeals.push({
            id: meal,
            name: data[meal].name,
            description: data[meal].description,
            price: data[meal].price,
          });
        }
        setMeals(loadedMeals);
        
      } catch (error) {
        setFetchError(error.message);
      }
      setFetchIsLoading(false);
    };
   
    fetchMeals();
  }, []);

// if (meals.length > 0){
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
// }
  
console.log(fetchError);

  let content = <p>FOUND NO MEALS</p>;
  if (fetchError) {
    return <p className= {classes.error_text}>{fetchError}</p>;
  }
  if (fetchIsLoading) {
    content = <p>LOADING ...</p>;
  }
  if (mealsList.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
