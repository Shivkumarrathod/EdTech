import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(cors())
const PAYPAL_API = process.env.PAYPAL_API;
const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

app.post('/create-order', async (req, res) => {
  const order = {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '10.09'
      }
    }]
  };

  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString('base64');
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/capture-order', async (req, res) => {
  const { orderId } = req.body;
  console.log(orderId);
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString('base64');
    console.log(auth);
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {}, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/config/paypal",(req,res)=>{
  res.send({clientID:process.env.PAYPAL_CLIENT })
})

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
