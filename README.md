# Fridgify

Fridgify is a web application designed to help users find recipes based on ingredients they have on hand. Users simply enter ingredients they have in their fridge, and Fridgify connects to the Spoonacular API to retrieve recipes that can be made with those ingredients. Each recipe can be clicked to view detailed cooking instructions, along with a list of necessary ingredients and a picture of the dish.
This app is responsive and can be used on small devices.

## Features

- **Ingredient Entry**: Users can add multiple ingredients they have on hand.
- **Recipe Search**: Fridgify fetches recipes from the Spoonacular API based on the ingredients provided.
- **Recipe Details**: Clickable recipe results show detailed cooking instructions, required ingredients, and a picture of the final dish.
- **Error Handling**: Displays helpful error messages if no recipes are found or if there’s an issue with the API.

## Technologies Used

- **React**: For building the UI and managing component state.
- **JavaScript (ES6)**: Core language for building app logic.
- **CSS**: Custom styling to create a modern and responsive user interface.
- **Spoonacular API**: Used to fetch recipe information based on ingredients.

## How to Run the Project

1. **Clone the Repository**:
   git clone https://github.com/yourusername/fridgify.git
2. **Install Dependencies**:
  cd fridgify
  npm install
3. **Add your API key**:
   const API_KEY = 'your_api_key_here';
4. **Start the app**:
  Run the following command on your terminal:
  npm start
  The app will be accessible at http://localhost:3000.

## Project Structure
- components/Header.js: Contains the header component for the application.
- pages/Homepage.js: Main page component, including the ingredient input, recipe list, and recipe details.
- homepage.css: CSS styles for the application.
