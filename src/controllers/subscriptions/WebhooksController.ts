import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe";
import { saveSubscription } from "../../utils/menageSubscription";

class WebhooksController{
    async handle(req: Request, res: Response){
        let event: Stripe.Event = req.body;

        const signature = req.headers['stripe-signature']
        let endpointSecret = 'whsec_06a51a52062ad79c337231a4b0989d1db70ba3172fb189df40c56687fe11a792'

        try{

            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            )

        }catch(err){
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        switch(event.type){
            case 'customer.subscription.deleted': 
                const payment = event.data.object as Stripe.Subscription;
                await saveSubscription(
                    payment.id,
                    payment.customer.toString(),
                    false,
                    true
                )
            break;

            case 'customer.subscription.updated':
                const paymentIntent = event.data.object as Stripe.Subscription;
                await  saveSubscription(
                    paymentIntent.id,
                    paymentIntent.customer.toString(),
                    false
                )
            break;

            case 'checkout.session.completed':
                const checkoutSession = event.data.object as Stripe.Checkout.Session;

                await saveSubscription(
                    checkoutSession.subscription.toString(),
                    checkoutSession.customer.toString(),
                    true
                )
            break;
            default: 
            console.log(`Evento desconhecido ${event.type}`)
        }

        res.send();

    }
}

export {WebhooksController}