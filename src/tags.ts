export interface Tag {
    response: string,
    trigger?: RegExp,
    code?: string
}

export const tags: Tag[] = [
    {
        trigger: /(test-regex)/,
        response: 'Hello from a regex!',
    },
    {
        response: 'Hello! This test is successful',
        code: 'test',
    },
    {
        trigger: /Not a valid player profile/,
        response: 'Make sure you have logged in once on your server so that there is a player profile for you. You can see a list of player profiles on your profile page in CSMM.\n\nOtherwise:\n- Log out and log back in to CSMM\n- If that did not fix it, please make a support ticket.',
        code: 'shop',
    },
    {
        trigger: /ER_NOT_SUPPORTED_AUTH_MODE/,
        response: `If you're getting the \`ER_NOT_SUPPORTED_AUTH_MODE\` error trying to startup, it means your MySQL install is using the new auth system - which is not compatible with CSMM. 

    Try following [these instructions](<https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server/50547109#50547109>) to change your MySQL password.`
    }
]