import { Modal } from 'flowbite-react'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { useAppSelector } from '../../../config'
import { useState } from "react";
import './Orders.css'
import DetailOrder from './DetailOrder/DetailOrder'

export default function Orders() {

    const user = useAppSelector(state => state.user)
    const [calificacion, setCalificacion] = useState<boolean>(false)

    const [orderId, setOrderId] = useState<object>()

    function closeCalificacion() {
        setCalificacion(false)
    }

    console.log(user)

    function handleOrderDatailModal(order: any) {
        setOrderId(order)
        setCalificacion(true)
    }

    return (
        <div className='main_conteiner_order' data-aos="fade-left" data-aos-duration="1500">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Mis compras</h1>
            {
                user.orders && user.orders.length > 0 ?
                    user.orders.map((order: any) => {
                        return (
                            <div id="conteiner_order" key={order.date}>
                                {
                                    user.orders.delivered === true ?
                                        <span>🟢 Entregado</span>
                                        :
                                        <span>🔵 En proceso</span>
                                }
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Fecha</h3>
                                <p>{order.date}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Pago</h3>
                                <p>{order.payment}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Total</h3>
                                <p>$ {order.total}</p>
                                <hr />
                                {
                                    user.orders.delivered === true ?
                                        <button onClick={() => handleOrderDatailModal(order)}>Calificar</button>
                                        :
                                        <button onClick={() => handleOrderDatailModal(order)}>Calificar</button>
                                }
                            </div>
                        )
                    })
                    :
                    <div>
                        <h3>No hiciste ninguna compra !</h3>
                    </div>
            }
            <Modal
                show={calificacion}
                onClose={closeCalificacion}
            >
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <DetailOrder
                        order={orderId}
                    ></DetailOrder>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </div>
    )
}