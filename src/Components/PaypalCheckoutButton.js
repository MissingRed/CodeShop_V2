import React from "react";
import ReactDOM from "react-dom";
import paypal from "paypal-checkout";

const PaypalCheckoutButton = ({ order }) => {
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
        console.log(response);
        alert(`El Pago fue procesado correctamente, ID: ${response.id}`);
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
