import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item}/>
  }
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      persistentScrollbar={true}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
