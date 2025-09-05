# recipes-application docs
    Frontend - Vite React.js
        Set up
        clone repo
        cd recipes_application_frontend
        install npm and run "npm i"
        change baseURL in services/api.ts to point to your server
        run "npm run dev" for running locally on http://localhost:5173/
        run "npm test" for running test suite

    Backend - Express.js
        Set up
        clone repo
        cd recipes_application_backend
        add .env file to root for local variables
            e.g. 
            {
                PORT=8000
                MYSQL_USER=root
                MYSQL_PASSWORD=password
                MYSQL_HOST=localhost
                MYSQL_PORT=3306
                MYSQL_DB=recipe_app
                JWT_SECRET=topsecret
                JWT_EXPIRES=86400
            }

        install npm and run "npm i"
        run "npm run dev" for running locally on http://localhost:{.env:PORT}/
        run "npm test" for running test suite

    Database - MySQL
        Set up
        Start a MySQL database, 
        I used this docker image https://hub.docker.com/_/mysql
        run the schema.sql file in a MySQL database
        test connections with backend

Planned Architecture
    Models
        Recipe
            Attrributes
                MVP id (int), title (String), cooking time (int), instructions (String), ingredients (String), created by(user_id). 
                further development timedate created, difficulty (int), , public/private(Boolean)
            Methods
                number rating(review list) - given an array of reviews, return average rating
        Review
            Attributes
                MVP id (int), recipe_id (int), comment (String), rating (int)
                further development created by(user_id), timedate created
        
        Users
            id (int), username(String), password(string)
        Further Development
            role (String)

    Endpoints
        MVP
        Post "/createrecipe"
        recipe createRecipe(title (String), cooking time (int), instructions (String), ingredients (String array), created by(user_id))

        Get "/recipe{id}"
        recipe getRecipe(id)

        Get "/getallrecipes"
        recipe list getAllRecipes()
        further development
            pagination on retrival of recipes

        Get "/getfavouriterecipes"
        recipe list getfavouriteRecipes(username(string))

        Delete "/deleterecipe{id}"
        void deleteRecipe(id(int))

        Put "/updaterecipe"
        recipe updateRecipe(id(int), title (String), cooking time (int), instructions (String), ingredients (String array))

        Post "/login"
        Post "/signup"

        Get "/recipebyusername{username}"
        recipe list getRecipeByUsername(string username) - get all recipes created by username

        Post "/createreview"
        review createRecipe(recipe_id(int), user_id(int), comment (String), rating (int))

        Get "/reviews{recipe_id}"
        review list getReviews(recipe_id(int))

        Get "/favouriteRecipe{user_id, recipe_id}"
        review list getReviews(user_id(int), recipe_id(int))

    Middleware
        MVP
        webtoken verification
        Error handling
        logging

        Further development
        logging to database or external file

    Service layer 
        further development 
        authorization - control access recipes, only allow editing/deleting of others users recipes by admin role.
    
    Database Tables
        User - id(Primary key), username(secondary key), password, role(further developement)
        recipe - id(Primary key), user_id (foreign key), title, cooking time, instructions, ingredients
        review - id(Primary key), recipe_id (foreign key), comment, rating
        favourite - user_id(foreign key), recipe_id(foreign key) (Composite key)

    UX
    User must be able to click on recipes in favourite list to show details of recipe
    user must be able to create recipes using a form
    user must be able to edit recipes using a form
    user must be able to delete recipes
    user must be able to view a list of all recipes they are autorized to see
    user must be able to click any recipe in the list to view/edit/delete the recipe
    user must be able to leave a review on a recipe
    user must be able to click into reviews on a recipe to be shown a list of all reviews.
    user must create an account with a username and password to access the application 
    user must sign in to access the appliaction





