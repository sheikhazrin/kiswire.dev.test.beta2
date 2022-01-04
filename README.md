# KISWIRE DEV TESTING PROGRAM

Developer : Sheik Hazrin Bin Sheik Othman
Email : sheikhazrin@gmail.com

## Task 1

Create an app for invoicing system using ReactJS, you can design the program using your own creativity.

## Task 2

### Customer API

- Fetch: <http://iot.kiswire.com.my:8081/customer>
- Get: <http://iot.kiswire.com.my:8081/customer/1>customer id
- Post: <http://iot.kiswire.com.my:8081/customer>
- Put: <http://iot.kiswire.com.my:8081/customer>
- Delete: <http://iot.kiswire.com.my:8081/customer/1>customer id

### State API

This api is to fetch State name for customer mailing_state

- Fetch: <http://iot.kiswire.com.my:8081/state>
- Get: <http://iot.kiswire.com.my:8081/state/1>state id
- Post: <http://iot.kiswire.com.my:8081/state>
- Put: <http://iot.kiswire.com.my:8081/state>
- Delete: <http://iot.kiswire.com.my:8081/state/1>state id

### District API

This api is to fetch District name for customer mailing_district

- Fetch: <http://iot.kiswire.com.my:8081/district>
- FetchByState: <http://iot.kiswire.com.my:8081/district/state/1>state id
- Get: <http://iot.kiswire.com.my:8081/district/1>district id
- Post: <http://iot.kiswire.com.my:8081/district>
- Put: <http://iot.kiswire.com.my:8081/district>
- Delete: <http://iot.kiswire.com.my:8081/district/1>district id

## Task 3

### Main Invoice API

- Fetch: <http://iot.kiswire.com.my:8081/invoice>
- Get: <http://iot.kiswire.com.my:8081/invoice/1>invoice no
- GetWithItems: <http://iot.kiswire.com.my:8081/invoice/items/1>
- Post: <http://iot.kiswire.com.my:8081/invoice>
- Put: <http://iot.kiswire.com.my:8081/invoice>
- Delete: <http://iot.kiswire.com.my:8081/invoice/1>invoice no

### Invoice Item API

- Fetch: <http://iot.kiswire.com.my:8081/invoiceitem>
- FetchByInvoiceNo: <http://iot.kiswire.com.my:8081/invoiceitem/invoiceno/>invoice no
- Get: <http://iot.kiswire.com.my:8081/invoiceitem/>invoice no/invoice seq
- Post: <http://iot.kiswire.com.my:8081/invoiceitem>
- Put: <http://iot.kiswire.com.my:8081/invoiceitem>
- Delete: <http://iot.kiswire.com.my:8081/invoiceitem/>invoice no>/<invoice seq
