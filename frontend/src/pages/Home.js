import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const [searchQuery, setSearchQuery] = useState(""); // State to store search query

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        };
        fetchWorkouts();
    }, [dispatch]);

    // Filter workouts based on search query
    // Filter workouts based on search query, ensuring workouts is an array
const filteredWorkouts = (workouts || []).filter(workout =>
    (workout.title && workout.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (workout.description && workout.description.toLowerCase().includes(searchQuery.toLowerCase()))
);


    return (
        <div className="home">
            {/* Search bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search workouts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                />
            </div>

            {/* Content (workouts and form) */}
            <div className="content">
                <div className="workouts">
                    {/* Display filtered workouts */}
                    {filteredWorkouts.length > 0 ? (
                        filteredWorkouts.map((workout) => (
                            <WorkoutDetails key={workout._id} workout={workout} />
                        ))
                    ) : (
                        <p>No workouts found</p> // If no workouts match the search query
                    )}
                </div>

                <div className="create">
                    <WorkoutForm />
                </div>
            </div>
        </div>
    );
};


export default Home;