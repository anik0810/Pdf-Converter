import urlExist from 'url-exist';

const exists = await urlExist('https://google.com');

// Handle result
console.log(exists);