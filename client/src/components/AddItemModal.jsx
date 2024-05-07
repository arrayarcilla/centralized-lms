//--- Important Imports
import React, { useState, useEffect, useRef } from 'react';

//--- Other Imports
import {
    Form, FormInput, FormSelect, FormGroup, FormButton,
    Table, TableBody, TableCell, TableRow,
    Modal, ModalHeader, ModalContent, ModalActions,
    Header,
    Segment,
    Button,
} from 'semantic-ui-react';


function AddItemModal() {
    
    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        isbn: '',
        publisher: '',
        year: '',
        copies: 1,
    });

    useEffect(() => {           // Sets formData to be empty if 'open' is false
        if (!open) {
            setFormData({
                title: '',
                author: '',
                category: '',
                isbn: '',
                publisher: '',
                year: '',
                copies: 1, 
            })
        }
    }, [open])
        
    // Functions increment or decrement value of copies on button click
    const handleIncrement = (e) => {
        e.preventDefault();
        setFormData((prevFormData) => ({ ...prevFormData, copies: prevFormData.copies + 1}))
    }
    const handleDecrement = (e) => {
        e.preventDefault();
        if (formData.copies > 1) {
            setFormData((prevFormData) => ({ ...prevFormData, copies: prevFormData.copies - 1 }));
        }
    }

    // Sets values for category select dropdown menu
    const categoryOptions = [
        { key: '0', text: 'Fiction', value: 'fiction' },
        { key: '1', text: 'Non-Fiction', value: 'non_fiction' },
        { key: '2', text: 'Reference', value: 'reference' },
        { key: '3', text: 'Others', value: 'others' },
    ]
    // Handles value change for select dropdown menu
    const handleSelectChange = (e, { value }) => {
        setFormData((prevFormData) => ({ ...prevFormData, category: value }))
    }
    //Handles value change for counter
    const handleCounterChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value === '' ? 1 : parseInt(value),
        })
    }
    // Handles value change for all other inputs
    const handleChange = (e) => {
        setFormData({ 
            ...formData, [e.target.name]: e.target.value 
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/addItem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Set headers for JSON data
                body: JSON.stringify(formData), // Convert formData to JSON string
            });

            if (response.ok) {
                setFormData((prevFormData) => ({ ...prevFormData, copies: 1 }));
            }
        } catch (error) {
            console.error('Error adding item: ', error);
            // Error handlers go here
        }
    };

    return (
        <>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button content='Add New Book' color='blue' basic />}
            >
                <ModalHeader>
                    Add New Book
                </ModalHeader>
                {open && (
                    <div>
                        <Segment padded raised>
                            <Segment padded raised>
                                <Form>
                                    <FormInput name='title' label='Title' width={5} onChange={handleChange} />
                                    <FormInput name='author' label='Author' width={5} onChange={handleChange} />
                                    <FormSelect 
                                        name='category'
                                        label='Category'
                                        options={categoryOptions}
                                        placeholder='Fiction'
                                        width={3}
                                        onChange={handleSelectChange}
                                    />
                                    <FormInput name='isbn' label='ISBN' width={3} onChange={handleChange} />
                                    <FormInput name='publisher' label='Publisher' width={5} onChange={handleChange} />
                                    <FormInput name='year' label='Year of Publication' width={3} onChange={handleChange} />
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
                                        <FormInput name='copies' width={2} value={formData.copies} onChange={handleCounterChange}/>
                                        <FormButton icon='plus' onClick={handleIncrement}/>
                                    </FormGroup>
                                    <FormGroup>

                                        <Modal
                                            onClose={() => setConfirmOpen(false)}
                                            onOpen={() => setConfirmOpen(true)}
                                            open={confirmOpen}
                                            trigger={<FormButton content='Submit' primary/>}
                                        >
                                            <ModalHeader content='Are you sure you want to add this book?' />
                                            <ModalContent>
                                                <Header>You are adding: </Header>
                                                <Table definition>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>Title</TableCell>
                                                            <TableCell>{formData.title}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Author</TableCell>
                                                            <TableCell>{formData.author}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Category</TableCell>
                                                            <TableCell>{formData.category}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>ISBN</TableCell>
                                                            <TableCell>{formData.isbn}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Publisher</TableCell>
                                                            <TableCell>{formData.publisher}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Year</TableCell>
                                                            <TableCell>{formData.year}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Copies</TableCell>
                                                            <TableCell>{formData.copies}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </ModalContent>
                                            <ModalActions>

                                                <Modal
                                                    onClose={() => setSuccessOpen(false)}
                                                    onOpen={() => setSuccessOpen(true)}
                                                    open={successOpen}
                                                    trigger={<Button type='submit' content='Yes' primary onClick={handleSubmit} />}
                                                >
                                                    <ModalHeader content='Success!' />
                                                    <ModalContent content='Book has been successfully added.' />
                                                    <ModalActions>
                                                        <Button content='OK' positive onClick={() => {setSuccessOpen(false); setConfirmOpen(false); setOpen(false)}} />
                                                    </ModalActions>
                                                </Modal>
                                                
                                                <Button content='No' negative onClick={() => setConfirmOpen(false)} />
                                            </ModalActions>
                                        </Modal>

                                        <FormButton content='Cancel' onClick={() => setOpen(false)} negative/>
                                    </FormGroup>
                                </Form>
                            </Segment>
                        </Segment>
                    </div>
                )}
            </Modal>

            
        </>
    )
}

export default AddItemModal;