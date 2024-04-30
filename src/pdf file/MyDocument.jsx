import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReportsSumuries from "../components/ReportsSumuries";

import { infoArray } from "../components/TransactionForm";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const MyDocument = ({ report }) => {
  const info = [...infoArray, { data: "custom", total: "$0" }];

  const reportArr = info.map((e) => {
    if (report.find((el) => el.category.includes(e.data))) {
      const c = report.find((el) => el.category.includes(e.data));
      return { ...e, total: `$${c.amount}` };
    } else {
      return e;
    }
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Category</Text>
          {reportArr.map((el, i) => (
            <Text key={i}>{el.data}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Total</Text>
          {reportArr.map((el, i) => (
            <Text key={i}>{el.total}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;
