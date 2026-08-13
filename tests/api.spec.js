import { test, expect } from '@playwright/test';

test.describe('CRUD tests', () => {

    test.describe.configure({ mode: 'serial' });
    const baseURL = 'https://restful-booker.herokuapp.com';
    let id;
    let authToken;

    const bookingData = {
        "firstname" : "Bogdan",
        "lastname" : "Zabotkin",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    };

    const newBookingData = {
        "firstname" : "Bogdan",
        "lastname" : "Zabotkin",
        "totalprice" : 5000,  //new total price
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    };

    test('Create booking', async ({request}) => {
        const response = await request.post(`${baseURL}/booking`, {
            data: bookingData,
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.bookingid).toBeDefined();
        id = body.bookingid;

        expect(body.booking).toMatchObject(bookingData);
    });

    test('Read info with id', async ({request}) =>{

        const response = await request.get(`${baseURL}/booking/${id}`);
        
        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toMatchObject(bookingData);
    });

    test('PUT request with new data', async ({request}) => {
        const authResponse = await request.post(`${baseURL}/auth`, {
            data: {
                username: 'admin',
                password: 'password123',
            }
        });

        expect(authResponse.status()).toBe(200);

        const authBody = await authResponse.json();
        expect(authBody.token).toBeDefined();
        authToken = authBody.token;

        const response = await request.put(`${baseURL}/booking/${id}`, {
            headers: {
                'Cookie': `token = ${authToken}`
            },

            data: newBookingData
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toMatchObject(newBookingData);
    });

    test('Delete test', async ({request}) => {
        const deleteResponse = await request.delete(`${baseURL}/booking/${id}`, {
            headers: {
                'Cookie': `token=${authToken}`
            }
        });

        expect(deleteResponse.status()).toBe(201);

        const getResponse = await request.get(`${baseURL}/booking/${id}`);
        
        expect(getResponse.status()).toBe(404);
    });
});
