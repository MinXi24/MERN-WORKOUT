import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`);
                const data = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: data });
                }
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        }
        fetchWorkouts()
    }, [dispatch])

    const filteredWorkouts = workouts.filter((workout) => {
        return workout.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div className="home">
            <input
            type = "text"
            placeholder="Search for a workout"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
                </div>
                <WorkoutForm/>
        </div>
    );
}

export default Home