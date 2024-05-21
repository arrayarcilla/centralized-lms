import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../Login';

global.fetch = require('jest-fetch-mock');

describe('LoginForm', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    test('should navigate to dashboard on admin login', async () => {
        fetch.mockResponseOnce(JSON.stringify({ id: 1, usertype: 'admin' }));

        const { getByLabelText, getByText } = render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'adminuser' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(getByText(/submit/i));

        await waitFor(() => expect(window.location.pathname).toBe('/dashboard'));
    });

    test('should navigate to home on member login', async () => {
        fetch.mockResponseOnce(JSON.stringify({ id: 2, usertype: 'member' }));

        const { getByLabelText, getByText } = render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'memberuser' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(getByText(/submit/i));

        await waitFor(() => expect(window.location.pathname).toBe('/home'));
    });

    test('should show error message on invalid login', async () => {
        fetch.mockResponseOnce(JSON.stringify({}));

        const { getByLabelText, getByText } = render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        fireEvent.change(getByLabelText(/username/i), { target: { value: 'invaliduser' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(getByText(/submit/i));

        await waitFor(() => expect(getByText(/login failed/i)).toBeInTheDocument());
    });
});
