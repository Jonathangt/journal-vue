
import cloudinary from 'cloudinary';
import axios from "axios";

import uploadImage from "@/modules/daybook/helpers/uploadImage";


cloudinary.config({
    cloud_name: 'dgwdqksic',
    api_key: '735963232832741',
    api_secret: 'Hp62KhoB628FXo2cn9evE1fgRJQ'
});

describe("Pruebas en el helper uploadImage", () => {

    test("Debe de cargar un archivo y retonrar el url", async ( done ) => {
        
        const { data } = await axios.get('https://res.cloudinary.com/dgwdqksic/image/upload/v1642290903/lqauup7wbf7x3wxqh33i.jpg',{
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'image.jpg')

        //return url
        const url = await uploadImage( file )

        expect( typeof url ).toBe('string')

        //get id image

        const id = url.split('/')
        const idImage = id[id.length - 1].replace('.jpg', '')
    
        cloudinary.v2.api.delete_resources(idImage, {}, () => {
            done();
        });

    });
});