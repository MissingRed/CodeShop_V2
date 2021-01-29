import React, { useContext } from "react";
import ReactDOM from "react-dom";
import paypal from "paypal-checkout";
import { db } from "../Database/Base";
import Swal from "sweetalert2";
import { AuthContext } from "../Database/Auth";

const PaypalCheckoutButton = ({ order, img }) => {
  const { currentUser } = useContext(AuthContext);

  const paypalConf = {
    currency: "USD",
    env: "sandbox",
    client: {
      sandbox:
        "AYOqq_M_8gGO6RpJBX-RIdzntFzFnzsecmfFszuhBf9QcGNjFkr13nfa0IRD4uiKV-h_oFRCIRjhXRKV",
      production: "--",
    },
    style: {
      label: "pay",
      layout: "horizontal",
      fundingicons: "true",
      size: "responsive", // small | medium | large | responsive
      shape: "rect", // pill | rect
      color: "blue", // gold | blue | silver | black
    },
    funding: {
      allowed: [paypal.FUNDING.CARD],
      disallowed: [paypal.FUNDING.CREDIT],
    },
  };

  const PayPalButton = paypal.Button.driver("react", { React, ReactDOM });

  const PostTransactionsPaypal = async (linkObject) => {
    try {
      await db.collection("transactions").doc().set(linkObject);
    } catch (error) {
      console.log(error);
    }
    Swal.fire({
      icon: "success",
      title: "¡Compra realizada con exito!",
      text: "Gracias por comprar en CodeShop",
      footer: "<a href=../Purchases>Ver Detalles de la compra </a>",
    });
  };

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency,
          },
          description: "Compra en CodeShop",
          custom: order.customer || "",
          item_list: {
            items: order.items,
          },
        },
      ],
      note_to_payer: "Contáctanos para cualquier aclaración sobre tu compra.",
    };

    return actions.payment.create({
      payment,
    });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment
      .execute()
      .then((response) => {
        PostTransactionsPaypal({ ...response, uid: currentUser.uid, img: img });
      })
      .catch((error) => {
        console.log(error);
        alert("Ocurrió un error al procesar el pago con Paypal");
      });
  };

  const onError = (error) => {
    alert("El pago con PayPal no fue realizado, vuelva a intentarlo.");
  };

  const onCancel = (data, actions) => {
    alert(
      "El pago con PayPal no fue realizado, el usuario canceló el proceso."
    );
  };

  return (
    <div>
      <PayPalButton
        env={paypalConf.env}
        client={paypalConf.client}
        payment={(data, actions) => payment(data, actions)}
        onAuthorize={(data, actions) => onAuthorize(data, actions)}
        onCancel={(data, actions) => onCancel(data, actions)}
        onError={(error) => onError(error)}
        style={paypalConf.style}
        commit
        locale="es_CO"
      />
    </div>
  );
};

export default PaypalCheckoutButton;
