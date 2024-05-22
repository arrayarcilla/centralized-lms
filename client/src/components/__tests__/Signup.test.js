import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from '../Signup';

describe('RegisterForm', () => {
    it('should show error message on missing form data', async () => {
        const { getByText, getByLabelText } = render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        );

        fireEvent.click(getByText(/Create My Account/i));

        await waitFor(() => {
            expect(getByText(/Please fill up all fields to continue registration/i)).toBeInTheDocument();
        });
    });

    it('should show error message when passwords do not match', async () => {
        const { getByText, getByLabelText } = render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText(/^Password$/i), { target: { value: 'password123' } });
        fireEvent.change(getByLabelText(/Confirm Password/i), { target: { value: 'password321' } });
        fireEvent.click(getByText(/Create My Account/i));

        await waitFor(() => {
            expect(getByText(/Passwords do not match, please confirm your password by re-entering it./i)).toBeInTheDocument();
        });
    });

    it('should navigate to home on successful registration', async () => {
        const mockFetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            })
        );
        global.fetch = mockFetch;

        const { getByText, getByLabelText } = render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText(/^Password$/i), { target: { value: 'password123' } });
        fireEvent.change(getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
        fireEvent.click(getByText(/Create My Account/i));

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith(
                'http://localhost:3000/create_user',
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: 'testuser',
                        password: 'password123',
                        confirmp: 'password123',
                    }),
                })
            );
        });

        // Verify navigation - you might need to mock `useNavigate` and verify it's called
    });
});