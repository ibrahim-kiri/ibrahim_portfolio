const TOKEN = '7064448025:AAF5tbO3ppBLq28SIHIcdrRLmP8jMqLPR9A';
const CHAT_ID = '6361862131';
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
const requestHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Max-Age': '86400'
}

async function handleRequest(request) {
  if(request.method == 'OPTIONS') {
    return new Response( null, { headers: requestHeaders })
  } else {
    const body = await request.json();
    const {name, email, message} = body;
    if (!name || !email || !message) {
      return new Response ('Please fill in all fields', {
        status: 200
      })
    }
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `<b> New Message Recieved.</b> \n\n <b>Name: </b> ${name} \n <b>Email: </b> ${email} \n <b>Message: </b> ${message} \n <b>IP: </b> ${request.headers.get('cf-connecting-ip')}`,
        parse_mode: 'HTML'
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json();
    const responseMessage = result.ok ? 'Your message has been successfully sent.' : 'An error occured while sending the message.'
    return new Response(responseMessage, {status: 200, headers: requestHeaders})
  }
};
