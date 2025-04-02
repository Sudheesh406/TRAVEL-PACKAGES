const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const loginRouter = require('./routers/loginRoute')
const PackageRouter = require('./routers/TravelPackageRoute')
const companyRouter = require('./routers/companyRoute')
const bookingRouter = require('./routers/bookingRoute')
const userProfileRoute = require('./routers/userProfileRoute')
const reviewRoute = require('./routers/reviewRoute')
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
app.use('/userProfile',userProfileRoute)
app.use('/Review',reviewRoute)

databaseCn();

app.listen(process.env.PORT,(err)=>{
    if(err){
       console.error(err);
    }else{
    console.log('server running successfully...');
    }
 })