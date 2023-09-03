require('crypto').randomBytes(48, (err, buffer) => { 
    const token = buffer.toString('hex'); 
    console.log(token); 
});
