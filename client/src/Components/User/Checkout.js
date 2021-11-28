import React, { useState, useContext } from 'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import './Checkout.css'
import Search from '../../Views/User/Logic/Search'
import { UserContext } from '../../Context/UserContext'
import { CircularProgress, Alert } from '@mui/material'

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fonFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }

}

export default function Checkout() {
    const { success, setSuccess, setLoginOpen, handleReserve } = Search()
    const [loading, setLoading] = useState(false)
    const elements = useElements()
    const stripe = useStripe()
    const { loggedUser } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (loggedUser === null) {
            setLoginOpen(true)
            setLoading(false)
        } else {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            })
            if (!error) {
                try {
                    const { id } = paymentMethod
                    const response = await axios.post("/Authentication/Checkout", {
                        amount: 1000,
                        id: id
                    })
                    if (response.data.success) {
                        console.log("successful payment")
                        handleReserve()
                        setLoading(false)
                        setSuccess(true)
                    }
                } catch (error) {
                    console.log("Error: ", error)
                }
            } else {
                console.log(error.message)
            }
        }
    }
    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button className="StripeButton">{loading ? <CircularProgress color="inherit" aria-busy="true"/> : "Pay"}</button>
                </form>
                :
                <div>
                    <Alert severity="info">Payment Successful and Your flights have been booked successfully</Alert>
                </div>
            }
        </>
    )
}