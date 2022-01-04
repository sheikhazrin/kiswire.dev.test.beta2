/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BiEdit, BiTrashAlt } from "react-icons/bi";


const InvoiceList = (props) => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";
    const [result, setResult] = React.useState();
    const [filteredResults, setFilteredResults] = React.useState();
    const [pending, setPending] = React.useState(true);
    const [searchInput, setSearchInput] = React.useState('');

    const getAllData = () => {
        fetch(`${baseURL}/invoice`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setResult(json);
            setFilteredResults(json);
            setPending(false);
        });
    }
    const delData = (id) => {
        fetch(`${baseURL}/invoiceitem/invoiceno/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(() => {
            alert('Delete Item successful');
            getAllData();
        });
        fetch(`${baseURL}/invoice/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(() => {
            alert('Delete Invoice successful');
            getAllData();
        });
    }
    React.useEffect(() => {
        getAllData()
    }, []);
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        const filteredData = result.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData);
    }
    // { "invono": 1, "invodate": 1610363313, "lotno": "", "buildup": 0, "custid": 1, "createdusername": "adib", "createddateunix": 1610363313, "createddate": "2021-01-11T19:08:33+08:00", "modifiedusername": "akashaf", "modifieddateunix": 1611164306, "modifydate": "2021-01-21T01:38:26+08:00", "items": null },
    const columns = [
        {
            name: 'Id',
            selector: (row) => row.invono,
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row) => Moment(row.invodate).format('D/MM/YYYY'),
            sortable: true,
        },
        {
            name: 'Lot No',
            selector: (row) => row.lotno,
            sortable: true,
        },
        {
            name: 'Build Up',
            selector: (row) => row.buildup,
            sortable: true,
        },
        {
            name: 'Customer',
            selector: (row) => row.custid,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <>
                    <Link to={'/invoice/' + row.invono} className="btn btn-info btn-sm" title='Edit'>
                        <BiEdit />
                    </Link>
                    <button
                        title='Delete'
                        onClick={() => deleteSubmit(row.invono)}
                        className="btn btn-danger btn-sm"
                    >
                        <BiTrashAlt />
                    </button>
                </>
            ),
        },
    ];
    const ExpandedComponent = ({ data }) => (
        <div className="alert alert-secondary" role='alert'>
            <small>Created: {Moment(data.createddate).format('D/MM/YYYY')} , Updated : {Moment(data.modifydate).format('D/MM/YYYY')}</small>
            {/* {JSON.stringify(data, null, 2)} */}
        </div>
    );
    const deleteSubmit = (deleteID) => {
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
    function Example() {
        const [show, setShow] = React.useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };
    return (
        <div className='container-fluid my-3'>
            <div className="card mt-3">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-10'>INVOICE</div>
                        <div className='col-2'>
                            <Link to={'/invoice-new'} className="btn btn-sm btn-warning ml-2">
                                Create New
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control ml-2" placeholder="Invoice No" onChange={(e) => searchItems(e.target.value)} />
                            <button className="btn btn-sm btn-primary ml-1" type='reset' onClick={getAllData}>Clear</button>
                        </div>
                    </form>

                    {pending ? <div className='alert alert-primary' role='alert'>Loading</div> : null}

                    <DataTable
                        columns={columns}
                        data={filteredResults}
                        noHeader
                        defaultSortField="invono"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        progressPending={pending}
                        dense
                    />

                    {/* {<Example />} */}
                    {/* <div className="alert alert-secondary mt-2" role="alert">{JSON.stringify(result)}</div> */}
                </div>
            </div>

        </div>

    );
};

export default InvoiceList;
