import express from 'express';
import path from 'path';
import util from '../../utilities/imageutil'

const routes = express.Router();


routes.get('/',async (req,res)=>{
    let originalImages : string[]  =  await util.originalImages();
    originalImages.forEach(filename => {
        console.log(filename);
    });

    await new Promise((resolve) => {
        setTimeout(() => {
          resolve('wait before rendering');
        }, 1000);
    });

    res.render('index',{ images : originalImages });
});



export default routes;
