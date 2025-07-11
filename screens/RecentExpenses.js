import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { useTranslation } from "react-i18next";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const {t} = useTranslation();

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      // expensesPeriod="Last 7 Days"
      // fallbackText="No expenses registered for the last 7 days!"
      expensesPeriod={t('period.last7days')}
      fallbackText={t('messages.noRecentExpenses')}
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
