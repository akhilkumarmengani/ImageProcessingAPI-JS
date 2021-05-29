import morgan from 'morgan';


//import express from 'express';
// const logger = (req:express.Request,res:express.Response,next:Function):void=>{
//     let url = req.url;
//     console.log(url +' was visited');
//     next();
// };

const tiny = morgan('tiny');

export default tiny;

