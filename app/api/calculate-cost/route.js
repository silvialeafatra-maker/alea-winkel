import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost",
    {
      method: "POST",
      headers: {
        key: process.env.RAJAONGKIR_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        origin: "65420",
        destination: "73918",
        weight: "1000",
        courier: "jnt",
      }),
    }
  );

  const data = await response.json();

  return Response.json(data);
}

export async function POST(req) {
  try {
    const { destination, weight = 1000 } = await req.json();

    const response = await fetch(
      "https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost",
      {
        method: "POST",
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          origin: "65420",
          destination: String(destination),
          weight: String(weight),
          courier: "jnt",
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed calculate cost" },
      { status: 500 }
    );
  }
}