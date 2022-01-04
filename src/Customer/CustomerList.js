/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { BiEdit, BiTrashAlt } from "react-icons/bi";

const CustomerList = (props) => {
    const baseURL = "http://iot.kiswire.com.my:8081"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";
    const [result, setResult] = React.useState();
    const [filteredResults, setFilteredResults] = React.useState();
    const [pending, setPending] = React.useState(true);
    const [searchInput, setSearchInput] = React.useState('');
    const [resultStateD, setResultStateD] = React.useState();
    const [resultDistrictD, setResultDistrictD] = React.useState();
    const abortController = new AbortController();

    const getAllStateD = () => {
        setPending(true);
        fetch(`${baseURL}/state`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setResultStateD(json);
        });
    }
    const getAllDistrictD = () => {
        setPending(true);
        fetch(`${baseURL}/state`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => res.json()).then(json => {
            setResultDistrictD(json);
        });
    }

    const getAllData = () => {
        fetch(`${baseURL}/customer`, {
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
        fetch(`${baseURL}/customer/${id}`, {
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
        getAllData();
        getAllStateD();
        getAllDistrictD();
    }, []);

    // const seachStateNames = (stateIDvalue, resultvalues) => {
    //     if (stateIDvalue <= 0) {
    //         return 'Null';
    //     } else {
    //         for (const item of resultvalues) {
    //             if (item.stateid === stateIDvalue) {
    //                 return `${stateIDvalue}-${item.statename}`;
    //             }
    //         }
    //     }
    // }

    // const seachDistictName = (distictIDvalues, resultvalue2) => {
    //     if (!distictIDvalues) {
    //         return 'Null';
    //     } else {
    //         for (const disticts of resultvalue2) {
    //             if (disticts.districtid === distictIDvalues) {
    //                 return `${distictIDvalues}-${disticts.districtname}`;
    //             }
    //         }
    //     }
    // }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        const filteredData = result.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData);

    }

    // { "custid": 2, "custname": "ali", "mailingaddr1": "Jalan Kedah 4", "mailingaddr2": "", "mailingaddr3": "", "mailingstate": "2", "mailingdistrict": "2007", "mailingpostcode": 20333, "isactive": 1, "createdusername": "fixthis", "createddateunix": 1610355743, "createddate": "2021-01-11T17:02:23+08:00", "modifiedusername": "farooq", "modifieddateunix": 1613314152, "modifydate": "2021-02-14T22:49:12+08:00" }
    const columns = [
        {
            name: 'Id',
            selector: (row) => row.custid,
            sortable: true,
        },
        {
            name: 'Customer',
            selector: (row) => row.custname,
            sortable: true,
        },
        {
            name: 'Address',
            // button: true,
            selector: (row) => row.mailingaddr1,
            sortable: true,
            cell: (row) => (
                <>
                    {row.mailingaddr1},<br></br>
                    {row.mailingaddr2},
                    {row.mailingaddr3}

                </>
            )
            // selector: (row) => row.mailingaddr1

        },
        {
            name: 'State',
            selector: (row) => row.mailingstate,
            sortable: true,
            // cell: (row) => seachStateNames(row.mailingstate, resultState),
            // cell: (row) => (
            //     <>
            //         {row.mailingstate}
            //         {/* {seachStateNames(row.mailingstate, resultStateD)} */}
            //     </>
            // ),


        },
        {
            name: 'District',
            selector: (row) => row.mailingdistrict,
            sortable: true,
            // cell: (row) => seachDistictName(row.mailingdistrict, resultDistrict),
        },
        {
            name: 'Postcode',
            selector: (row) => row.mailingpostcode,
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
            allowOverflow: true,
            cell: (row) => (
                <>
                    <Link to={'/customer/' + row.custid} className="btn btn-info btn-sm" title='Edit'>
                        <BiEdit />
                    </Link>
                    <button
                        title='Delete'
                        onClick={() => deleteSubmit(row.custid)}
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
                        <div className='col-10'>CUSTOMER</div>
                        <div className='col-2'>
                            <Link to={'/customer-new'} className="btn btn-sm btn-warning ml-2">
                                Create New
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control ml-2" placeholder="Customer Name" onChange={(e) => searchItems(e.target.value)} />
                            <button className="btn btn-sm btn-primary ml-1" type='reset' onClick={getAllData}>Clear</button>
                        </div>
                    </form>

                    {pending ? <div className='alert alert-primary' role='alert'>Loading</div> : null}

                    <DataTable
                        columns={columns}
                        data={filteredResults}
                        noHeader
                        defaultSortField="custid"
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

export default CustomerList;
