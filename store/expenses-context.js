import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "Some bananas",
    amount: 89.99,
    date: new Date("2025-06-30"),
  },
  {
    id: "e3",
    description: "A book",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e6",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e7",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e8",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e10",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e11",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e12",
    description: "Another book",
    amount: 15.99,
    date: new Date("2018-12-01"),
  },
  {
    id: "e15",
    description: "A pair of trousers",
    amount: 35.99,
    date: new Date("2020-11-01"),
  },
  {
    id: "e17",
    description: "Another book",
    amount: 15.99,
    date: new Date("2025-7-01"),
  }
];
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
        return state.filter((expense) => expense.id !==action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value ={
    expenses:expensesState,
    addExpense:addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  };
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
export default ExpensesContextProvider;
