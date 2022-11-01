import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CForm, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CImage, CRow } from '@coreui/react'
import React from 'react'
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'

const ApplicationForm = () => {
    return (
        <CCard>
            <CCardHeader>
                <CCardTitle>Recruitment Application</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm>
                    <CRow>
                        <CCol lg={3} sm={6} className='mt-2 mb-1' >
                            <CImage className="mb-1" style={{ borderRadius: "100px" }} width={'200px'} src={ProfileIcon} />
                        </CCol>
                        <CCol lg={8} sm={6} className='mt-5'>
                            <CRow>
                                <CButton className="me-3 ms-3" style={{ margin: '5px', width: '200px' }}>Upload Image</CButton>
                            </CRow>
                            <CRow>
                                <CButton className="me-3 ms-3" style={{ margin: '5px', width: '200px' }}>Capture Image</CButton>
                            </CRow>
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                id="exampleFormControlInput1"
                                label="Full name"
                                placeholder="Enter Name"
                            />
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                id="exampleFormControlInput1"
                                label="Contact Number"
                                placeholder="Enter Contact Number"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CFormInput
                                className="mb-1"
                                type="email"
                                id="exampleFormControlInput1"
                                label="Email address"
                                placeholder="name@example.com"
                                text="Must be 8-20 characters long."
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CCol>
                        <CCol>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Currency"
                                label="Gander"
                                options={[
                                    "Select Gender",
                                    { label: "Male", value: "1" },
                                    { label: "Female", value: "2" },
                                ]}
                            />
                        </CCol>
                    </CRow>
                    <CCol>
                        <CFormTextarea
                            id="exampleFormControlTextarea1"
                            label="Address"
                            rows="2"
                            text="Must be 8-20 words long."
                        ></CFormTextarea>
                    </CCol>
                    <CRow>
                        <CCol>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                id="exampleFormControlInput1"
                                label="Age"
                                placeholder="Enter Your Age"
                            />
                        </CCol>
                        <CCol>
                            <CFormInput
                                className="mb-1"
                                type="file"
                                id="exampleFormControlInput1"
                                label="Upload Resume"
                                placeholder="Enter Upload Resume"
                            />
                        </CCol>
                    </CRow>

                    <CRow>

                        <CCol xs={4}>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Job Designation"
                                label="Job Designation"
                                options={[
                                    "Select Job Designation",
                                    { label: "+91", value: "1" },
                                    { label: "Two", value: "2" },
                                    { label: "Three", value: "3" },
                                ]}
                            />
                        </CCol>
                        <CCol xs={4}>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Job Designation"
                                label="Department"
                                options={[
                                    "Select Department",
                                    { label: "+91", value: "1" },
                                    { label: "Two", value: "2" },
                                    { label: "Three", value: "3" },
                                ]}
                            />
                        </CCol>
                        <CCol xs={4}>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                id="exampleFormControlInput1"
                                label="Exp Salary"
                                placeholder="Enter Exp Salary"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Employee Category"
                                label="Employee Category"
                                options={[
                                    "Select Employee Category",
                                    { label: "Employee", value: "1" },
                                    { label: "Consultant", value: "2" },
                                ]}
                            />
                        </CCol>
                        <CCol>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Payout Type"
                                label="Source"
                                options={[
                                    "Select Payout Type",
                                    { label: "Employee", value: "1" },
                                    { label: "Consultant", value: "2" },
                                ]}
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={3}>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Grade"
                                label="Grade"
                                options={[
                                    "Select Grade",
                                    { label: "Employee", value: "1" },
                                    { label: "Consultant", value: "2" },
                                ]}
                            />
                        </CCol>
                        <CCol>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                id="exampleFormControlInput1"
                                label="Comments"
                                placeholder="Add Comments"
                            />
                        </CCol>
                    </CRow>

                    <CButton className="mt-2">Save</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default ApplicationForm
