/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BiEdit, BiTrashAlt } from "react-icons/bi";

const DistrictList = () => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";
    const [result, setResult] = React.useState();
    const [filteredResults, setFilteredResults] = React.useState();
    const [pending, setPending] = React.useState(true);
    const [searchInput, setSearchInput] = React.useState('');
    const [resultState, setResultState] = React.useState();
    const abortController = new AbortController();


    const getAllState = () => {
        setPending(true);
        fetch(`${baseURL}/state`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setResultState(json);
            setPending(false);
        });
    }
    const getAllData = () => {
        setPending(true);
        fetch(`${baseURL}/district`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setResult(json);
            setFilteredResults(json);
            setPending(false);
        });
    }
    const delData = (id) => {

        setPending(true);
        fetch(`${baseURL}/district/${id}`, {
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
    }

    React.useEffect(() => {
        // void async function fetchData() {
        //     try {
        //         const url = 'https://jsonplaceholder.typicode.com/todos/1';
        //         const response = await fetch(url, { signal: abortController.signal });
        //         React.setData(await response.json());
        //     } catch (error) {
        //         console.log('error', error);
        //     }

        // }
        getAllData();
        getAllState();
    }, [])

    // const inventory = [
    //     { name: 'apples', quantity: 2 },
    //     { name: 'bananas', quantity: 0 },
    //     { name: 'cherries', quantity: 5 }
    // ];
    // const resultinventory = inventory.find(({ name }) => name === 'cherries');
    // console.log(resultinventory) // { name: 'cherries', quantity: 5 }
    // const [resultseachStateName, setresultseachStateName] = React.useState();
    const seachStateName = (stateIDvalue, resultvalue) => {
        if (stateIDvalue <= 0) {
            return 'Null';
        } else {
            for (const item of Object.keys(resultvalue)) {
                var capital = resultvalue[item];
                // console.log(item, capital.statename);

                if (capital.stateid === stateIDvalue) {
                    return stateIDvalue + '-' + capital.statename;
                }
                // if (item.stateid === stateIDvalue) {
                //     return `${stateIDvalue}-${item.statename}`;
                // }
            }

        }
    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        const filteredData = result.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData);
    }
    // { "districtid": 1001, "stateid": 1, "districtname": "Johor Bahru", "isactive": 1, "createdusername": "nil", "createddateunix": 1610700052, "createddate": "2021-01-15T16:40:52+08:00", "modifiedusername": "akashaf", "modifieddateunix": 1611406859, "modifydate": "2021-01-23T21:00:59+08:00" }
    const columns = [
        {
            name: 'Id',
            selector: (row) => row.districtid,
            sortable: true,
        },
        {
            name: 'District',
            selector: (row) => row.districtname,
            sortable: true,
        },
        {
            name: 'State',
            selector: (row) => row.stateid,
            sortable: true,
            // cell: (row) => seachStateName(row.stateid, resultState),
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
                    <Link to={'/district/' + row.districtid} className="btn btn-info btn-sm" title='Edit'>
                        <BiEdit />
                    </Link>
                    <button
                        title='Delete'
                        onClick={() => deleteSubmit(row.districtid)}
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
        <div className='container-fluid my-3'>
            <div className="card mt-3">
                <div className="card-header">
                    <div className='row'>
                        <div className='col-10'>DISTRICT</div>
                        <div className='col-2'>
                            <Link to={'/district-new'} className="btn btn-sm btn-warning ml-2">
                                Create New
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control ml-2" placeholder="Distict Name" onChange={(e) => searchItems(e.target.value)} />
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

export default DistrictList;
