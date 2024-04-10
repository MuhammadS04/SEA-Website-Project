/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */


const workouts =
[
    {
        category: "Chest",
        workouts: 
        [
            {
                title: "Bench Press",
                difficulty: "Intermediate",
                description: "The Bench Press is one of the most fundamental workouts for chest. It includes strength gain as well as overall chest muscle developement",
                image: "images/benchflat.webp"
            },
            {
                title: "Incline Dumbbell Press",
                difficulty: "Beginner",
                description: "The Incline Dumbell Press provides outstanding developement for upper chest growth. An area that most individuals lack",
                image: "images/inclinepress.gif"
            },
            {
                title: "Cable Fly's",
                difficulty: "Beginner/ Intermediate",
                description: "Cable Fly's provide a great stretch for the chest muscle and help in hitting the chest muscle in more ways than just press movements.",
                image: "images/high-cable-fly.gif"
            }
        ]
    },
    {
        category: "Back",
        workouts:
        [
            {
                title: "Barbell Row",
                difficulty: "Intermediate",
                description: "The Barbell Row is a staple back workout. It ignites strength as well as lots of developement",
                image: "images/barbellrow.gif"  
            },
            {
                title: "Pull-Ups",
                difficulty: "Advanced",
                description: "The Pull Up is the most common workout for back. Beginners might have a hard time hitting this one, but it gets easier as time goes on",
                image: "images/anim-pull-ups.gif"
            },
            {
                title: "Lat-Pull-Downs",
                difficulty: "Beginner",
                description: "The Lat Pulldown sets your lat muscles on fire.It creates those 'wings' in your back.",
                image: "images/latpull.gif"
            }
        ]
    },
    {
        category: "Shoulders",
        workouts:
        [
            {
                title: "Shoulder Press",
                difficulty: "Beginner",
                description: "The Shoulder Press is one of the most fundamental workouts for shoulders. It includes strength gain as well as overall shoulder muscle developement.",
                image: "images/Arnold-Press.gif"
            },
            {
                title: "Shoulder-Raises",
                difficulty: "Beginner/ Intermediate",
                description: "The shoulder raise is an amazing workout that can be done for both the front deltoid and the mid deltoid. It gets heavy quick.",
                image: "images/raises.webp"
            },
            {
                title: "Rear-Delt Fly's",
                difficulty: "Intermediate",
                description: "Rear deltoid muscles are a commonly neglected muslce so hitting this workout will defenitely make you stand out.",
                image: "images/cable-rear-delt-fly.gif"
            }
        ]
    }
]

function displayWorkouts(categList) {
    const workoutsContainer = document.getElementById('workout-container');

    categList.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.id = category.category.toLowerCase();
        categoryDiv.className = 'category-container';
        categoryDiv.innerHTML = `<h2>${category.category}</h2>`;

        const workoutsTileDiv = document.createElement('div'); // New div for workout tiles
        workoutsTileDiv.className = 'workout-tiles';

        category.workouts.forEach(workout => {
            const workoutDiv = document.createElement('div');
            workoutDiv.className = 'workout-container';
            workoutDiv.innerHTML = `
                <h3>${workout.title}</h3>
                <img src="${workout.image}" alt="${workout.title}">
                <h4>${workout.difficulty}</h4>
                <p>${workout.description}</p>
            `;
            workoutsTileDiv.appendChild(workoutDiv); // Add to tiles div
            console.log("Now Displaying", workoutDiv);
        });

        categoryDiv.appendChild(workoutsTileDiv); // Add tiles div under the category title
        workoutsContainer.appendChild(categoryDiv);
    });

}

window.onload = () =>
{
    displayWorkouts(workouts);
    document.getElementById('addWorkoutButton').addEventListener('click', addWorkout);
    document.getElementById('sortAlphabet').addEventListener('click',sortWorkoutsAlphabetically );
    document.getElementById('searchWorkout').addEventListener('click',searchWorkouts );
    document.getElementById('filterBeginner').addEventListener('click', filterBeginner);
} 

function addWorkout()
{
    //Asking user input to create a new workout
    const category = prompt("Enter Category: ");
    if(!category) return;

    const title = prompt("Enter Workout Title: ");
    if(!title) return;
    
    const difficulty = prompt("Enter Difficulty Level: ")
    if(!difficulty) return;

    const description = prompt("Enter Workout Description: ");
    if(!description) return;


    const image = prompt("Enter Image URL(optional- Leave empty): ");

    //making a workout object
    const newWorkout =
    {
        title,
        description,
        image: image || "images/gymclip.jpeg"
    }

    console.log("Creating new workout: ", newWorkout);

    //finding the correct category for the workout
    const categIndex = workouts.findIndex(c => c.category.toLowerCase() === category.toLowerCase());
    if(categIndex !== -1)
    {
        //if the category exists, add the workout to the category
        workouts[categIndex].workouts.push(newWorkout);
        appendWorkoutToDOM(newWorkout, workouts[categIndex].category.toLowerCase());
        console.log("Workout added: ", newWorkout);
    }
    else
    {
        // if the category doesn't exist, create a new category and add the new workout as well
        const newCategory = { category, workouts: [newWorkout]};
        workouts.push(newWorkout);
        displayWorkouts([newCategory]);
        console.log("Category added:", newCategory);
    }  
    
}

//To add the workout to the specific category
function appendWorkoutToDOM(workout, categoryID)
{
    const categoryDiv = document.getElementById(categoryID);

    if(!categoryDiv)
    {
        return;
    }

    const workoutDiv = document.createElement('div');
    workoutDiv.className = "workout-container";
    workoutDiv.innerHTML = 
    `
    <h3>${workout.title}</h3>
    <img src="${workout.image}" alt="${workout.title}">
    <h4>${workout.difficulty}</h4>
    <p>${workout.description}</p>
    `;    

    const workoutsTileDiv = categoryDiv.querySelector('.workout-tiles');
    if(workoutsTileDiv)
    {
        workoutsTileDiv.appendChild(workoutDiv);
    }
}

function sortWorkoutsAlphabetically() {
    workouts.forEach(category => {
        category.workouts.sort((a, b) => a.title.localeCompare(b.title));
    });
    displayWorkouts(workouts);
}

function searchWorkouts()
{
    const key = prompt("Enter a keyword to search for workouts");
    const lowerKey = key.toLowerCase();
    const searchedCategories = workouts.map(category => 
    ({
        ...category,
        workouts: category.workouts.filter(workouts => workouts.title.toLowerCase().includes(lowerKey))
    })).filter(category => category.workouts.length > 0);
    console.log("Searched: ", key, "\nFound: ", searchedCategories);

    displayWorkouts(searchedCategories);
}

function filterBeginner()
{
    const begCategories = workouts.map(category => 
    ({
        ...category, 
        workouts: category.workouts.filter(workout => workout.difficulty.toLowerCase() === 'beginner')
    })).filter(category => category.workouts.length > 0);
    console.log("Displaying beginner workouts: ", begCategories);

    displayWorkouts(begCategories);
}