import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormSwitch,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import axios from "axios";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { v4 } from "uuid";
const url = 'https://yog-api.herokuapp.com'

const GalleryMaster = () => {
    const [action1, setAction1] = useState(false)
    const [galleryType, setGalleryType] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [url1, setUrl1] = useState('')
    const [imageUrls, setImageUrls] = useState([]);
    const [progress, setProcess] = useState()

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const [result1, setResult1] = useState([]);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    const imagesListRef = ref(storage, "galleryMaster/");
    useEffect(() => {
        getGallery()
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);
    function getGallery() {

        axios.get(`${url}/galleryMaster/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setResult1(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function createGallery() {
        if (galleryType === 'Image') {

            const uploadTask = ref(storage, `galleryMaster/${image.name + v4()}`);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progrss function ....
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProcess(progress);
                },
                (error) => {
                    // error function ....
                    console.log(error);
                },
                () => {
                    // complete function ....
                    storage.ref('galleryMaster').child(image.name).getDownloadURL().then(url => {
                        console.log(url);
                        setImageUrl(url)
                    })
                });
            const data = {
                username: username,
                Name: name,
                galleryType,
                Description: description,
                image: imageUrl,
            }
            axios.post(`${url}/galleryMaster/create`, data, { headers })
                .then((resp) => {
                    console.log(resp.data)
                    alert('Successfully Added')
                    getGallery()
                    setAction1(false)
                    setName('')
                    setDescription('')
                })
                .catch((error) => console.log(error))

        } else {

            const data = {
                username: username,
                Name: name,
                galleryType,
                Description: description,
                url: url1,
            }
            axios.post(`${url}/galleryMaster/create`, data, { headers })
                .then((resp) => {
                    console.log(resp.data)
                    alert('Successfully Added')
                    getGallery()
                    setAction1(false)
                    setName('')
                    setDescription('')
                })
                .catch((error) => console.log(error))
        }

    }
    const handleImage = (e) => {
        if (e.target.files[0]) {
            const image1 = e.target.files[0];
            setImage(image1)
        }
    }

    function deleteData(id) {
        if (confirm('You want to delete this')) {
            fetch(`${url}/galleryMaster/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getGallery()
                })
            })
        }
        return
    }


    return (
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Gallery Master</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <div>
                            <CRow>
                                <CCol>
                                    <CButton className="ms-1 mt-2" onClick={() => setAction1(!action1)}>{action1 ? 'close' : 'Add Gallery'}</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    </div>
                    {action1 &&
                        <div>
                            <CRow className='mt-3'>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                        label="Gallery"
                                        value={galleryType}
                                        onChange={(e) => setGalleryType(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Url">Instagram Url</option>
                                        <option value="Url">Facebook Url</option>
                                        <option value="Url">Youtube Url</option>
                                        <option value="Image">Trainer Image</option>
                                        <option value="Image">Center Image</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Name"
                                    />
                                </CCol>
                                <CCol lg={12} md={12} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        label="Description"
                                        placeholder="Enter Description"
                                    />
                                </CCol>
                                <CCol lg={12} md={12} sm={12}>
                                    {galleryType === 'Image' &&
                                        <CFormInput
                                            className="mb-1 mr-3"
                                            type="file"
                                            onChange={handleImage}
                                            accept="image/*"
                                        />
                                    }
                                    {galleryType === 'Url' &&
                                        < CFormInput
                                            className="mb-1"
                                            type="url"
                                            id="exampleFormControlInput1"
                                            value={url1}
                                            onChange={(e) => setUrl1(e.target.value)}
                                            label="Url"
                                            placeholder="Enter Url"
                                        />
                                    }
                                </CCol>
                                <CCol className="mt-2" lg={6} md={6} sm={12}>
                                    <CButton className="mt-2" onClick={() => createGallery()}>Save</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    }
                </CForm>
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Date</CTableHeaderCell>
                            <CTableHeaderCell>Name</CTableHeaderCell>
                            <CTableHeaderCell>Gallery Type</CTableHeaderCell>
                            <CTableHeaderCell>Description</CTableHeaderCell>
                            <CTableHeaderCell>Url</CTableHeaderCell>
                            <CTableHeaderCell>Image</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {result1.filter((list) => list.username === username).map((item, index) => (
                            item.username === username && (
                                <CTableRow key={index}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{moment(item.createdAt).format("MM-DD-YYYY")}</CTableDataCell>
                                    <CTableDataCell className="text-center">{item.Name}</CTableDataCell>
                                    <CTableDataCell>{item.galleryType}</CTableDataCell>
                                    <CTableDataCell>{item.Description}</CTableDataCell>
                                    <CTableDataCell><a href={item.url} target='_blank'>{item.url}</a></CTableDataCell>
                                    <CTableDataCell>{item.image != null &&
                                        <img width='100px' src={item.image} />
                                    }
                                    </CTableDataCell>
                                    <CTableDataCell><MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => deleteData(item._id)} size='20px' /></CTableDataCell>
                                </CTableRow>
                            )
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    );
};

export default GalleryMaster;