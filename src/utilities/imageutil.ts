import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { builtinModules } from 'module';

function getNameAndExtension(sourcePath : string) : [string,string]{
    const arr: string[] = sourcePath.split('.');
    let ext = arr[arr.length-1];
    arr.pop();
    let filename = arr.length>0? arr.join('+'):'';
    return [filename,ext];
}

function deleteImagesInResizeDir(): void{
    const imageFolder = path.join(__dirname,'../public/rs-images');
    fs.readdirSync(imageFolder).forEach(file => {
        let [filename,ext]:[string,string] = getNameAndExtension(file);
        if(filename!==''){
            console.log('deleting - '+ path.join(imageFolder,'/',filename+'.'+ext));
            fs.unlink(path.join(imageFolder,'/',filename+'.'+ext), err => {
                if (err) throw err;
              });
        }
    });
}

function originalImages() : string[]{
    let images : string[] = [];
    const imageFolder = path.join(__dirname,'../public/images');
    fs.readdirSync(imageFolder).forEach(file => {
        let [filename,ext]:[string,string] = getNameAndExtension(file);
        console.log(filename+'.'+ext);
        if(filename!==''){
            images.push(filename+'.'+ext);
        }
    });
    return images;
};

const resizedImages = (width:number,height:number) : string[] => {
    resizeAllImages(width,height);
    let images : string[] = [];
    const imageFolder = path.join(__dirname,'../public/rs-images');
    fs.readdirSync(imageFolder).forEach(file => {
        let [filename,ext]:[string,string] = getNameAndExtension(file);
        if(filename!==''){
            images.push(filename+'.'+ext);
        }
    });
    return images;
}

const resizeAllImages = async ( width : number, height : number) : Promise<string[]> => {
    return new Promise((resolve) => {  
      setTimeout(() => {
        let images : string[] = originalImages();
        let destinationPath : string = path.join(__dirname,'../public/rs-images/');
        let rootpath : string = path.join(__dirname,'../public/images/'); 
        images.forEach( async sourcePath => {
            let [filename,ext] : [string,string]= getNameAndExtension(sourcePath);
            let rsImageName = destinationPath+filename+'_'+width+'_'+height+'.'+ext;
            console.log(rsImageName);
            await resize(rootpath+sourcePath,rsImageName,ext,width,height);
        });
      resolve(images);
    },
    2000)}
    );
};

const resize = async (
  sourcePath : string,
  destinationPath : string,
  ext : string,
  width : number ,
  height : number
): Promise<string> => {
  
  return new Promise((resolve) => {  
    setTimeout(() => {
      console.log(sourcePath+'-A-'+destinationPath);
      const readStream : fs.ReadStream = fs.createReadStream(sourcePath);
      const writeStream : fs.WriteStream = fs.createWriteStream(destinationPath);

      let image : sharp.Sharp = sharp();
      image = image.resize(width,height);
      if(ext==='png'){
        image = image.png();
      }
      if(ext==='jpeg'){
        image = image.jpeg();
      }
      image.on('info',()=>{console.log("Image Resize Complete")});

      readStream.pipe(image).pipe(writeStream);
      resolve('success');
    }, 2000);
  });
}

export default {resizedImages,originalImages,deleteImagesInResizeDir};