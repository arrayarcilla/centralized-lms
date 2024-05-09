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
    Popup,
} from 'semantic-ui-react';


function EditItemModal({ book, open, closeModal }) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)

    const [formData, setFormData] = useState({
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        isbn: book.isbn,
        publisher: book.publisher,
        year: book.year,
        currentCopies: book.copies,
        addedCopies: 0,
    });

    // Functions increment or decrement value of copies on button click
    const handleIncrement = (e) => {
        e.preventDefault();
        setFormData((prevFormData) => ({ ...prevFormData, addedCopies: prevFormData.addedCopies + 1 }));
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
    const handleChange = (e) => {
        setFormData({ 
            ...formData, [e.target.name]: e.target.value 
        });
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/updateItem', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }, // Set headers for JSON data
                body: JSON.stringify(formData), // Convert formData to JSON string
            });
            if (response.ok) { setFormData((prevFormData) => ({ ...prevFormData, addedCopies: 1 })); }
        } catch (error) { console.error('Error adding item: ', error); }
    };

    const categoryMap = {
		fiction: 'Fiction',
		non_fiction: 'Non-fiction',
		reference: 'Reference',
		others: 'Others',
	};

    useEffect(() => { // Sets formData to be empty if 'open' is false
        if (!open) {
            setFormData({
                id: book.id,
                title: book.title,
                author: book.author,
                category: book.category,
                isbn: book.isbn,
                publisher: book.publisher,
                year: book.year,
                currentCopies: book.copies,
                addedCopies: 0,
            })}
    }, [open])

    return (
        <>
            <Modal
                open={open}
            >
                <ModalHeader>
                    Edit Book Info
                </ModalHeader>
                {open && (
                    <div>
                        <Segment padded raised>
                            <Segment padded raised>
                                <Form>
                                    <FormInput name='title' label='Title' placeholder={book.title} width={5} onChange={handleChange} />
                                    <FormInput name='author' label='Author' placeholder={book.author} width={5} onChange={handleChange} />
                                    <FormSelect 
                                        name='category'
                                        label='Category'
                                        value={formData.category}
                                        options={categoryOptions}
                                        placeholder={categoryMap[book.category] || book.category}
                                        width={3}
                                        onChange={handleSelectChange}
                                    />
                                    <FormInput name='isbn' label='ISBN' placeholder={book.isbn} width={3} onChange={handleChange} />
                                    <FormInput name='publisher' label='Publisher' placeholder={book.publisher} width={5} onChange={handleChange} />
                                    <FormInput name='year' label='Year of Publication' placeholder={book.year} width={3} onChange={handleChange} />
                                    <label style={{ display: 'block', margin: '0 0 0.28571429rem 0', olor: 'rgba(0, 0, 0, .87)', fontSize: '0.92857143em', fontWeight: '700', textTransform: 'none', }}>
                                        Add new copies. Current number of copies: {formData.currentCopies}
                                    </label>
                                    <FormGroup>
                                        <FormInput name='addedCopies' width={2} value={formData.addedCopies}/>
                                        <FormButton icon='plus' onClick={handleIncrement}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Modal
                                            onClose={() => setConfirmOpen(false)}
                                            onOpen={() => setConfirmOpen(true)}
                                            open={confirmOpen}
                                            trigger={<FormButton content='Submit' primary/>}
                                        >
                                            <ModalHeader content='Are you sure you want to edit this book?' />
                                            <ModalContent>
                                                <Header>Your changes: </Header>
                                                <Table definition>
                                                    <TableBody>
                                                        <TableRow><TableCell>Title</TableCell><TableCell>{formData.title}</TableCell></TableRow>
                                                        <TableRow><TableCell>Author</TableCell><TableCell>{formData.author}</TableCell></TableRow>
                                                        <TableRow><TableCell>Category</TableCell><TableCell>{formData.category}</TableCell></TableRow>
                                                        <TableRow><TableCell>ISBN</TableCell><TableCell>{formData.isbn}</TableCell></TableRow>
                                                        <TableRow><TableCell>Publisher</TableCell><TableCell>{formData.publisher}</TableCell></TableRow>
                                                        <TableRow><TableCell>Year</TableCell><TableCell>{formData.year}</TableCell></TableRow>
                                                        <TableRow><TableCell>Copies</TableCell><TableCell>Adding <b>{formData.addedCopies}</b> copies. <i>Library will have <b>{formData.addedCopies + formData.currentCopies}</b> copies after editing</i></TableCell></TableRow>
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
                                                    <ModalContent content='Book has been successfully edited.' />
                                                    <ModalActions>
                                                        <Button content='OK' positive onClick={() => {setSuccessOpen(false); setConfirmOpen(false); closeModal(false); window.location.reload()}} />
                                                    </ModalActions>
                                                </Modal>
                                                <Button content='No' negative onClick={() => setConfirmOpen(false)} />
                                            </ModalActions>
                                        </Modal>

                                        <FormButton content='Cancel' negative onClick={() => closeModal(false)}/>
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

export default EditItemModal;