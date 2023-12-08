import getNeusralCollection from '~/defer/getNeusralCollection';

export async function GET(request: Request) {
  try {
    await getNeusralCollection();

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}
