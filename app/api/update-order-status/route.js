import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
  try {
    const { id, status } = await req.json();

    const { data: order, error: fetchError } =
      await supabaseAdmin
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError) throw fetchError;

    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) throw error;

    if (status === "Paid") {
      await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-confirmed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: order.email,
            fullName: order.full_name,
            orderNumber: order.order_number,
            total: order.total,
          }),
        }
      );
    }

    return Response.json({
      success: true,
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}