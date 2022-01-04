import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BiEdit, BiTrashAlt } from "react-icons/bi";

// BiEdit,BiTrashAlt,BiHide,BiShow
const StateList = (props) => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";
    const [result, setResult] = React.useState();
    const [filteredResults, setFilteredResults] = React.useState();
    const [pending, setPending] = React.useState(true);
    const [searchInput, setSearchInput] = React.useState('');

    const getAllData = () => {
        fetch(`${baseURL}/state`, {
            method: "GET",
            mode: 'cors',
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setResult(json);
            setFilteredResults(json);
            setPending(false);
        });
    }
    const delData = (id) => {
        setPending(true);
        fetch(`${baseURL}/state/${id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log('RESPONSE:', res);
            alert('Successfully Deleted')

            getAllData();
        });
        // }).then(res => res.json()).then(json => {
        //     console.log('RESPONSE:', json);
        //     // if (json.message === 'Your Item already exist') {
        //     //     alert("Error: ID already Exit. Try Again")
        //     //     props.history.push('/states');
        //     // } else {
        //     //     alert("Successfull Created")
        //     //     props.history.push('/states');
        //     // }
        //     alert('LOG:' + JSON.stringify(json))
        //     setPending(false);

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
    // { "stateid": 1, "statename": "Johor", "isactive": 1, "createdusername": "edp", "createddateunix": 1609912041, "createddate": "2021-01-06T13:47:21+08:00", "modifiedusername": "akashaf", "modifieddateunix": 1611353331, "modifydate": "2021-01-23T06:08:51+08:00", "districts": null }
    const columns = [
        {
            name: 'Id',
            selector: (row) => row.stateid,
            sortable: true,
        },
        {
            name: 'State',
            selector: (row) => row.statename,
            sortable: true,
        },
        {
            name: 'Active',
            selector: (row) => row.isactive,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <>
                    <Link to={'/state/' + row.stateid} className="btn btn-info btn-sm" title='Edit'>
                        <BiEdit />
                    </Link>
                    <button
                        title='Delete'
                        onClick={() => deleteSubmit(row.stateid)}
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
    return (
        <div className='container-fluid my-4'>
            <div className="card mt-3">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-10'>STATE</div>
                        <div className='col-2'>
                            <Link to={'/state-new'} className="btn btn-sm btn-warning ml-2">
                                Create New
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control ml-2" placeholder="State Name" onChange={(e) => searchItems(e.target.value)} />
                            <button className="btn btn-sm btn-primary ml-1" type='reset' onClick={getAllData}>Clear</button>
                        </div>
                    </form>

                    {pending ? <div className='alert alert-primary' role='alert'>Loading</div> : null}

                    <DataTable
                        columns={columns}
                        data={filteredResults}
                        noHeader
                        defaultSortField="stateid"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        progressPending={pending}
                        dense
                    />
                    {/* <div className="alert alert-secondary mt-2" role="alert">{JSON.stringify(result)}</div> */}


                </div>
            </div>
        </div>
    );
};

export default StateList;
