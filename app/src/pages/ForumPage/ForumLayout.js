import React, {useEffect, useState} from "react";
import './ForumPage.css';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {AddButtonForum} from "../../components/Button/AddButtonForum";
import {ViewButtonForum} from "../../components/Button/ViewButtonForum";
import {EditButtonForum} from "../../components/Button/EditButtonForum";
import {DeleteButtonForum} from "../../components/Button/DeleteButtonForum";
import {CancelButtonForum} from "../../components/Button/CancelButtonForum";



const ForumLayout = () => {



// Constants that are used to set variables and the states of the variables.

    const [forums, setForums] = useState([]);                 // Forum array that sets the forums
    const [loading, setLoading] = useState(false);            // shows if the backend is still loading

    const token = localStorage.getItem("accessToken");             // Access token of the user signed in.
    const username = (localStorage.getItem('username'));           // Username of the user.
    const [user, setUser] = useState([]);                     // Sets the user

    const [showAdd, setShowAdd] = useState(false);            // Shows the Add Modal
    const handleCloseAdd = () => setShowAdd(false);              // Closes the Add Modal
    const handleShowAdd = () => setShowAdd(true);                // Opens the Add Modal

    const [modalEditInfo, setModalEditInfo] = useState([]);   // Array of selected forum info to Edit
    const [showEdit, setShowEdit] = useState(false);          // Shows the Edit Modal
    const handleCloseEdit = () => setShowEdit(false);             // Closes the Edit Modal
    const handleShowEdit = () => setShowEdit(true);               // Opens the Edit Modal

    const [modalViewInfo, setModalViewInfo] = useState([]);    // Array of selected forum to View
    const [showView, setShowView] = useState (false);          // Shows the View Modal
    const handleCloseView = () => setShowView( false);            // Closes the View Modal
    const handleShowView = () => setShowView( true);              // Opens the View Modal

    const [showDelete, setShowDelete] = useState (false);      // Shows Delete Modal
    const handleCloseDelete = () => setShowDelete( false);        // Closes the Delete Modal
    const handleShowDelete = () => setShowDelete( true);          // Opens the Delete Modal

    const [forumId, setForumIdReg] = useState(0);              // Sets forum id to 0
    const [title, setTitleReg] = useState(null);               // Sets title to null
    const [subTitle, setSubTitleReg] = useState(null);         // Sets subtitle to null
    const [description, setDescriptionReg] = useState(null);    // Sets description to null
    const [forumCategory, setForumCategoryReg] = useState(null);// Sets forum category to null
    const [picture_id, setPictureId] = useState(null);          // Sets picture id to null
    const [createDate, setCreateDate] = useState(new Date());            // Sets create date to a new Date()


//This will load all the forums into the forums array and display on forum page.
    useEffect(() => {
        setLoading(true);

        fetch('api/v1/forums/all',{
            headers: { 'Content-Type': 'application/json',}
        })
            .then(response => response.json())
            .then(data => {
                setForums(data);
                setLoading(false);
                console.log(data);

            })
            const bodyParameters = {
                username: username,
            };
            const config = {
                headers: {Authorization: `Bearer ${token}`},
            };
            axios.post("/api/v1/user", bodyParameters, config)
                .then(function (response) {
                    console.log(response.data);
                    setUser(response.data)
                    //console.log(user)

                })},
        []);

    if (loading) {
        return <p>Loading...</p>;
    }


//This will delete a forum when clicking the button, but you need to be logged in to do so.
    function deleteForum(id) {

        fetch('api/v1/forums/delete/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
        }).then(response => response.json() )
            .then(data => {
                setLoading(false);
                console.log(data);

            })
    }

    const handleSubmit = (forum) => {
        forum.preventDefault();
        console.log(forum.target.forumId.value);
    }

