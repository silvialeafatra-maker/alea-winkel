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
        destination: "73953",
        weight: "500",
        courier: "jnt",
        price: "lowest",
      }),
    }
  );

  const data = await response.json();

  return Response.json(data);
}