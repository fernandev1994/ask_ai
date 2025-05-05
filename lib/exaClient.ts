export async function searchExa(query: string) {

  const response = await fetch('https://api.exa.ai/search', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_EXA_API_KEY as string,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      numResults: 5,
      useAutoprompt: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Exa search failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.results || [];
}
