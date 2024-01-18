import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

import { SearchParamsModel, ApiErrors, HTTP_CODE_ERRORS } from '@/models';

export async function GET(req: NextRequest) {
    const room = req.nextUrl.searchParams.get(SearchParamsModel.ROOM);
    const username = req.nextUrl.searchParams.get(SearchParamsModel.USERNAME);

    if (!room) {
        return NextResponse.json(
            { error: ApiErrors.ROOM_MISSING },
            { status: HTTP_CODE_ERRORS.BAD_REQUEST }
        );
    } else if (!username) {
        return NextResponse.json(
            { error: ApiErrors.USERNAME_MISSING },
            { status: HTTP_CODE_ERRORS.BAD_REQUEST }
        );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
        return NextResponse.json(
            { error: ApiErrors.SERVER_MISCONFIGURED },
            { status: HTTP_CODE_ERRORS.INTERNAL_ERROR }
        );
    }

    const at = new AccessToken(apiKey, apiSecret, { identity: username });

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

    return NextResponse.json({ token: at.toJwt() });
}
