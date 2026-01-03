'use server';

import { cookies } from "next/headers";

export async function handleLogin(userId: string, accessToken:string, refreshToken:string, userName?: string){
    const cookieStore = await cookies();
    const baseOptions = {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        sameSite: 'lax' as const
    };

    cookieStore.set(
        'session_userid',
        userId,
        {
            ...baseOptions,
            httpOnly: true
        }
    );

    cookieStore.set(
        'session_refresh_token',
        refreshToken,
        {
            ...baseOptions,
            httpOnly: true
        }
    );

    cookieStore.set(
        'session_access_token',
        accessToken,
        {
            ...baseOptions,
            httpOnly: false, // Must be false to allow client-side JavaScript access
            maxAge: 60 * 60
        }
    );

    // Store user name
    if (userName) {
        cookieStore.set(
            'session_username',
            userName,
            {
                ...baseOptions,
                httpOnly: false
            }
        );
    }
    
}

export async function resetAuthCookies(){
    const cookieStore = await cookies();
    const clearedOptions = {
        path: '/',
        maxAge: 0,
        sameSite: 'lax' as const
    };

    cookieStore.set('session_userid', '', clearedOptions);
    cookieStore.set('session_access_token', '', clearedOptions);
    cookieStore.set('session_refresh_token', '', clearedOptions);
    cookieStore.set('session_username', '', clearedOptions);
}

//Getting Data

export async function getUserId(){
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_userid')?.value;
    return userId ? userId : null;
}

export async function getAccessToken(){
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getUserName(){
    const cookieStore = await cookies();
    
    // First try to get from cookie (fastest)
    const storedName = cookieStore.get('session_username')?.value;
    if (storedName) {
        return storedName;
    }
    
    // Fallback: fetch from API
    const userId = await getUserId();
    if (!userId) return null;
    
    try {
        const token = cookieStore.get('session_access_token')?.value;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/auth/me/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.name || null;
        }
    } catch (error) {
        console.error('Error fetching user name:', error);
    }
    
    return null;
}

export async function handleRefresh(){
    console.log('Handle Refresh');

    const cookieStore = await cookies();

    const refreshToken=await getRefreshToken();

    const token = await fetch('http://localhost:8000/api/v1/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) => {
            console.log('Response-Refresh', json)

                if(json.access){
                    cookieStore.set(
                        'session_access_token',
                        json.access,
                        {
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 7,
                            path: '/',
                            sameSite: 'lax'
                        }
                    );

                return json.access;
            }else{
                resetAuthCookies();
            }
        })
        .catch((error) => {
            console.log('error', error);

            resetAuthCookies();
        }) 

        return token;
}


export async function getRefreshToken(){
    const cookieStore = await cookies();
    return cookieStore.get('session_refresh_token')?.value;
}


