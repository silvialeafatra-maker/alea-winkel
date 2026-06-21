import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
  try {
    const { id, status } = await req.json();

    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) throw error;

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