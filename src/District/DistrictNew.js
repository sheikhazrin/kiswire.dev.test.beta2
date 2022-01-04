/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import FormikControl from '../Formik/Control';

const DistrictNew = (props) => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";

    const datenow = new Date();
    const datenowunix = Moment(datenow).unix();
    const datastandard = Moment(datenow).format('D/MM/YYYY')
    const [pending, setPending] = React.useState(true);
    const [stateValue, setStateValue] = React.useState([]);
    const [formValues, setFormValues] = React.useState({
        districtid: '',
        stateid: '',
        districtname: '',
        isactive: '',
        createdusername: 'edp',
        createddateunix: '',
        createddate: '',
        modifiedusername: 'edp',
        modifieddateunix: '',
        modifydate: '',
    });
    // { "districtid": 1001, "stateid": 1, "districtname": "Johor Bahru", "isactive": 1, "createdusername": "nil", "createddateunix": 1610700052, "createddate": "2021-01-15T16:40:52+08:00", "modifiedusername": "akashaf", "modifieddateunix": 1611406859, "modifydate": "2021-01-23T21:00:59+08:00" }
    const validationSchema = Yup.object({
        districtid: Yup.number().required('Required'),
        districtname: Yup.string().required('Required'),
        stateid: Yup.string().required('Required'),
        isactive: Yup.string().required('Required'),
        // courseDate: Yup.date().required('Required').nullable(),
    });
    const dropdownOptions = [
        { key: 'Select Status', value: '' },
        { key: 'Yes', value: '1' },
        { key: 'No', value: '0' }
    ]
    const onSubmit = (values) => {
        const isdatenow = new Date();
        values.districtid = Number(values.districtid);
        values.isactive = Number(values.isactive);
        values.stateid = Number(values.stateid);
        values.createddate = Moment(isdatenow).format();
        values.modifydate = Moment(isdatenow).format();
        values.createddateunix = Moment(isdatenow).unix();
        values.modifieddateunix = Moment(isdatenow).unix();
        // console.log('form values:', values);
        // console.log('JSON.stringify:values:', JSON.stringify(values));

        setPending(true);
        fetch(`${baseURL}/district`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(res => res.json()).then(json => {
            // alert('Created:' + JSON.stringify(postValues));
            // console.log('RESPONSE:', json);
            if (json.message === 'Your Item already exist') {
                alert("Error: ID already Exit. Try Again")
                props.history.push('/districts');
            } else {
                alert("Successfully Created")
                props.history.push('/districts');
            }
            // alert('LOG:' + JSON.stringify(json))
            setPending(false);
        });
    };

    React.useEffect(() => {
        async function fetchStateData() {
            setPending(true);
            fetch(`${baseURL}/state`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            }).then(res => res.json()).then(json => {
                setStateValue(json);
                setPending(false);
            });

            // axios
            //     .get(stateURL)
            //     .then((response) => {
            //         // console.log(response.data);
            //         setStateValue(response.data);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        }

        fetchStateData();
    }, []);


    return (
        <div className='container-fluid my-4'>
            <div className="card mt-3">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-10'>CREATE NEW DISTRICT</div>
                        <div className='col-2'>
                            <Link to={'/districts'} className="btn btn-sm btn-warning btn-block">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {pending ? <div className='alert alert-primary' role='alert'>Loading</div> : null}
                    <Formik
                        initialValues={formValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        setFieldValue
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className="col-3">
                                            <FormikControl
                                                className="form-control"
                                                control="input"
                                                type="text"
                                                label="Distict ID:"
                                                placeholder="Distict ID"
                                                name="districtid"
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormikControl
                                                className="form-control"
                                                control="input"
                                                type="text"
                                                label="Distict Name:"
                                                placeholder="Distict Name"
                                                name="districtname"
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <FormikControl
                                                control='select'
                                                label='District Status:'
                                                name='isactive'
                                                options={dropdownOptions}
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="stateid">State Name: </label>
                                                <Field
                                                    name="stateid"
                                                    as="select"
                                                    className="form-control"
                                                    disabled={formik.isSubmitting}
                                                >
                                                    <option value="">Select State</option>
                                                    {stateValue.map((value) => (
                                                        <option value={value.stateid} key={value.stateid}>
                                                            {value.statename}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {formik.errors.stateid ? (
                                                    <div className="d-block invalid-feedback">
                                                        {formik.errors.stateid}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <hr />
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            disabled={formik.isSubmitting}
                                        >
                                            Create
                                        </button>
                                    </div>
                                    {/* <button type='reset' className='btn btn-danger' disabled={formik.isSubmitting}>Reset</button> */}
                                </Form>
                            );
                        }}
                    </Formik>

                    {/* <div className="alert alert-secondary mt-2" role="alert">{JSON.stringify(result)}</div> */}


                </div>
            </div>
        </div>
    );
};

export default DistrictNew;