import { test, expect } from '@playwright/test';

/**
 * [GET]
 */
test('should get [GET] a user', async ({ request }) => {
    const userTwoData = await request.get(`/api/users/2`);

    expect(userTwoData.ok()).toBeTruthy();
    expect(await userTwoData.json()).toEqual(expect.objectContaining({
        data: {
            id: 2,
            email: "janet.weaver@reqres.in",
            first_name: "Janet",
            last_name: "Weaver",
            avatar: "https://reqres.in/img/faces/2-image.jpg"
        },
        support: {
            url: "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
            text: "Tired of writing endless social media content? Let Content Caddy generate it for you."
        }
    }));
});

/**
 * [GET]
 */
test('should get [GET] a list of users', async ({ request }) => {
    const getUserList = await request.get(`/api/users?page=2`);

    expect(getUserList.ok()).toBeTruthy();
    const respBodyJson = await getUserList.json();
    const userEightDetails = respBodyJson.data[1]

    expect(userEightDetails).toEqual(expect.objectContaining({
        id: 8,
        email: 'lindsay.ferguson@reqres.in',
        first_name: 'Lindsay',
        last_name: 'Ferguson',
        avatar: 'https://reqres.in/img/faces/8-image.jpg'
    }));
    expect(respBodyJson).toEqual(expect.objectContaining({
        page: 2,
        total_pages: 2
    }));
});

/**
 * [POST]
 * NOTE: RETURNS 401 BUT WORKS ON YAAK AND POSTMAN DESKTOP API APPLICATIONS
 *  ALL POST ENDPOINTS RETURNED THE SAME 401
 */
test('should register [POST] a user', async ({ request }) => {
    const registerEmail = 'eve.holt@reqres.in'
    const registerPW = 'pistol'

    const registerUser = await request.post(`/api/register`, {
        data: {
            email: registerEmail,
            password: registerPW
        }
    });

    expect(registerUser.status()).toBe(200);

    const registeredUserJson = await registerUser.json();
    expect(await registeredUserJson).toContainEqual(expect.objectContaining({
        id: Number,
        token: String
    }));

    const regUserId = registeredUserJson.id;
    const regUserData = await request.get(`/api/users/${regUserId}`);
    expect(regUserData.ok()).toBeTruthy();
    expect(await regUserData.json()).toEqual(expect.objectContaining({
        data: {
            id: regUserId,
            email: registerEmail,
        }
    }));
});

/**
 * [PUT]
 * NOTE: RETURNS 401 BUT WORKS ON YAAK AND POSTMAN DESKTOP API APPLICATIONS
 */
test('should update [PUT] user 2', async ({ request }) => {
    const putUser = await request.put(`/api/users/2`, {
        data: {
            name: "morpheus",
            job: "zion resident"
        }
    });
    let actualStatus = putUser.status();
    let actualStatusText = putUser.statusText();
    let checkstring = `Status Code was ${actualStatus} - ${actualStatusText}`;
    expect(putUser.ok(), {message: checkstring}).toBeTruthy();

    const userBodyJson = await putUser.json();
    const userTwoDetails = userBodyJson.data

    expect(userTwoDetails).toEqual(expect.objectContaining({
        name: "morpheus",
        job: "zion resident"
    }));
});

/**
 * [DELETE]
 * NOTE: RETURNS 401 BUT WORKS ON YAAK AND POSTMAN DESKTOP API APPLICATIONS
 */
test('should delete [DELETE] user 2', async ({ request }) => {
    const putUser = await request.delete(`/api/users/2`);
    let actualStatus = putUser.status();
    let actualStatusText = putUser.statusText();
    let checkstring = `Status Code was ${actualStatus} - ${actualStatusText}`;
    expect(actualStatus, {message: checkstring}).toBe(204);
});