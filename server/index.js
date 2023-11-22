// index.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());


// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'team108-database-1.c2fql03vwawa.us-east-1.rds.amazonaws.com',
  user: 'dbadmin',
  password: '7cMoU2wngtMxoBGe9bRb',
  database: 'buzzcars',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// app.get('/api/vehicles/uniqueValues', async (req, res) => {
//   try {
//     const uniqueVehicleTypesQuery = 'SELECT DISTINCT vehicletype FROM vehicle';
//     const uniqueModelYearsQuery = 'SELECT DISTINCT modelyear FROM vehicle';

//     const [vehicleTypes, modelYears] = await Promise.all([
//       connection.promise().query(uniqueVehicleTypesQuery),
//       connection.promise().query(uniqueModelYearsQuery),
//     ]);

//     const uniqueVehicleTypes = vehicleTypes[0].map((row) => row.vehicletype);
//     const uniqueModelYears = modelYears[0].map((row) => row.modelyear.toString());

//     res.json({ uniqueVehicleTypes, uniqueModelYears });
//   } catch (error) {
//     console.error('Error fetching unique values:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });



// app.post('/api/add-customer', async (req, res) => {
//   const {
//     customerid,
//     firstname,
//     lastname,
//     street,
//     city,
//     state,
//     postalcode,
//     email,
//     phonenumber,
//   } = req.body;

//   try {
//     // Insert into the "person" table
//     const personInsertQuery = `
//       INSERT INTO buzzcars.person (
//         driverlicensenumber, 
//         customerid, 
//         firstname, 
//         lastname, 
//         email, 
//         phonenumber, 
//         street, 
//         city, 
//         state, 
//         postalcode
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;

//     connection.query(personInsertQuery, [
//       // Adjust these values based on your table structure
//       null, // Assuming driverlicensenumber is auto-incremented
//       customerid,
//       firstname,
//       lastname,
//       email,
//       phonenumber,
//       street,
//       city,
//       state,
//       postalcode,
//     ]);

//     // Insert into the "customer" table
//     const customerInsertQuery = `
//       INSERT INTO buzzcars.customer (customerid) VALUES (?);
//     `;

//   connection.query(customerInsertQuery, [customerid]);

//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error adding customer:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// ... (your existing code)

