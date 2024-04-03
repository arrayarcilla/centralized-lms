//--- Important Imports
import React, { useState, useRef } from 'react';

//--- Other Imports
import {
    Segment,
    Form, FormInput, FormSelect, FormGroup, FormButton,
    Button,
    Modal, ModalHeader,
} from 'semantic-ui-react';


function AddItemModal() {
    
    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        isbn: '',
        publisher: '',
        yearPublished: '',
        count: 1,
    });
        
    const handleIncrement = (e) => {
        e.preventDefault();
        setFormData((prevFormData) => ({ ...prevFormData, count: prevFormData.count + 1}))
    }

    const handleDecrement = (e) => {
        e.preventDefault();
        if (formData.count > 1) {
            setFormData((prevFormData) => ({ ...prevFormData, count: prevFormData.count - 1 }));
        }
    }

    const categoryOptions = [
        { key: '0', text: 'Fiction', value: 'fiction' },
        { key: '1', text: 'Non-Fiction', value: 'non_fiction' },
        { key: '2', text: 'Reference', value: 'reference' },
        { key: '3', text: 'Others', value: 'others' },
    ]

    const handleChange = (e) => {
        setFormData({ 
            ...formData, [e.target.name]: e.target.value 
        });
    };

    const handleSelectChange = (e, { value }) => {
        setFormData((prevFormData) => ({ ...prevFormData, category: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    
        console.log(formData);
    
        setFormData((prevFormData) => ({ ...prevFormData, count: 1 }));
        setOpen(false);
      };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button content='Manual Add' color='blue' basic />}
        >
            <ModalHeader>
                Add New Book
            </ModalHeader>
            {open && (
                <div>
                    <Segment padded raised>
                        <Segment padded raised>
                            <Form onSubmit={handleSubmit}>
                                <FormInput name='title' label='Title' width={5} onChange={handleChange} />
                                <FormInput name='author' label='Author' width={5} onChange={handleChange} />
                                <FormSelect 
                                    name='category'
                                    label='Catgory'
                                    options={categoryOptions}
                                    placeholder='Fiction'
                                    width={3}
                                    onChange={handleSelectChange}
                                />
                                <FormInput name='isbn' label='ISBN' width={3} onChange={handleChange} />
                                <FormInput name='publisher' label='Publisher' width={5} onChange={handleChange} />
                                <FormInput name='yearPublished' label='Year of Publication' width={3} onChange={handleChange} />
                                <label
                                    style={{
                                        display: 'block',
                                        margin: '0 0 0.28571429rem 0',
                                        color: 'rgba(0, 0, 0, .87)',
                                        fontSize: '0.92857143em',
                                        fontWeight: '700',
                                        textTransform: 'none',
                                    }}
                                >
                                    No. of Copies
                                </label>
                                <FormGroup>
                                    <FormButton icon='minus' onClick={handleDecrement}/>
                                    <FormInput name='count' width={2} value={formData.count}/>
                                    <FormButton icon='plus' onClick={handleIncrement}/>
                                </FormGroup>
                                <FormGroup>
                                    <FormButton type='submit' content='Submit' primary/>
                                    <FormButton content='Cancel' onClick={() => setOpen(false)} negative/>
                                </FormGroup>
                            </Form>
                        </Segment>
                    </Segment>
                </div>
            )}
        </Modal>
    )
}

export default AddItemModal;