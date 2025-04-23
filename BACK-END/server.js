const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const loginRouter = require('./routers/loginRoute')
const PackageRouter = require('./routers/TravelPackageRoute')
const companyRouter = require('./routers/companyRoute')
const bookingRouter = require('./routers/bookingRoute')
const adminRouter = require('./routers/AdminRoute')
const userProfileRouter = require('./routers/userProfileRoute')
const reviewRouter = require('./routers/reviewRoute')
const databaseCn = require('./database/db');
const cors = require('cors')

app.use(cors({
   origin: process.env.FRONTEND_URL,
   credentials: true, 
 }));



app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/',loginRouter)
app.use('/Package',PackageRouter)
app.use('/Company',companyRouter)
app.use('/Payment',bookingRouter)
app.use('/userProfile',userProfileRouter)
app.use('/Review',reviewRouter)
app.use('/Admin',adminRouter)

const path = require('path');

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

// For any route not handled by the API, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'FRONT-END/build', 'index.html'));
});

databaseCn();

app.listen(process.env.PORT,(err)=>{
    if(err){
       console.error(err);
    }else{
    console.log('server running successfully...');
    }
 })