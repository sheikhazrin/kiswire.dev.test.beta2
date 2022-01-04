import React from 'react';
const Home = () => {
    // const baseURL = "http://iot.kiswire.com.my:8081"
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";
    // const [result, setResult] = React.useState();

    // const getAllData = () => {
    //     fetch(`${baseURL}/state`, {
    //         method: "GET",
    //         headers: { "Authorization": `Bearer ${token}` }
    //     }).then(res => res.json()).then(json => setResult(json));
    // }

    // React.useEffect(() => {
    //     getAllData()
    // }, []);

    return (
        <div className='container-fluid my-3'>
            <div className="card mt-3">
                <div className="card-header">HOME</div>
                <div className="card-body">
                    <h2>Welcome to Kiswire Developer Test program User 1</h2>

                    <p> Developer : Sheik Hazrin Sheik Othman <br />
                        Email: sheikhazrin@outlook.my <br/>
                        Phone : 0197223455</p>
                    
                    {/* <div className="input-group input-group-sm">
                        <button className="btn btn-sm btn-primary" >Get All</button>

                        <input type="text"  className="form-control ml-2" placeholder="Id" />
                        <div className="input-group-append">
                            <button className="btn btn-sm btn-primary" >Get by Id</button>
                        </div>

                        <input type="text" className="form-control ml-2" placeholder="Title" />
                        <div className="input-group-append">
                            <button className="btn btn-sm btn-primary" >Find By Title</button>
                        </div>

                        <button className="btn btn-sm btn-warning ml-2" >Clear</button>
                    </div>

                    <div className="alert alert-secondary mt-2" role="alert"><pre>{}</pre></div> */}
                </div>
            </div>
        </div>


    );
};

export default Home;