//This will add a forum when clicking the button, but you need to be logged in to do so.
    function addForum() {
        const todaysDate = new Date();
        console.log(todaysDate.toLocaleDateString());
        setCreateDate(todaysDate);


        fetch('api/v1/forums/add', {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                forum_id: forumId,
                creator_id: user,
                title: title,
                description: description,
                create_date: todaysDate,
                picture_id: picture_id,
                sub_title: subTitle,
                forum_category: forumCategory,

            }),

            headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},

        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console

            .then((json) => {
                console.log(json)
                if (title === null || todaysDate === null || description === null || forumCategory === null ){
                    alert("Forum Failed to Add, Please Review your Inputs");
                } else {
                    window.location.reload();
                }
            });

    }

//This will make you view the forum, you do not need to be logged in to see the forum.
    function viewForum(id) {
        try{
             axios.get('api/v1/forums/get/' + id,
            ).then(function (response){
                console.log(response.data);
                setModalViewInfo(response.data);
                setModalEditInfo(response.data);
                console.log(modalViewInfo);
            })

        }catch (e) {
        }

    }



//This will edit a selected forum, you need to be logged in to do so.
    function editForum(forumId) {

         fetch('api/v1/forums/edit/' + forumId, {

            // Adding method type
            method: "PUT",

            // Adding body or contents to send
            body: JSON.stringify({
                forum_id: forumId,
                creator_id: user,
                title: title,
                description: description,
                create_date: createDate,
                picture_id: picture_id,
                sub_title: subTitle,
                forum_category: forumCategory,

            }),

            headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},

        })

            // Converting to JSON
             .then(data => {
                 setLoading(false);
                 console.log(data);
             })
             .catch((error) => {
             alert("Forum Failed to Edit");
             window.location.reload();
         });

            // Displaying results to console


        }


    return (


        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="--wrapper --wrapper-content animated fadeInRight">

                        <div className="--ibox-content --forum-container">
                            <div className="forum-title">
                                <div className="pull-right forum-desc">
                                    <small>Total posts: {forums.length}</small>
                                </div>
                                <h3>All Forum Posts</h3>
                            </div>

                            {/*Button to Show Add Forum Form */}
                            <AddButtonForum variant="primary" onClick={handleShowAdd}>
                                Add Forum
                            </AddButtonForum>

                            {/*The Modal for Add Forum*/}
                            <Modal className="blue-color-background modal-xl" show={showAdd} onHide={handleCloseAdd}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Creating a Forum</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-wrapper">
                                            <div className="form-wrapper">
                                                <label htmlFor="">Title</label>
                                                <input
                                                    required="true"
                                                    type="text"
                                                    size="55"
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        setTitleReg(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-wrapper">
                                            <div className="form-wrapper">
                                                <label htmlFor="">Sub Title</label>
                                                <input
                                                    required="true"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        setSubTitleReg(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-wrapper">
                                            <label htmlFor="">Description</label>
                                            <textarea
                                                required="true"
                                                style={{height: '300px'}}
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => {
                                                    setDescriptionReg(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-wrapper">
                                            <label htmlFor="forumCategory">ForumCategory</label>
                                            <select className="form-select" onChange={(e) => {
                                                setForumCategoryReg(e.target.value);
                                            }}name="forumCategory" id="forumCategory">
                                                <option value="">Select a Category</option>
                                                <option value="Help Needed!">Help Needed!</option>
                                                <option value="Announcement">Announcement</option>
                                                <option value="Event">Event</option>
                                            </select>
                                        </div>
                                    </form>


                                </Modal.Body>
                                <Modal.Footer >
                                    <AddButtonForum variant="primary" onClick={() =>{
                                        addForum();
                                        //window.location.reload();
                                    }}>
                                        Add
                                    </AddButtonForum>
                                    <CancelButtonForum variant="secondary" onClick={handleCloseAdd}>
                                        Close
                                    </CancelButtonForum>
                                </Modal.Footer>
                            </Modal>

                            {/*Mapping every forum to the Forum Page*/}
                            {forums.map(forum =>
                                <div key={forum.id}>
                                    <div className="--forum-item active">

                                        <div className="row">
                                            <div className="col-md-9">
                                                <a href="" className="--forum-item-title">{forum.title}</a>
                                                <div className="--forum-sub-title">{forum.sub_title}
                                                </div>
                                                <div>Forum type: {forum.forum_category}</div>
                                                <div>Create Date: {forum.create_date}</div>

                                                {/*The Modal for View Forum*/}
                                                <Modal className="blue-color-background modal-xl" show={showView} onHide={handleCloseView}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title><h1>{modalViewInfo.title}</h1></Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <h3>{modalViewInfo.sub_title}</h3>
                                                        <div>{modalViewInfo.description}</div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <EditButtonForum variant="secondary" onClick={handleShowEdit}>
                                                            Edit
                                                        </EditButtonForum>
                                                        <DeleteButtonForum variant="primary" onClick={handleShowDelete}>
                                                            Delete
                                                        </DeleteButtonForum>
                                                    </Modal.Footer>
                                                </Modal>


                                                {/*Modal For Delete Forum*/}
                                                <Modal className="blue-color-background modal-lg" show={showDelete} onHide={handleCloseDelete}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title >Are you sure you want to Delete the Forum?</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Footer>
                                                        <EditButtonForum variant="secondary" onClick={()=> {
                                                            deleteForum(modalViewInfo.forum_id);
                                                            window.location.reload();
                                                        }}>
                                                            Yes
                                                        </EditButtonForum>
                                                        <DeleteButtonForum variant="primary" onClick={handleCloseDelete}>
                                                            No
                                                        </DeleteButtonForum>
                                                    </Modal.Footer>
                                                </Modal>

                                                {/*Modal For Edit Forum*/}
                                                <Modal className="blue-color-background modal-xl"show={showEdit} onHide={handleCloseEdit}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Edit This forum.</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form action="">
                                                            <div className="form-wrapper">
                                                                <div className="form-wrapper">
                                                                    <label>Title</label>
                                                                    <input
                                                                        defaultValue={modalEditInfo.title}
                                                                        onLoad= {modalEditInfo.title}
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => {
                                                                            setTitleReg(e.target.value);
                                                                        }}
                                                                   />
                                                                </div>
                                                            </div>
                                                            <div className="form-wrapper">
                                                                <div className="form-wrapper">
                                                                    <label>Sub Title</label>
                                                                    <input
                                                                        defaultValue={modalEditInfo.sub_title}
                                                                        onLoad = {modalEditInfo.sub_title}
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e) => {
                                                                            setSubTitleReg(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-wrapper">
                                                                <label>Description</label>
                                                                <textarea
                                                                    style={{height: '300px'}}
                                                                    defaultValue={modalEditInfo.description}
                                                                    onLoad = {modalEditInfo.description}
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={(e) => {
                                                                        setDescriptionReg(e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="form-wrapper">
                                                                <label>ForumCategory</label>
                                                                <select className="form-select" defaultValue={modalEditInfo.forum_category} onLoad = {modalEditInfo.forum_category} onChange={(e) => {
                                                                    setForumCategoryReg(modalEditInfo.forum_category);
                                                                }} name="forumCategory" id="forumCategory">
                                                                    <option value="Help Needed!">Help Needed!</option>
                                                                    <option value="Announcement">Announcement</option>
                                                                    <option value="Event">Event</option>
                                                                </select>
                                                            </div>
                                                        </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <EditButtonForum variant="primary" onClick={() => {
                                                            editForum(modalEditInfo.forum_id);
                                                            window.location.reload();}}>
                                                            Edit
                                                        </EditButtonForum>
                                                        <CancelButtonForum variant="primary" onClick={handleCloseEdit}>
                                                            Cancel
                                                        </CancelButtonForum>
                                                    </Modal.Footer>
                                                </Modal>


                                            </div>
                                            <div className="col-md-1 --forum-info">
                                                {/*Button For Viewing Forum*/}
                                                <div>
                                                    <ViewButtonForum buttonStyle='--btn--primary' onClick={()=> {
                                                        viewForum(forum.forum_id);
                                                        handleShowView();}}>
                                                        View
                                                    </ViewButtonForum>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default ForumLayout;