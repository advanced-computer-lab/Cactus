import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Checkout from './Checkout'


const PUBLIC_KEY = "pk_test_51JuGmbLQ3FOQnPag2Ykl6ygx54ZbC7ii7rwGkfDWzg3SLzkbnUjoHIhVPG0aTiAGc6nMqsJzGfJkqulIToO8hA3L00bnY2c5ip"
const stripeTestPromise = loadStripe(PUBLIC_KEY);


export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <Checkout />
        </Elements>
    )
}
