import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/apis/createOrder";

export async function POST(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  try {
    const payload = await req.json();
    try {
      await createOrder({ ...payload, status: "abandoned" }, apiKey);
    } catch (err) {
      const msg =
        typeof err === "string" ? err : ((err as Error)?.message ?? "");
      if (
        msg.toLowerCase().includes("offer") ||
        msg.toLowerCase().includes("product")
      ) {
        await createOrder(
          { ...payload, status: "abandoned", products: [] },
          apiKey,
        );
      } else {
        throw err;
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[abandoned-order] failed:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
