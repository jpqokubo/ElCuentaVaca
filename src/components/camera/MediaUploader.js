import React, { useState, useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

function mediaUploader(props) {
  const [files, setFiles] = useState([]);
  const { fullScreen } = props;
  const handleClose = () => {
    props.setOpenLoader(false);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.openLoader}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContent>
          <DropzoneArea filesLimit={20} onChange={e => setFiles(e)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancelar
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Subir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default withMobileDialog()(mediaUploader);
