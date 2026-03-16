import { NextResponse } from "next/server";

import { ApiError, toApiErrorPayload } from "@/lib/api/errors";

export function ok<T>(payload: T, init?: ResponseInit) {
  return NextResponse.json(payload, init);
}

export function created<T>(payload: T) {
  return NextResponse.json(payload, { status: 201 });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function handleRouteError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(toApiErrorPayload(error), { status: error.status });
  }

  console.error(error);

  return NextResponse.json(
    {
      error: {
        code: "INTERNAL_ERROR",
        message: "Da xay ra loi he thong",
      },
    },
    { status: 500 },
  );
}
