// Enable server-side rendering for this API endpoint
export const prerender = false;

export async function GET() {
  return new Response(
    JSON.stringify({
      message: 'API is working!',
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export async function POST({ request }) {
  try {
    const body = await request.text();
    console.log('Test API received:', body);
    
    return new Response(
      JSON.stringify({
        success: true,
        received: body,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}