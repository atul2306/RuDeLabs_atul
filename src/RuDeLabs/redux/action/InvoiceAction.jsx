export const AddInvoiceAction = (invoice)=>{
    return {
        type: "ADD_INVOICE",
        payload:invoice
    }
}

export const ResetStoreAction = () => {
    return {
      type: "RESET_STORE",
    };
  };

  export const TotalAmountAction = (amount)=>{
    return {
        type: "TOTAL_AMOUNT",
        payload: amount
    }
  }
  export const TotalAmountLeftAction = (amount)=>{
    return {
        type: "TOTAL_AMOUNT_LEFT",
        payload: amount
    }
  }
  export const TotalAmountReceivedAction = (amount)=>{
    return {
        type: "TOTAL_AMOUNT_RECEIVED",
        payload: amount
    }
  }