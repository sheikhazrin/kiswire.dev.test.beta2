/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DataTable from 'react-data-table-component';

import FormikControl from '../Formik/Control';
import { BiTrashAlt, BiAddToQueue } from "react-icons/bi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const InvoiceEdit = (props) => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";

    const datenow = new Date();
    const datenowunix = Moment(datenow).unix();
    const datastandard = Moment(datenow).format('D/MM/YYYY')
    const databox = Moment(datenow).format('MM/D/YYYY')
    const [pending, setPending] = React.useState(true);
    const [customerValue, setCustomerValue] = React.useState([]);
    const [invoiceItemValue, setInvoiceItemValue] = React.useState([]);

    const [formValues, setFormValues] = React.useState({
        invono: '',
        invodate: '',
        lotno: '',
        buildup: '',
        custid: '',
        createdusername: '',
        createddateunix: '',
        createddate: '',
        modifiedusername: '',
        modifieddateunix: '',
        modifydate: '',
        // items: '',
    });
    // { "invono": 1, "invoseq": 1, "itemdesc": "Service Charges - January 2021", "duedate": 1610363194, "amountrm": 35, "createdusername": "adib", "createddateunix": 1610363194, "createddate": "2021-01-11T19:06:34+08:00", "modifiedusername": "adib", "modifieddateunix": 1610363194, "modifydate": "2021-01-11T19:06:34+08:00" }
    const [formitemValues, setFormItemValues] = React.useState({
        invono: '',
        invoseq: '',
        itemdesc: '',
        duedate: '',
        amountrm: '',
        createdusername: 'edp',
        createddateunix: datenowunix,
        createddate: datastandard,
        modifiedusername: 'edp',
        modifieddateunix: datenowunix,
        modifydate: datastandard,
        // items: '',
    });
    const validationSchema = Yup.object({
        invono: Yup.number().required('Required'),
        invodate: Yup.date().required('Required'),
        custid: Yup.string().required('Required'),
        // course: Yup.string().required('Required'),
        // courseDate: Yup.date().required('Required').nullable(),
    });
    const validationSchemaitem = Yup.object({
        invoseq: Yup.number().required('Required'),
        itemdesc: Yup.string().required('Required'),
        amountrm: Yup.number().required('Required'),
        // course: Yup.string().required('Required'),
        // courseDate: Yup.date().required('Required').nullable(),
    });
    const dropdownOptions = [
        { key: 'Select Active', value: '' },
        { key: 'Yes', value: '1' },
        { key: 'No', value: '0' }
    ]

    const getData = () => {
        console.log(props.match.params.slug);
        setPending(true);
        fetch(`${baseURL}/invoice/${props.match.params.slug}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            formValues.invono = props.match.params.slug;
            formValues.invodate = json.invodate;
            formValues.lotno = json.lotno;
            formValues.buildup = json.buildup;
            formValues.custid = json.custid;
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
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(res => res.json()).then(json => {
            // alert('Created:' + JSON.stringify(values));

            alert("Successfully Updated");
            // props.history.push('/invoice/' + json.invono);

            // alert('LOG:' + JSON.stringify(json))
            setPending(false);
        });
    };

    const onSubmitItem = (valuesItem) => {
        const isdatenow = new Date();
        valuesItem.invono = Number(props.match.params.slug);
        valuesItem.invoseq = Number(valuesItem.invoseq);
        valuesItem.amountrm = Number(valuesItem.amountrm);

        valuesItem.duedate = Moment(isdatenow).unix();
        valuesItem.createddate = Moment(isdatenow).format();
        valuesItem.modifydate = Moment(isdatenow).format();
        valuesItem.createddateunix = Moment(isdatenow).unix();
        valuesItem.modifieddateunix = Moment(isdatenow).unix();
        console.log('form valuesItem:', valuesItem);
        console.log('JSON.stringify:valuesItem:', JSON.stringify(valuesItem))

        setPending(true);
        fetch(`${baseURL}/invoiceitem`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(valuesItem)
        }).then(res => res.json()).then(json => {
            // alert('Created:' + JSON.stringify(postValues));
            // console.log('RESPONSE:', json);
            if (json.message === 'Your Item already exist') {
                alert("Error: ID already Exit. Try Again")
            } else {
                alert("Successfully Created")
                getInvoiceItem();
                valuesItem.invoseq = '';
                valuesItem.itemdesc = '';
                valuesItem.amountrm = '';
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

    const columns = [
        {
            name: 'Seq No',
            selector: (row) => row.invoseq,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row) => row.itemdesc,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: (row) => row.amountrm,
            sortable: true,
            // cell: (row) => seachStateName(row.stateid, resultState),
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <>

                    <button
                        title='Delete'
                        onClick={() => deleteSubmitItem(row.invoseq)}
                        className="btn btn-danger btn-sm"
                    >
                        <BiTrashAlt />
                    </button>
                </>
            ),
        },
    ];

    const delData = (id) => {

        setPending(true);
        fetch(`${baseURL}/invoiceitem/${props.match.params.slug}/${id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log('RESPONSE:', res);
            alert('Successfully Deleted')

            getInvoiceItem();
        });
    }

    const deleteSubmitItem = (deleteID) => {
        confirmAlert({
            title: 'Confirm to Delete ',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // setPending(true);
                        delData(deleteID);
                    },
                },
                {
                    label: 'No',
                    onClick: () => {
                        // alert('Click Yes');
                    },
                },
            ],
        });
    };
    //
    const getInvoiceItem = () => {
        setPending(true);
        fetch(`${baseURL}/invoiceitem/invoiceno/${props.match.params.slug}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setInvoiceItemValue(json);
            setPending(false);
        });
    }
    React.useEffect(() => {
        getCustomer();
        getData();
        getInvoiceItem();
    }, []);

    return (
        <div className='container-fluid my-4'>
            <div className="card mt-3">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-10'>EDIT INVOICE</div>
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
                                                disabled
                                            />
                                        </div>
                                        <div className="col-6">

                                            <div className="form-group">
                                                <label htmlFor="custid">Customer: </label>
                                                <Field
                                                    name="custid"
                                                    as="select"
                                                    className="form-control"
                                                    disabled
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
                                                disabled
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
                                                disabled
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
                                                disabled
                                            />
                                        </div>
                                        {/* <div className="col-2">
                                            <label></label>
                                            <div className='form-group'>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div> */}
                                    </div>

                                    {/* <button type='reset' className='btn btn-danger' disabled={formik.isSubmitting}>Reset</button> */}
                                </Form>
                            );
                        }}
                    </Formik>

                    <div className="card mt-3">
                        <div className="card-header">
                            <Formik
                                initialValues={formitemValues}
                                validationSchema={validationSchemaitem}
                                onSubmit={onSubmitItem}
                                setFieldValue
                            >

                                {(formik) => {
                                    return (
                                        <Form>
                                            <div><h6>LIST OF ITEM/S</h6></div>
                                            <div className='row'>
                                                <div className='col-2'>
                                                    <FormikControl
                                                        className="form-control input-sm"
                                                        control="input"
                                                        type="text"
                                                        placeholder="Seq No"
                                                        name="invoseq"

                                                    />
                                                </div>
                                                <div className='col-6'>
                                                    <FormikControl
                                                        className="form-control input-sm"
                                                        control="input"
                                                        type="text"
                                                        placeholder="Description"
                                                        name="itemdesc"

                                                    />
                                                </div>
                                                <div className='col-3'>
                                                    <FormikControl
                                                        className="form-control input-sm"
                                                        control="input"
                                                        type="text"
                                                        placeholder="Amount(RM)"
                                                        name="amountrm"

                                                    />
                                                </div>
                                                <div className='col-1'>
                                                    <div className='form-group'>
                                                        <br />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-info btn-block"
                                                            title="Add Items"
                                                        ><BiAddToQueue />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <button type='reset' className='btn btn-danger' disabled={formik.isSubmitting}>Reset</button> */}
                                        </Form>
                                    );
                                }}

                            </Formik>
                        </div>
                        <div className="card-body">
                            <DataTable
                                columns={columns}
                                data={invoiceItemValue}
                                noHeader
                                defaultSortField="invoseq"
                                defaultSortAsc={false}
                                pagination
                                highlightOnHover
                                // expandableRows
                                // expandableRowsComponent={ExpandedComponent}
                                progressPending={pending}
                                dense
                            />
                        </div>
                    </div>
                    {/* <div className="alert alert-secondary mt-2" role="alert">{JSON.stringify(result)}</div> */}


                </div>
            </div>
        </div>
    );
};

export default InvoiceEdit;