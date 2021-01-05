import React from 'react'
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
const FileUploadInput = (props) => {
    const  {productInput , setProductInput, } = props;
    let allowedFiles = productInput.images;
    const userReducer = useSelector(state => state.userReducer)
    const { currentUser } = userReducer;
    const changeHandler = e  => {
        const files = e.target.files
        if(files) {
            for( let i = 0 ; i <files.length ; i++) {
                    Resizer.imageFileResizer(files[i], 560, 560, 'JPEG', 100, 0, (url) => {
                        
                        axios.post('/api/v1/image/upload-image', {image: url}, {
                            headers: {
                                authtoken: currentUser.authtoken,
                            }
                        }).then(res => {
                            allowedFiles.push(res.data.data);
                            setProductInput({...productInput, images : allowedFiles})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    },
                        'base64',
                    )
            }
        }
    }
    return (
        <div className="form-group">
            <label className="form-label text-uppercase d-block">Image Upload</label>
            <label className="btn btn-outline-secondary raised  text-uppercase">Choose file
            <input type="file" className="form-control"  onChange={changeHandler}  multiple accept="images/*" hidden/>
            </label>
            
        </div>
    )
}

export default FileUploadInput
