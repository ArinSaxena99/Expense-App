import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useTranslation } from "react-i18next";
const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const {t} =useTranslation();

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod={t('summary.total')}
      fallbackText="No registered expense found"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
