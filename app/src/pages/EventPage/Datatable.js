import React, {useEffect, useState} from "react";
import "./Datatable.css";
import EventModal from "./EventModal";
import EventEditModal from "./EventEditModal";
import axios from "axios";

//Component of the Event Table to show all events.
const EventTable = () => {

    //Constants and sets for all the use states of variables
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("accessToken");
    const [user, setUser] = useState("");
    const username = localStorage.getItem("username");

    //Loads all the events into the event array and the event table and gets the user as well
    useEffect(() => {
        setLoading(true);
        const bodyParameters = {
            username: username,
        };
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        };
        axios
            .post("/api/v1/user", bodyParameters, config)
            .then(function (response) {
                console.log(response.data);
                setUser(response.data);
                //console.log(user)
            });

        fetch("api/v1/events/all", {
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    //Deletes selected event from table.
    function deleteEvent(id) {
        fetch("api/v1/events/delete/" + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                console.log(data);

            });
    }

    return (
        <div class="dataTableContainer">
            <div class="dataHeader">
                <div class="row">
                    <div class="col">
                        <h2>Event List</h2>
                    </div>
                    <div class="col">
                        <EventModal/>
                    </div>
                </div>
            </div>
            {/* Table headers*/}
            <table class="eventTable">
                <tr>
                    <th style={{width: "2%"}}>&nbsp;Id</th>
                    <th style={{width: "9%"}}>&nbsp;Category</th>
                    <th style={{width: "9%"}}>&nbsp;Name</th>
                    <th style={{width: "6%"}}>&nbsp;Location</th>
                    <th style={{width: "16%"}}>&nbsp;Description</th>
                    <th style={{width: "8%"}}>&nbsp;Start Date</th>
                    <th style={{width: "8%"}}>&nbsp;End Date</th>
                    <th style={{width: "13%"}}>&nbsp;Edit</th>
                    <th style={{width: "13%"}}>&nbsp;Delete</th>
                </tr>
            </table>
            {/* Maps all events and loads to the table*/}
            {events.map((event) => (
                <div key={event.id}>
                    <table class="eventTable">
                        <tr>

                            <td style={{width: "2%"}}>&nbsp;{event.event_id}</td>
                            <td style={{width: "9%"}}>&nbsp;{event.category_id}</td>
                            <td style={{width: "9%"}}>&nbsp;{event.event_name}</td>
                            <td style={{width: "6%"}}>&nbsp;{event.location}</td>
                            <td style={{width: "16%"}}>&nbsp;{event.description}</td>
                            <td style={{width: "8%"}}>&nbsp;{event.start_date}</td>
                            <td style={{width: "8%"}}>&nbsp;{event.end_date}</td>
                            <td style={{width: "13%"}}>
                                <EventEditModal/>
                            </td>
                            <td style={{width: "13%"}}>
                                <button
                                    onClick={() => {
                                        deleteEvent(event.event_id);
                                        window.location.reload();
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default EventTable;
