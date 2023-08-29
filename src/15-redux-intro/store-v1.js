const { createStore, combineReducers } = require("redux");

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload };
    case " account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

function requestLoan(amount, loanPurpose) {
  return {
    type: "accountRequestLoan",
    payload: {
      amount,
      loanPurpose,
    },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function customerReducer(state= initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "cuctomer/update":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
      };
    default:
      return state;
  }
}

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
    },
  };
}

const rootReducer = combineReducers(accountReducer, customerReducer);

const store = createStore(rootReducer);

store.dispatch({ type: "account/deposit", payload: 500 });

//to get the current state
console.log(store.getState());
store.dispatch(requestLoan(12000, "to buy a car"));
console.log(store.getState());
