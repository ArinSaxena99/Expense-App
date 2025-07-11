import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      // isValid: defaultValues ? true : false,
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      // isValid: !!defaultValues,
      isValid: true,
    },
  });

  const {t} = useTranslation();

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // show feedback
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formISInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>{t('Your Expense')}</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label={t('form.amount')}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => inputChangedHandler("amount", text),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label={t('form.date')}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (text) => {
              inputChangedHandler("date", text);
            },
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label={t('form.description')}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiLine: true,
          autocorrect: false,
          autoCapitalize: "none",
          multiline: true,
          onChangeText: (text) => {
            inputChangedHandler("description", text);
          },
          value: inputs.description.value,
        }}
      />
      {formISInvalid && (
        <Text style={styles.errorText}>
          Invalid Input values -please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          {t("button.cancel")}
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
