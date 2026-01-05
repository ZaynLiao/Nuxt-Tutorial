export default defineEventHandler(async (event) => {
  const method = event.method;
  const query = getQuery(event);

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (method === "GET") {
    return {
      status: "success",
      message: "Hello from Nuxt Server!",
      timestamp: new Date().toISOString(),
      query,
    };
  }

  if (method === "POST") {
    const body = await readBody(event);
    return {
      status: "created",
      message: "Data received successfully",
      data: body,
    };
  }
});
