import { useEffect, useState } from "react";
import Pricing from "./Pricing";
import axios from "axios";
import { Button } from "./Button";
import Razorpay from "razorpay";
import Loader from "./Loader";

interface coinsPack {
    id: string,
    coins: number,
    price: number,
    active: boolean
}
export default function AddCoins() {
    const [loader, setLoader] = useState(true);

    const [packs, setPacks] = useState<coinsPack[]>([])
    const [select, setSelect] = useState(false)
    const [purchased, setPurchased] = useState("")

    useEffect(() => {
        async function getData() {
            const res = await axios.get('https://backend.aryansharma6779.workers.dev/api/v1/payment/pricing')

            setPacks(res.data.message)
            setLoader(false)
        }
        getData()

    }, [])

    async function payment() {
        try {

            console.log(purchased);
            
            const res = await axios.post('https://backend.aryansharma6779.workers.dev/api/v1/payment/create-order',
                {
                    packId: purchased
                }
            )
            console.log(res);
            const order = res.data.order
            const options = {
                "key": "rzp_test_xbBBesjZCo0EmK",
                "amount": order.amount,
                "currency": "INR",
                "name": "Payment razorpay",
                "description": "Test Transaction",
                "image": "/et.png",
                "order_id": order.id,

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                // "handler": function (response: any) {
                //   alert(response.razorpay_payment_id);
                //   alert(response.razorpay_order_id);
                //   alert(response.razorpay_signature)
                // },
                handler: async function (response: any) {
                    try {
                        console.log('Payment Success:', response);

                        const res = await axios.post('https://backend.aryansharma6779.workers.dev/api/v1/payment/verify-order', {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            packId : purchased

                        }, {
                            headers: {
                                Authorization: localStorage.getItem('Authorization')
                            }
                        })
                        alert(res.data.message)
                    }
                    catch (e: any) {
                        alert('Payment verification failed.');
                        console.error(e);
                    }
                },
                "prefill": {
                    "name": "Madhav Thakur ",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const rzp1 = new window.Razorpay(options);


            rzp1.open()

        }
        catch (e: any) {
            alert("some error")
        }
    }

    return <>
        {(loader)?
        <div className="flex items-center justify-center justify-items-center h-screen">
            <Loader/> 
            </div>: 
        <div className="w-screen h-screen bg-gray-50 flex flex-col items-center justify-center">
                <div className="font-bold text-2xl ">Available Packs</div>
            <div

                className="border rounded-lg border-black min-w-[200px] min-h-[200px] md:w-[700px] lg:pt-16 grid   grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  p-4 gap-4  justify-items-center">
                {packs.map((pack, index) => (
                    (pack.active) ? <Pricing id={pack.id} coins={pack.coins} price={pack.price} index={index} setSelect={setSelect} setPurchased={setPurchased} purchased={purchased} ></Pricing> : null
                ))}


            </div>
            {select ? <Button onClick={payment} label="Pay" /> : null}


        </div>

            }
    </>
            
}