/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import FormikControl from '../Formik/Control';

const InvoiceNew = (props) => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";

    const datenow = new Date();
    const datenowunix = Moment(datenow).unix();
    const datastandard = Moment(datenow).format('D/MM/YYYY')
    const databox = Moment(datenow).format('MM/D/YYYY')
    const [pending, setPending] = React.useState(true);
    const [customerValue, setCustomerValue] = React.useState([]);
    const [formValues, setFormValues] = React.useState({
        invono: '',
        invodate: '',
        lotno: '',
        buildup: '',
        custid: '',
        createdusername: 'edp',
        createddateunix: '',
        createddate: '',
        modifiedusername: 'edp',
        modifieddateunix: '',
        modifydate: '',
        // items: '',
    });
    const validationSchema = Yup.object({
        invono: Yup.number().required('Required'),
        invodate: Yup.date().required('Required'),
        custid: Yup.string().required('Required'),
        // course: Yup.string().required('Required'),
        // courseDate: Yup.date().required('Required').nullable(),
    });
    const dropdownOptions = [
        { key: 'Select Active', value: '' },
        { key: 'Yes', value: '1' },
        { key: 'No', value: '0' }
    ]



    const onSubmit = (values) => {
        const isdatenow = new Date();
        values.invono = Number(values.invono);
        values.custid = Number(values.custid);
        values.buildup = Number(values.buildup);
        
        var ts = Moment(values.invodate, "MM/DD/YYYY").unix();
        var m = Moment.unix(ts);

        values.invodate = m;
        console.log(values.invodate)

        values.createddate = Moment(isdatenow).format();
        values.modifydate = Moment(isdatenow).format();
        values.createddateunix = Moment(isdatenow).unix();
        values.modifieddateunix = Moment(isdatenow).unix();
        console.log('form values:', values);
        console.log('JSON.stringify:values:', JSON.stringify(values))

        setPending(true);
        fetch(`${baseURL}/invoice`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(res => res.json()).then(json => {
            // alert('Created:' + JSON.stringify(values));
            console.log('RESPONSE:', json);
            if (json.message === 'Your Item already exist') {
                alert("Error: ID already Exit. Try Again");
                props.history.push('/invoices');
            } else {
                alert("Successfully Created");
                props.history.push('/invoice/' + json.invono);
            }
            // alert('LOG:' + JSON.stringify(json))
            setPending(false);
        });
    };

    const getCustomer = () => {
        setPending(true);
        fetch(`${baseURL}/customer`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setCustomerValue(json);
            setPending(false);
        });
    }
    React.useEffect(() => {
        getCustomer();
    }, []);

    return (
        <div className='container-fluid my-4'>
            <div className="card mt-3">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-10'>CREATE NEW INVOICE</div>
                        <div className='col-2'>
                            <Link to={'/invoices'} className="btn btn-sm btn-warning btn-block">
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
                                                label="Invoice No:"
                                                placeholder="Invoice No"
                                                name="invono"
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                        <div className="col-6">

                                            <div className="form-group">
                                                <label htmlFor="custid">Customer: </label>
                                                <Field
                                                    name="custid"
                                                    as="select"
                                                    className="form-control"
                                                    disabled={formik.isSubmitting}
                                                >
                                                    <option value="">Select Customer</option>
                                                    {customerValue.map((value) => (
                                                        <option value={value.custid} key={value.custid}>
                                                            {value.custname}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {formik.errors.custid ? (
                                                    <div className="d-block invalid-feedback">
                                                        {formik.errors.custid}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <FormikControl
                                                control='date'
                                                label='Invoice Date:'
                                                name='invodate'
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-6">
                                            <FormikControl
                                                className="form-control"
                                                control="input"
                                                type="text"
                                                label="Lot No:"
                                                placeholder="Lot No"
                                                name="lotno"
                                                disabled={formik.isSubmitting}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormikControl
                                                className="form-control"
                                                control="input"
                                                type="text"
                                                label="Build Up:"
                                                placeholder="Build Up"
                                                name="buildup"
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

export default InvoiceNew;