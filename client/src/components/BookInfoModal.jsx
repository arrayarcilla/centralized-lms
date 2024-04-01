//--- IMPORTANT IMPORTS
import React, { useState, useEffect } from 'react';

//--- OTHER IMPORTS
import {
    Modal, ModalHeader, ModalDescription, ModalContent, ModalActions, 
    Button,
    Header,
    Image
} from 'semantic-ui-react';

function BookInfoModal() {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}
        >
            <p>this is a modal</p>
        </Modal>

    )
}

export default BookInfoModal;