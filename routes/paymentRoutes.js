const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

// CREATE PAYMENT
router.post("/create-payment", async (req, res) => {

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Lawyer Booking"
                        },
                        unit_amount: 5000
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });

        res.json({ url: session.url });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;