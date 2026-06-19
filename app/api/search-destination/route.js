export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("q");

  const response = await fetch(
    `https://rajaongkir.komerce.id/api/v1/destination/domestic-destination?search=${search}`,
    {
      headers: {
        key: process.env.RAJAONGKIR_API_KEY,
      },
    }
  );

  const data = await response.json();

  return Response.json(data);
}