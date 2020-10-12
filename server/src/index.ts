import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})