/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
//
import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/Control';
import { Alert } from 'bootstrap';

const StateEdit = (props) => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";

    const datenow = new Date();
    const datenowunix = Moment(datenow).unix();
    const datastandard = Moment(datenow).format('D/MM/YYYY')
    const [pending, setPending] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [stateGet, setStateGet] = React.useState([]);
    const [newId, setNewID] = React.useState();

    const [formValues, setFormValues] = React.useState({
        stateid: '',
        statename: '',
        isactive: '',
        createdusername: '',
        createddateunix: '',
        createddate: '',
        modifiedusername: '',
        modifieddateunix: '',
        modifydate: '',
        // districts: '',
    });
    const validationSchema = Yup.object({
        stateid: Yup.number().required('Required'),
        statename: Yup.string().required('Required'),
        isactive: Yup.string().required('Required'),
        // course: Yup.string().required('Required'),
        // courseDate: Yup.date().required('Required').nullable(),
    });
    const dropdownOptions = [
        { key: 'Select Status', value: '' },
        { key: 'Yes', value: '1' },
        { key: 'No', value: '0' }
    ]

    const getData = () => {
        // console.log(props.match.params.slug);
        setPending(true);
        fetch(`${baseURL}/state/${props.match.params.slug}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            formValues.stateid = props.match.params.slug;
            formValues.statename = json.statename;
            formValues.isactive = json.isactive;
            formValues.createdusername = json.createdusername;
            formValues.createddateunix = json.createddateunix;
            formValues.createddate = json.createddate;
            formValues.modifiedusername = json.modifiedusername;
            formValues.modifieddateunix = json.modifieddateunix;
            formValues.modifydate = json.modifydate;
            setPending(false);
        });


    }

    const onSubmit = (values) => {
        const isdatenow = new Date();
        values.stateid = Number(values.stateid);
        values.isactive = Number(values.isactive);
        values.modifieddateunix = Moment(isdatenow).unix();
        values.modifydate = Moment(isdatenow).format();
        values.modifiedusername = 'sheikhazrin';
        // console.log('form values:', values);
        // console.log('JSON.stringify:values:', JSON.stringify(values));

        setPending(true);
        fetch(`${baseURL}/state`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(res => res.json()).then(json => {
            // alert('Created:' + JSON.stringify(values));
            // console.log('RESPONSE:', json);
            alert("Successfully Updated")
            props.history.push('/states');

            setPending(false);
        });


    };

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <div className='container-fluid my-4'>
            <div className="card mt-3">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-10'>EDIT STATE</div>
                        <div className='col-2'>
                            <Link to={'/states'} className="btn btn-sm btn-warning btn-block">
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
                                                label="State ID:"
                                                placeholder="State ID"
                                                name="stateid"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormikControl
                                                className="form-control"
                                                control="input"
                                                type="text"
                                                label="State Name:"
                                                placeholder="State Name"
                                                name="statename"
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <FormikControl
                                                control='select'
                                                label='State Status:'
                                                name='isactive'
                                                options={dropdownOptions}
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                    </div>


                                    <div className='form-group'>
                                        <hr />
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            disabled={formik.isSubmitting}
                                        >
                                            Update
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

export default StateEdit;