import express, { response } from 'express';
import path from 'path';
import util from '../../utilities/imageutil';

const routes = express.Router();


routes.get('/',async (req,res,next)=>{
    let width:number = parseInt(req.query.width as string);
    let height:number = parseInt(req.query.height as string);
    console.log('Resize'+ width+'--'+height);
    //util.deleteImagesInResizeDir();
    let resizeImages : string[] =  (width===NaN || height === NaN)?  []: util.resizedImages(width,height);
    

    await new Promise((resolve) => {
        setTimeout(async () => {
        (resizeImages).forEach(file=>{
                console.log('resize-'+file);
        });
        await res.render('resize',{ images : resizeImages });
        resolve('wait before rendering');
        }, 2000);
    });

    //await res.render('resize',{ images : resizeImages });
});


export default routes;
