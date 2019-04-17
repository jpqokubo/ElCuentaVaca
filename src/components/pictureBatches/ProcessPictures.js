import React from 'react';
import { connect } from 'react-redux';

function ProcessPictures() {
  return ( 
      props.batch.pictures.map(picture => ( 
          
      ))
  )
}
const mapStateToProps = state => ({
  batch: state.camera.batch,
  errors: state.errors
});
export default connect(mapStateToProps)(ProcessPictures);
