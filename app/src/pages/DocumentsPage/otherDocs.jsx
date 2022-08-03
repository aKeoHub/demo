import React, {useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {  saveAs } from 'file-saver';
import DocModal from './docModal'

const OtherDocs = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({});
    const [docId, setDocId] = useState(0);
    const [docCat, setDocCat] = useState(0);
    const [creatorId, setCreatorId] = useState(0);
    const [docName, setDocName] = useState("");
    const [dateCreated, setDateCreated] = useState({varOne: new Date()});
    const [textarea, setTextarea] = useState("");
    const [file, setFile] = useState();
    const [downloadLink, setDownloadLinks] = useState([]);
    const [downloadUrl, setDownloadUrl] = useState('');
    const input = document.getElementById('fileUpload');
    const token = localStorage.getItem("accessToken");
    const username = (localStorage.getItem('username'));
    const [user, setUser] = useState('');
    let blob = new Blob([], {
        type: "text/plain;charset=utf-8"
    });
// const GetDownloadUrl = (fileName) => {
    //     const config = {
    //         headers: {Authorization: `Bearer ${token}`},
    //     };
    //     return axios.get("/api/v1/downloadFile/" + fileName, config)
    //         .then(function (response) {
    //             console.log(response.data);
    //             setDownloadUrl(response.data)
    //             //console.log(user)
    //         })
    // }

    const getDownloadUrl = (fileName) => {
        fetch('api/v1/downloadFile/' + fileName, {
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    fileName,
                );
                console.log(link)
                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }
    useEffect(() => {
        setLoading(true);
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
            })

        fetch('api/v1/documents/all', {
            headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
        })
            .then(response => response.json())
            .then(data => {
                setDocuments(data);
                setLoading(false);
            })

        fetch('api/v1/files', {
            headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setDownloadLinks(data);
                //console.log(downloadLink.find((x => x.name === 'CMPS369Lab8MemoryUsage%20(1).pdf')))
                setLoading(false);
            })

    }, []);


         if (loading) {
             return <p>Loading...</p>;
         }

        const fetchFile = () => {
        // Get all the current files and there URLS
        fetch('api/v1/files', {
            headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
        })
            .then(response => response.blob())
            .then(blob => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `FileName.pdf`,
                );


                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);


                //console.log(blob)
                //setDownloadLinks(data);
                //console.log(downloadLink.find((x => x.name === 'CMPS369Lab8MemoryUsage%20(1).pdf')))
                //setLoading(false);
            })

    }

     function deleteDocument(id) {
         fetch('api/v1/documents/delete/' + id,{
             method:'DELETE',
             headers: {
                 "Content-type": "application/json; charset=UTF-8"
            }}).then(response => response.json())
            .then(data => {
                setLoading(false);
                console.log(data);
                window.location.reload();
            })
     }

    function updateDocument(did, cid, dname, date, desc, file) {
        fetch('api/v1/documents/edit/' + did)
    }

         const getFileFromList = (id) => {
             {downloadLink.map(link => link =>
                 <div key={link.id}>
                     <table class="urlTable">
                         <tr>
                             <td>{link.fileId}</td>
                             <td>{link.name}</td>
                             <td>{link.url}</td>
                         </tr>
                     </table>
                 </div>
             )}
         }
         // blob = downloadUrl;
         // const downloadFile = saveAs(blob, "");

         return (
         <>
                <DocModal />
             <div className="mx-auto mb-5 px-5 py-5" style={{width: "1070px", background: "#E8F8F5"}}>
                <h1 className="text-left text-success mb-4">Documents</h1>
                    <div className="table-responsive">
                         <table className="table">
                             <tr className="bg-primary text-white">
                                 <th style={{width: "9%"}}>Doc_id</th>
                                 <th style={{width: "9%"}}>Doc_Cat</th>

                                 <th style={{width: "16%"}}>Doc_name</th>
                                 <th style={{width: "16%"}}>Date_created</th>
                                 <th style={{width: "18%"}}>Description</th>
                                 <th style={{width: "12%"}}>File</th>
                                 <th style={{width: "8%"}}>Delete</th>
                                 <th style={{width: "8%"}}>Edit</th>
                             </tr>
                         </table>
                         {documents.map(park_document =>

                             <div>
                                <table className="table">
                                     <tr>
                                         <td style={{width: "9%"}}>{park_document.document_id}</td>
                                         <td style={{width: "9%"}}>{park_document.document_category}</td>
                                         <td style={{width: "16%"}}><span id={park_document.document_name}>{park_document.document_name}</span><input id={park_document.document_id} type="text" style={{display: "none", width: "67%"}} /></td>
                                         <td style={{width: "16%"}}>{park_document.create_date}</td>
                                         <td style={{width: "18%"}}><span id={park_document.description}>{park_document.description}</span><input id={park_document.document_id+"a"} type="text" style={{display: "none", width: "67%"}} /></td>
                                         <td style={{width: "12%"}}>{downloadLink.map(link =>
                                             <a href={link.url}>Download</a>
                                         )}</td>

                                         {/*<td style={{width: "12%"}}><a href={downloadLink.find(element => element.fileId === 0)} >Link</a></td>*/}
                                         <td>
                                         <Button onClick={()=>deleteDocument(park_document.document_id)} style={{width: "8%"}}><FontAwesomeIcon icon={faTrash} /></Button>
                                         </td>
                                         <td id={park_document.id+"c"}>
                                         <Button id={park_document.id+"b"} style={{display: "block"}}
                                         onClick={()=>{document.getElementById(park_document.id+"a").style.display="block"; document.getElementById(park_document.id).style.display="block";
                                         document.getElementById(park_document.documentName).style.display="none"; document.getElementById(park_document.description).style.display="none";
                                         document.getElementById(park_document.id+"b").style.display="none"; let btn=document.createElement("button"); btn.innerText="SAVE";
                                         document.getElementById(park_document.id+"c").appendChild(btn); btn.setAttribute("onclick", updateDocument(park_document.id, park_document.creatorId, document.getElementById(park_document.id).value,
                                         park_document.createDate, document.getElementById(park_document.id+"a").value, park_document.file)); }}
                                         style={{width: "8%"}}><FontAwesomeIcon icon={faEdit} /></Button>
                                         </td>
                                     </tr>
                                </table>
                             </div>
                         )}


                        {downloadLink.map(link => link.url

                        )}
                        {/*blob = {downloadLink.map(link =>*/}
                        {/*    GetDownloadUrl(link.name)*/}
                        {/*)};*/}

                        {/*{downloadLink.map(link =>*/}
                        {/*    <div key={link.id}>*/}
                        {/*        <table class="urlTable">*/}
                        {/*            <tr>*/}
                        {/*                <td>{link.fileId}</td>*/}
                        {/*                <td>{link.name}</td>*/}
                        {/*                <td>{link.url}</td>*/}
                        {/*            </tr>*/}
                        {/*        </table>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    <Button style={{display:"block", marginLeft:"84%", marginTop:"4%"}}>Add document</Button>
                  </div>
             </div>
             </>
         );
     }

export default OtherDocs;