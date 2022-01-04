/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import FormikControl from '../Formik/Control';

const CustomerEdit = (props) => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";

    const datenow = new Date();
    const datenowunix = Moment(datenow).unix();
    const datastandard = Moment(datenow).format('D/MM/YYYY')
    const [pending, setPending] = React.useState(true);
    const [stateValue, setStateValue] = React.useState([]);
    const [districtValue, setDistrictValue] = React.useState([]);
    const [formValues, setFormValues] = React.useState({
        custid: '',
        custname: '',
        mailingaddr1: '',
        mailingaddr2: '',
        mailingaddr3: '',
        mailingstate: '',
        mailingdistrict: '',
        mailingpostcode: '',
        isactive: '',
        createdusername: 'edp',
        createddateunix: '',
        createddate: '',
        modifiedusername: 'edp',
        modifieddateunix: '',
        modifydate: '',
    });
    const validationSchema = Yup.object({
        custid: Yup.number().required('Required'),
        custname: Yup.string().required('Required'),
        mailingaddr1: Yup.string().required('Required'),
        // mailingstate: Yup.string().required('Required'),
        // mailingdistrict: Yup.string().required('Required'),
        mailingpostcode: Yup.number().required('Required'),
        isactive: Yup.string().required('Required'),
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
        fetch(`${baseURL}/customer/${props.match.params.slug}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            formValues.custid = props.match.params.slug;
            formValues.custname = json.custname;
            formValues.mailingaddr1 = json.mailingaddr1;
            formValues.mailingaddr2 = json.mailingaddr2;
            formValues.mailingaddr3 = json.mailingaddr3;
            formValues.mailingstate = json.mailingstate;
            formValues.mailingdistrict = json.mailingdistrict;
            formValues.mailingpostcode = json.mailingpostcode;
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
        values.custid = Number(values.custid);
        values.isactive = Number(values.isactive);
        // values.mailingstate = values.mailingstate;
        // values.mailingdistrict = values.mailingdistrict;
        values.mailingpostcode = Number(values.mailingpostcode);
        values.createddate = Moment(isdatenow).format();
        values.modifydate = Moment(isdatenow).format();
        values.createddateunix = Moment(isdatenow).unix();
        values.modifieddateunix = Moment(isdatenow).unix();
        console.log('form values:', values);
        console.log('JSON.stringify:values:', JSON.stringify(values));

        setPending(true);
        fetch(`${baseURL}/customer`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(res => res.json()).then(json => {
            alert('Updated:' + JSON.stringify(values));
            // console.log('RESPONSE:', json);
            alert("Successfully Updated")
            props.history.push('/customers');
            // alert('LOG:' + JSON.stringify(json))
            setPending(false);
        });
    };

    const [selected, setSelected] = React.useState('');
    const StateHandler = (event) => {
        const { value } = event.target;
        // formValues.mailingstate = value;
        LoadDistrict(value);
        formValues.mailingstate = value;


    }
    // ***** Refresh LoadDistrict
    const LoadDistrict = (stateidvalue) => {
        // console.log('LoadDistrict');
        setPending(true);
        fetch(`${baseURL}/district/state/${stateidvalue}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setDistrictValue(json);
            setPending(false);

        });
    };

    const LoadState = () => {
        setPending(true);

        fetch(`${baseURL}/state`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setStateValue(json);
            setPending(false);

        });
    }
    const LoadAllState = () => {
        setPending(true);

        fetch(`${baseURL}/district`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setDistrictValue(json);
            setPending(false);

        });
    }

    React.useEffect(() => {
        getData();
        LoadState();
        LoadAllState();

    }, []);


    return (
        <div className='container-fluid my-4'>
            <div className="card mt-3">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-10'>EDIT CUSTOMER</div>
                        <div className='col-2'>
                            <Link to={'/customers'} className="btn btn-sm btn-warning btn-block">
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
                                                label="Customer ID:"
                                                placeholder="Customer ID"
                                                name="custid"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormikControl
                                                className="form-control"
                                                control="input"
                                                type="text"
                                                label="Customer Name:"
                                                placeholder="Customer Name"
                                                name="custname"
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <FormikControl
                                                control='select'
                                                label='Customer Status:'
                                                name='isactive'
                                                options={dropdownOptions}
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-12">
                                            <div className='form-group'>
                                                <label htmlFor='mailingaddr1'>Address:</label>
                                                <Field
                                                    name="mailingaddr1"
                                                    as="input"
                                                    className="form-control"
                                                    placeholder="Address#Line1"
                                                    disabled={formik.isSubmitting}
                                                ></Field>
                                                {formik.errors.mailingaddr1 ? (
                                                    <div className="d-block invalid-feedback">
                                                        {formik.errors.mailingaddr1}
                                                    </div>
                                                ) : null}
                                                <Field
                                                    name="mailingaddr2"
                                                    as="input"
                                                    className="form-control"
                                                    placeholder="Address#Line2"
                                                    disabled={formik.isSubmitting}
                                                ></Field>
                                                <Field
                                                    name="mailingaddr3"
                                                    as="input"
                                                    className="form-control"
                                                    placeholder="Address#Line3"
                                                    disabled={formik.isSubmitting}
                                                ></Field>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-3">
                                            <FormikControl
                                                className="form-control"
                                                control="input"
                                                type="text"
                                                label="Postcode:"
                                                placeholder="Postcode"
                                                name="mailingpostcode"
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <FormikControl
                                                className="form-control"
                                                control="input"
                                                type="text"
                                                label="State ID:"
                                                placeholder="State ID"
                                                name="mailingstate"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <label htmlFor="mailingstate">State Name: </label>
                                                <Field
                                                    name="mailingstate"
                                                    as="select"
                                                    className="form-control"
                                                    value={props.value}
                                                    onChange={StateHandler}
                                                    disabled={formik.isSubmitting}
                                                >
                                                    <option value=''>Select State</option>
                                                    {stateValue.map((value) => (
                                                        <option value={value.stateid} key={value.stateid}>
                                                            {value.statename}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {formik.errors.mailingstate ? (
                                                    <div className="d-block invalid-feedback">
                                                        {formik.errors.mailingstate}
                                                    </div>
                                                ) : null}
                                            </div>

                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <label htmlFor="mailingdistrict">District Name: </label>
                                                <Field
                                                    name="mailingdistrict"
                                                    as="select"
                                                    className="form-control"
                                                    disabled={formik.isSubmitting}
                                                >
                                                    <option value="">Select District</option>
                                                    {districtValue.map((value) => (
                                                        <option value={value.districtid} key={value.districtid}>
                                                            {value.districtname}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {formik.errors.mailingdistrict ? (
                                                    <div className="d-block invalid-feedback">
                                                        {formik.errors.mailingdistrict}
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

export default CustomerEdit;