app.post('/api/add-parts', async (req, res) => {
  const {
    vin,
    partNumber,
    quantity,
    cost,
    description,
  } = req.body;

  // Perform the database insertion
  const insertPartQuery = `
    INSERT INTO part (
      vin,
      partnumber,
      quantity,
      cost,
      description
    ) VALUES (?, ?, ?, ?, ?);
  `;

  const insertPartOrderQuery = `
    INSERT INTO part_order (
      partordernumber,
      vin,
      quantity,
      orderdate
    ) VALUES (?, ?, ?, NOW());
  `;

  try {
    // Insert into the "part" table
    const [partResult] = await connection.promise().execute(insertPartQuery, [
      vin,
      partNumber,
      quantity,
      cost,
      description,
    ]);

    // Insert into the "part_order" table
    const [partOrderResult] = await connection.promise().execute(insertPartOrderQuery, [
      partResult.insertId,
      vin,
      quantity,
    ]);

    res.json({ success: true, partOrderId: partOrderResult.insertId });
  } catch (error) {
    console.error('Error adding parts:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



app.get('/vehicles', (req, res) => {
  const sql = 'SELECT * FROM vehicle';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// app.post('/api/add-customer', async (req, res) => {
//   const { customerid } = req.body;

//   try {
//     const customerInsertQuery = 'INSERT INTO buzzcars.customer (customerid) VALUES (?)';
//     await connection.promise().query(customerInsertQuery, [customerid]);

//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error adding customer:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

app.post('/api/search-customer', async (req, res) => {
  const { driverLicNum, taxID } = req.body;

  try {
    let customerExists = false;

    if (driverLicNum) {
      const personQuery = `SELECT * FROM person WHERE driverlicensenumber = ${driverLicNum}`;
      const personResults = await connection.query(personQuery);
      customerExists = personResults.length > 0;
    }

    if (!customerExists && taxID) {
      const businessQuery = `SELECT * FROM bussiness WHERE taxidentificationnumber = ${taxID}`;
      const businessResults = await connection.query(businessQuery);
      customerExists = businessResults.length > 0;
    }

    res.json({ customerExists });
  } catch (error) {
    console.error('Error searching for customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/customers', (req, res) => {
  const query = 'SELECT customerid FROM buzzcars.customer';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const customerIds = results.map((row) => row.customerid);
      res.json(customerIds);
    }
  });
});


app.get('/api/po-count',(req, res) => {
  try {
    const [rows] = connection.query(`
      with part_order_count as (
        select distinct po.vin
        from part_order po, part pt
        where po.partordernumber = pt.partordernumber
        and pt.status in ("ORDERED", "RECEIVED")
      )
      select count(v.vin) as po_count
      from vehicle v
      where vin in (select vin from part_order_count);
    `);

    const poCount = rows[0].po_count;

    res.json({ poCount });
  } catch (error) {
    console.error('Error retrieving part order count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/purchase-count', (req, res) => {
  const query = 'SELECT count(*) purchased_count FROM vehicle';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});





app.get('/api/vendors', (req, res) => {
  const query = 'SELECT * FROM buzzcars.vendor';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/add-vehicle', (req, res) => {
  const vehicleData = req.body;

  // Perform the database insertion
  const insertQuery = `
    INSERT INTO vehicle (
      vin,
      inventoryclerk_email,
      salesperson_email,
      manufacturername,
      customeridsoldto,
      customeridboughtfrom,
      modelname,
      mileage,
      modelyear,
      vehicletype,
      fueltype,
      description,
      purchasedate,
      purchaseprice,
      vehicle_condition,
      sellingdate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  connection.query(
    insertQuery,
    [
      vehicleData.vin,
      vehicleData.inventoryClerkEmail,
      vehicleData.salespersonEmail,
      vehicleData.manufacturerName,
      vehicleData.customerSoldTo,
      vehicleData.customerBoughtFrom,
      vehicleData.modelName,
      vehicleData.mileage,
      vehicleData.modelYear,
      vehicleData.vehicleType,
      vehicleData.fuelType,
      vehicleData.description,
      vehicleData.purchaseDate,
      vehicleData.purchasePrice,
      vehicleData.vehicleCondition,
      vehicleData.sellingDate,
    ],
    (err, results) => {
      if (err) {
        console.error('Error adding vehicle to the database:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        res.json({ success: true });
      }
    }
  );
});

// Continue with the rest of your server setup
app.post('/api/add-vendor', (req, res) => {
  const {
    vendorName,
    street,
    city,
    state,
    postalCode,
    phoneNumber,
  } = req.body;

  // Perform the database insertion
  const insertQuery = `
    INSERT INTO buzzcars.vendor (
      vendorname,
      street,
      city,
      state,
      postalcode,
      phonenumber
    ) VALUES (?, ?, ?, ?, ?, ?);
  `;

  connection.query(
    insertQuery,
    [
      vendorName,
      street,
      city,
      state,
      postalCode,
      phoneNumber,
    ],
    (err, results) => {
      if (err) {
        console.error('Error adding vendor to the database:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        results.json({ success: true });
      }
    }
  );
});

app.get('/api/display-parts', (req, res) => {
  const query = `
  SELECT
  po.vin,
  po.partordernumber,
  po.vendorname,
  pt.partnumber,
  pt.status,
  pt.quantity,
  pt.cost,
  pt.description
FROM
  buzzcars.part_order po
JOIN
  buzzcars.part pt
ON
  po.partordernumber = pt.partordernumber;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching parts:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const parts = results;
      res.json(parts);
    }
  });
});

// ... (rest of your existing code)


app.get('/api/searchbyDriverID', (req, res) => {
  const { driverLicNum, taxID } = req.body;

  try {
    let customerExists = false;

    if (driverLicNum) {
      const personQuery = 'SELECT * FROM person WHERE driverlicensenumber = ?';
      connection.query(personQuery, [driverLicNum], (personErr, personResults) => {
        if (personErr) {
          console.error('Error searching for person:', personErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        customerExists = personResults.length > 0;

        if (!customerExists && taxID) {
          const businessQuery = 'SELECT * FROM bussiness WHERE taxidentificationnumber = ?';
          connection.query(businessQuery, [taxID], (businessErr, businessResults) => {
            if (businessErr) {
              console.error('Error searching for business:', businessErr);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            customerExists = businessResults.length > 0;

            res.json({ customerExists });
          });
        } else {
          res.json({ customerExists });
        }
      });
    } else if (taxID) {
      const businessQuery = 'SELECT * FROM bussiness WHERE taxidentificationnumber = ?';
      connection.query(businessQuery, [taxID], (businessErr, businessResults) => {
        if (businessErr) {
          console.error('Error searching for business:', businessErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        customerExists = businessResults.length > 0;

        res.json({ customerExists });
      });
    } else {
      res.status(400).json({ error: 'Missing parameters' });
    }
  } catch (error) {
    console.error('Error searching for customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/add-customer', (req, res) => {
  const {
   // driverlicensenumber,
    customerid,
    // email,
    // phonenumber,
    // firstname,
    // lastname,
    // street,
    // city,
    // state,
    // postalcode,
  } = req.body;

  // Perform the database insertion
  const insertQuery = `
    INSERT INTO customer (
      customerid
    ) VALUES (?);
  `;

  connection.query(
    insertQuery,
    [
      //driverlicensenumber,
      customerid,
      // email,
      // phonenumber,
      // firstname,
      // lastname,
      // street,
      // city,
      // state,
      // postalcode,
    ],
    (err, results) => {
      if (err) {
        console.error('Error adding customer to the database:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        res.json({ success: true });
      }
    }
  );
});


app.post('/api/update-vehicle', (req, res) => {
  const { vin, customeridsoldto, sellingdate } = req.body;

  const updateQuery = `
    UPDATE vehicle
    SET customeridsoldto = ?, sellingdate = ?
    WHERE vin = ?;
  `;

  connection.query(updateQuery, [customeridsoldto, sellingdate, vin], (err, results) => {
    if (err) {
      console.error('Error updating vehicle:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});


app.get('/api/customer/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const query = 'SELECT * FROM buzzcars.customer WHERE customerid = ?';
  
  connection.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        res.json({ customerExists: true });
      } else {
        res.json({ customerExists: false });
      }
    }
  });
});

app.get('/api/vehicle/', (req, res) => {
  const query = 'SELECT * FROM vehicle';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

app.get('/cars-available-purchase/', (req, res) => {
  const query = 'SELECT count(vin) FROM vehicle WHERE customersoldto is null;';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
      console.log(results[0]);
    }
  });
});

app.get('/countItems/', (req, res) => {
  const query = 'SELECT count(*) FROM vehicle';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
      console.log(results[0]);
    }
  });
});

///For User Login Authentication getting the user details from user tables
app.post('/api/login', (req, res) => {

  console.log('Request received for login:', req.body);
  const { email, password } = req.body;

  // SQL query to authenticate the user and retrieve role details
  const query = `
    SELECT ur.userid, ic.email email, ic.password, "INV_CLERK" as role_desc 
    FROM users ur, inventory_clerk ic 
    WHERE ur.userid = ic.userid AND ic.email = ? AND ic.password = ?
    UNION ALL
    SELECT ur.userid, sp.email, sp.password, "SALES_PERSON" as role_desc 
    FROM users ur, salesperson sp 
    WHERE ur.userid = sp.userid AND sp.email = ? AND sp.password = ?
    UNION ALL
    SELECT ur.userid, mg.email, mg.password, "MANAGER" as role_desc 
    FROM users ur, manager mg 
    WHERE ur.userid = mg.userid AND mg.email = ? AND mg.password = ?
    UNION ALL
    SELECT ur.userid, ow.email, ow.password, "OWNER" as role_desc 
    FROM users ur, owners ow 
    WHERE ur.userid = ow.userid AND ow.email = ? AND ow.password = ?;
  `;

  connection.query(query, [email, password, email, password, email, password, email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Query results:', results);
      if (results.length > 0) {
        // Authentication successful, respond with the role
        res.json({ role: results[0].role_desc });
      } else {
        // Authentication failed
        res.json({ role: null });
      }
    }
  });
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/count', async (req, res) => {
  try {
    const query = `
      SELECT count(*) as carcount
      FROM vehicle;
    `;

    connection.query(query);
    const carCount = results[0].carcount;

    res.json({ count: carCount });
  } catch (error) {
    console.error('Error executing vehicle count query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define an API endpoint to get vehicles
// Inside your Express server setup (e.g., server.js)
app.get('/api/vehicles/', (req, res) => {
    const query = 'SELECT * FROM vehicle';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
        console.log(results);
      }
    });
  });


  app.get('/search', async (req, res) => {

    const { searchText, modelType, modelYear } = req.query;

  try {
    const query = `
    with colorList as (
      select vin, group_concat(color) colors
      from buzzcars.color
      group by vin
    ),
    sales_price as (
      select po.vin, sum(pt.quantity * pt.cost) partprice
      from buzzcars.part_order po
      join buzzcars.part pt on po.vin = pt.vin and po.partordernumber = pt.partordernumber
      where pt.status = 'INSTALLED'
      group by po.vin
    )
    select
      v.vin, vehicletype, modelyear, manufacturername, modelname, fueltype,
      mileage, colorList.colors, sales_price.partprice * v.purchaseprice as salesprice
    from buzzcars.vehicle v
    left join colorList on v.vin = colorList.vin
    left join sales_price on v.vin = sales_price.vin;
    `;

    const results = await connection.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  // app.post('/api/vehicles/', (req, res) => {
  //   const { id, make, model, year } = req.body;
  
  //   if (!id || !make || !model || !year) {
  //     return res.status(400).json({ message: 'All fields are required' });
  //   }
  
  //   const insertQuery = 'INSERT INTO vehicles (id, make, model, year) VALUES (?, ?, ?, ?)';
  
  //   connection.query(insertQuery, [id, make, model, year], (err, result) => {
  //     if (err) {
  //       console.error('Error inserting data into MySQL:', err);
  //       return res.status(500).json({ message: 'Internal Server Error' });
  //     }
  
  //     console.log('Data inserted into MySQL:', result);
  //     res.status(201).json({ message: 'Data inserted successfully' });
  //   });
  // });
  

// Start the server
app.listen(3001, () => {
  console.log(`Server is running: 3001`);
});
