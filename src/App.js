import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './header'
import Home from './Home'
import Footer from './footer'
// ******** CUSTOMER ************
import CustomerList from './Customer/CustomerList'
import CustomerNew from './Customer/CustomerNew'
import CustomerEdit from './Customer/CustomerEdit'
// ******** STATE ************
import StateList from './State/StateList'
import StateNew from './State/StateNew'
import StateEdit from './State/StateEdit'

// ******** DISTRICT ************
import DistrictList from './District/DistrictList'
import DistrictNew from './District/DistrictNew'
import DistrictEdit from './District/DistrictEdit'

// ******** INVOICE ************
import InvoiceList from './Invoice/InvoiceList'
import InvoiceNew from './Invoice/InvoiceNew'
import InvoiceEdit from './Invoice/InvoiceEdit'

// ******** START HERE ************
const App = () => {
  // const baseURL = "http://iot.kiswire.com.my:8081"
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZmlyc3RuYW1lIjoiVXNlciAxICIsImxhc3RuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJ1c2VyMUBraXN3aXJlLmNvbS5teSIsIndvcmtncm91cGlkIjowLCJyb2xlaWQiOjAsInJvbGVsZXZlbCI6MCwicGhvdG91cmwiOiJub25lIiwic2lnbmF0dXJldXJsIjoibm9uZSIsImV4cCI6MTY0MTM3NTQ2NX0.LO1iJ89cYsxaBFlJH5TTrL1J5-vxOu8CaWcJkrSW3l0";
  // const [result, setResult] = React.useState();


  // ******** USE EFFECT ************
  React.useEffect(() => {
    // HERE ----
  }, []);
  // ******** RETURN HERE ************
  return (
    <div className="App">
      <Router>
        <header><Header /></header>
        <main>
          <Route exact component={Home} path="/" />

          <Route exact component={CustomerList} path="/customers" />
          <Route exact component={CustomerNew} path="/customer-new" />
          <Route component={CustomerEdit} path="/customer/:slug" />

          <Route exact component={StateList} path="/states" />
          <Route exact component={StateNew} path="/state-new" />
          <Route component={StateEdit} path="/state/:slug" />

          <Route exact component={DistrictList} path="/districts" />
          <Route exact component={DistrictNew} path="/district-new" />
          <Route component={DistrictEdit} path="/district/:slug" />

          <Route exact component={InvoiceList} path="/invoices" />
          <Route exact component={InvoiceNew} path="/invoice-new" />
          <Route component={InvoiceEdit} path="/invoice/:slug" />
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
