import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "../Dialog/DialogTitle";

const Modal = (props) => {
    const [open, setOpen] = useState(false);
    const {component} = props;

    const openImageModal = () => {
        setOpen(true);
    };

    const closeImageModal = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                maxWidth={'lg'}
                PaperProps={{
                    style: {
                        borderRadius: '20px',
                        border: '11px solid #FFFFFF'
                    }
                }}
                onClose={closeImageModal}
            >
                <DialogTitle color={'white'} id="customized-dialog-title"
                             onClose={closeImageModal}/>
                {component}
            </Dialog>
            {React.cloneElement(component, {onClick: openImageModal, ...props})}
        </div>
    );
}

export default Modal;
