import React, { Component } from 'react';
import img from './images/docs_img.jpg';

class Image extends Component {
    state = {  }
    render() {
        return (
            <div className="col-sm-12 text-center">
                <img src={img} alt="" width="1070" height="364" className="img-responsive" />
            </div>
        );
    }
}

export default Image;