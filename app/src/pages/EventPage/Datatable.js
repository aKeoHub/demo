
import React, {useEffect, useState} from "react";
import './Datatable.css';

const Login = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);

        fetch('api/v1/events/all')
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
                console.log(data);
            })
    }, []);

        if (loading) {
            return <p>Loading...</p>;
        }


    return (
    <div>
        <div class="dataHeader">
            <h2>User List</h2>
        </div>

            <table class="eventTable">
                <tr>
                    <th>Event ID</th>
                    <th>Event Creator</th>
                    <th>Category ID</th>
                    <th>Event Name</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </table>
            {events.map(event =>
                <div key={event.id}>
                    <table class="eventTable">

                        <tr>
                            <td>{event.event_id}</td>
                            <td>{event.event_creator.id}</td>
                            <td>{event.category_id.category_id}</td>
                            <td>{event.event_name}</td>
                            <td>{event.location}</td>
                            <td>{event.description}</td>
                            <td>{event.start_date}</td>
                            <td>{event.end_date}</td>
                        </tr>

                    </table>
                </div>
            )}
        </div>
    );
}

export default Login;