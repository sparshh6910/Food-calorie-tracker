import { useState } from "react";

export default function CalorieTracker() {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [dailyLogs, setDailyLogs] = useState([]);

  const dailyGoal = 2000;
  const weeklyGoal = 14000;

  const total = foods.reduce(
    (acc, food) => {
      acc.calories += Number(food.calories);
      acc.protein += Number(food.protein);
      acc.carbs += Number(food.carbs);
      acc.fats += Number(food.fats);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const handleAddFood = () => {
    const newFood = {
      name: foodName,
      calories,
      protein,
      carbs,
      fats,
    };
    setFoods([...foods, newFood]);
    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
  };

  const handleEndOfDay = () => {
    const todaySummary = {
      date: new Date().toLocaleDateString(),
      ...total,
    };
    setDailyLogs([...dailyLogs, todaySummary]);
    setFoods([]);
  };

  const weeklyCalories = dailyLogs.reduce((sum, log) => sum + log.calories, total.calories);
  const bufferCalories = weeklyGoal - weeklyCalories;

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Food</h2>
      <input placeholder="Food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} /><br />
      <input placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} /><br />
      <input placeholder="Protein (g)" value={protein} onChange={(e) => setProtein(e.target.value)} /><br />
      <input placeholder="Carbs (g)" value={carbs} onChange={(e) => setCarbs(e.target.value)} /><br />
      <input placeholder="Fats (g)" value={fats} onChange={(e) => setFats(e.target.value)} /><br />
      <button onClick={handleAddFood}>Add</button>

      <h2>Today’s Summary</h2>
      <p>Calories: {total.calories} / {dailyGoal}</p>
      <p>Protein: {total.protein}g</p>
      <p>Carbs: {total.carbs}g</p>
      <p>Fats: {total.fats}g</p>
      <button onClick={handleEndOfDay}>End Day & Save</button>

      <h2>Weekly Summary</h2>
      <p>Total Weekly Calories: {weeklyCalories} / {weeklyGoal}</p>
      <p>Buffer Calories: {bufferCalories} {bufferCalories >= 0 ? "(under goal)" : "(over goal)"}</p>
    </div>
  );
}