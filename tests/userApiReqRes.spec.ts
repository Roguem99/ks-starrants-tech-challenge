import { test, expect, APIResponse } from '@playwright/test';

/**
 * [GET]
 */
test('should get a user', async ({ request }) => {
    const userTwoData = await request.get(`/api/users/2`);
    let statusMsg = createStatusMessage(userTwoData);
    expect(userTwoData.ok(), {message: statusMsg}).toBeTruthy();
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
test('should get a list of users', async ({ request }) => {
    const getUserList = await request.get(`/api/users?page=2`);

    let statusMsg = createStatusMessage(getUserList);
    expect(getUserList.ok(), {message: statusMsg}).toBeTruthy();
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
 */
test('should register a user', async ({ request }) => {
    const registerEmail = 'eve.holt@reqres.in'
    const registerPW = 'pistol'

    const registerUser = await request.post(`/api/register`, {
        data: {
            email: registerEmail,
            password: registerPW
        }
    });
    let statusMsgRegister = createStatusMessage(registerUser);
    expect(registerUser.status(), {message: statusMsgRegister}).toBe(200);

    const registeredUserJson = await registerUser.json();
    expect(await registeredUserJson).toEqual(expect.objectContaining({
        id: expect.any(Number),
        token: expect.any(String)
    }));

    const regUserId = registeredUserJson.id;
    const regUserData = await request.get(`/api/users/${regUserId}`);
    let statusMsgUserData = createStatusMessage(regUserData);
    expect(regUserData.ok(), {message: statusMsgUserData}).toBeTruthy();
    expect(await regUserData.json()).toEqual(expect.objectContaining({
        data: {
            avatar: "https://reqres.in/img/faces/4-image.jpg",
            id: regUserId,
            email: registerEmail,
            first_name: "Eve",
            last_name: "Holt"
        },
        support: {
            text: "Tired of writing endless social media content? Let Content Caddy generate it for you.",
            url: "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
        },
    }));
});

/**
 * [PUT]
 */
test('should update user 2', async ({ request }) => {
    const putUser = await request.put(`/api/users/2`, {
        data: {
            name: "morpheus",
            job: "zion resident"
        }
    });
    let statusMsg = createStatusMessage(putUser);
    expect(putUser.ok(), {message: statusMsg}).toBeTruthy();

    const userBodyJson = await putUser.json();

    expect(userBodyJson).toEqual(expect.objectContaining({
        name: "morpheus",
        job: "zion resident"
    }));
});

/**
 * [DELETE]
 */
test('should delete user 2', async ({ request }) => {
    const putUser = await request.delete(`/api/users/2`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let statusMsg = createStatusMessage(putUser);
    expect(putUser.status(), {message: statusMsg}).toBe(204);
});

/**
 * [GET]
 * NEGATIVE TEST
 */
test('should attempt to get a nonexistent user', async ({ request }) => {
    const invalidUser = await request.get(`/api/users/8966678`);

    let statusMsg = createStatusMessage(invalidUser);
    expect(invalidUser.status(), {message: statusMsg}).toBe(404);
});

/**
 * [POST]
 * NEGATIVE TEST
 */
test('should create a user', async ({ request }) => {
    const loginReq = await request.post(`/api/login`, {
        data: {
            no: "invalid",
            yes: "not valid"
        }
    });

    let msgString = (await loginReq.text()).toString();
    let statusMsg = createStatusMessage(loginReq);

    expect(loginReq.status(), {message: statusMsg}).not.toBe(200);
    expect(msgString).toBe('{\"error\":\"Missing email or username\"}');
});


/**
 * 
 * @param resp - {APIResponse} from an APIRequest
 * @returns - {string} formatted message for more clear error reporting.
 */
function createStatusMessage(resp: APIResponse): string {
    return `Status Code was ${resp.status()} - ${resp.statusText()}`
}