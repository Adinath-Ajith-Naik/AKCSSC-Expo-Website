const express = require('express');
const app = express();
const path = require('path');


app.use(express.static('./dist/AKCSSC-Expo-Website'));

app.get('/healthCheck', (request, response) => {
    response.status(200).send("<h2> Server is UP! Welcome to Health Check </h2>");
})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/AKCSSC-Expo-Website/index.html'));
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening at ", port);
});