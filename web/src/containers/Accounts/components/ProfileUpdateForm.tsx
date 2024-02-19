import React, { useState } from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import { getAccessToken } from '../../../accessToken';
import { useUpdateUserDetailsMutation, MeDocument, MeQuery, useMeQuery } from '../../../generated/graphql';
import axios from "axios";
import { toastify } from '../../../components/Toastify';
import useForm from "./actions/useForm";
import validate from "./validate";
import moment from "moment-timezone";
import Select from 'react-select';

interface Props { }

export const ProfileUpdateForm: React.FC<Props> = () => {
    const { data, loading } = useMeQuery();
    const timelist: any = moment.tz.names();

    let timeZone: any = [];

    timelist.forEach((element: string) => {
        timeZone.push(
            {
                'label': element,
                'value': element
            }
        );
    });

    let pic: any = '';
    if (loading) {
        pic = null;
    } else if (data && data?.me?.profile_image) {
        pic = `${process.env.REACT_APP_HOST + '/images/' + data?.me?.profile_image}`;
    }

    const [image, setImage] = useState({
        preview: pic ? pic : "",
        raw: ""
    });


    const accessToken = getAccessToken();
    const [updateUserDetails] = useUpdateUserDetailsMutation();

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleDropdown
    } = useForm(UpdateUser, validate);

    async function UpdateUser(values: any) {
        const data = {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            time_zone: values.time_zone
        };

        try {
            const response = await updateUserDetails({
                variables: {
                    token: accessToken,
                    data: data
                },
                update: (store, { data }) => {
                    if (!data) {
                        return null;
                    }

                    store.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            me: data.updateUserDetails.user
                        }
                    })
                }
            });
            if (response && response.data?.updateUserDetails) {
                toastify(200, `Successfully saved!`);
            }
        } catch (err) {

        }
    }

    const handleChangeFile = (e: any) => {
        const {
            target: {
                files: [file],
            }
        } = e;
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: file
            });
        }
    };

    const handleUpload = async () => {
        if (image.preview) {
            const formData = new FormData();
            formData.append("file", image.raw);

            try {
                const response = await axios.post(`${process.env.REACT_APP_HOST}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    },
                });

                if (response) {
                    return toastify(200, `Successfully saved!`);
                }

            } catch (err) {
                console.log(err);
            }
        }
    }

    let valueZone: string = values.time_zone ? values.time_zone : '';

    return (
        <Col md={12} lg={12} xl={9}>
            <Card>
                <CardBody>
                    <div className="card__title">
                        <h5 className="bold-text">Profile Information</h5>
                    </div>
                    <form className="form form" onSubmit={handleSubmit} noValidate>
                        <div style={{ display: "flex" }}>
                            <Col md={4}>
                                <Row>
                                    <div className="" style={{ padding: 10 }}>
                                        <span className="bold-text">Email</span>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="" style={{ padding: 10 }}>
                                        <span className="bold-text">First name</span>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="" style={{ padding: 10 }}>
                                        <span className="bold-text">Last name</span>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="" style={{ paddingLeft: 10, paddingTop: 15 }}>
                                        <span className="bold-text">Time Zone</span>
                                    </div>
                                </Row>
                                <Row style={{ display: "flex", marginTop: 50 }}>
                                    <ButtonToolbar className="form__button-toolbar">
                                        <Button color="primary" type="submit">Save</Button>
                                    </ButtonToolbar>
                                </Row>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <div className="" style={{ padding: 5 }}>
                                        <input
                                            autoComplete="off"
                                            className={`input ${errors.email && 'is-danger'}`}
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            onChange={handleChange}
                                            value={values.email || ''}
                                            style={{ backgroundColor: '#F6F6F6' }}
                                            required
                                        />
                                        {errors.email && (
                                            <p className="help is-danger" style={{ fontSize: "0.8em" }}>{errors.email}</p>
                                        )}
                                    </div>
                                </Row>
                                <Row>
                                    <div className="" style={{ padding: 5 }}>
                                        <input
                                            className={`input ${errors.first_name && 'is-danger'}`}
                                            name="first_name"
                                            value={values.first_name || ''}
                                            style={{ backgroundColor: '#F6F6F6' }}
                                            placeholder="Enter first name"
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.first_name && (
                                            <p className="help is-danger" color="danger" style={{ fontSize: "0.8em" }}>{errors.first_name}</p>
                                        )}
                                    </div>
                                </Row>
                                <Row>
                                    <div className="" style={{ padding: 5 }}>
                                        <input
                                            className={`input ${errors.last_name && 'is-danger'}`}
                                            name="last_name"
                                            value={values.last_name || ''}
                                            style={{ backgroundColor: '#F6F6F6' }}
                                            placeholder="Enter last name"
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.last_name && (
                                            <p className="help is-danger" color="danger" style={{ fontSize: "0.8em" }}>{errors.last_name}</p>
                                        )}
                                    </div>
                                </Row>
                                <Row>
                                    <Select
                                        onChange={handleDropdown}
                                        defaultValue={{ label: valueZone, value: valueZone }}
                                        className="profile__basic-single"
                                        options={timeZone}
                                    />
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row>
                                    <div style={{
                                        backgroundColor: image.preview ? '' : '#C0C0C0',
                                        width: 190, height: 190, borderRadius: 300 / 2,
                                        marginTop: -50
                                    }}>
                                        <label htmlFor="upload-button">
                                            {image.preview ? (
                                                <img src={image.preview} alt="dummy" style={{ width: 190, height: 190, borderRadius: 300 / 2 }} />
                                            ) : (
                                                    <>
                                                        <span className="fa-stack fa-2x mt-3 mb-2">
                                                            <i className="fas fa-circle fa-stack-2x" />
                                                            <i className="fas fa-store fa-stack-1x fa-inverse" />
                                                        </span>
                                                        <h5 className="text-center upload_text"
                                                            style={{ width: 190, height: 190 }}
                                                        >Upload your photo</h5>
                                                    </>
                                                )}
                                        </label>
                                        <input
                                            type="file"
                                            id="upload-button"
                                            style={{ display: "none" }}
                                            onChange={handleChangeFile}
                                            className="profile__center_content"
                                        />
                                    </div>
                                </Row>
                                <Row >
                                    <Button
                                        color="primary"
                                        onClick={handleUpload}
                                        style={{ marginTop: 10, height: 40, marginLeft: 25 }}
                                    >
                                        Upload Photo
                                        </Button>
                                </Row>
                            </Col>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </Col >
    )
}
