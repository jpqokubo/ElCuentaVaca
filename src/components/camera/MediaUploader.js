import React, { useState, useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { batchPictures } from '../../redux/actions/cameraActions';
import uuid from 'uuid';
import moment from 'moment';

function mediaUploader(props) {
  const [files, setFiles] = useState([]);
  const [batch, setBatch] = useState([]);
  const { fullScreen } = props;
  const handleClose = () => {
    props.setOpenLoader(false);
  };
  useEffect(() => {
    let picturesBatch = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = event => {
        picturesBatch.push({
          file: file,
          dataUri: event.target.result,
          id: uuid()
        });
      };
      reader.readAsDataURL(file);
      setBatch(picturesBatch);
    });
  }, [files]);

  const handleSubmitBatch = () => {
    const id = uuid();
    const inventoryDate = moment().format();
    const pictures = batch;
    props.batchPictures(pictures, inventoryDate, id);
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.openLoader}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogContent>
        <DropzoneArea
          dropzoneText='  Arrastra un archivo aquí o haz clic  '
          filesLimit={20}
          onChange={(file, data) => setFiles(file, data)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancelar
        </Button>
        <Button onClick={handleSubmitBatch} color='primary' autoFocus>
          Subir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  { batchPictures }
)(mediaUploader);
