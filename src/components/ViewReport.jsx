import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, Button, ButtonToolbar, Table, Grid } from "rsuite";
import { Input, InputGroup } from "rsuite";
import { ControlRow } from "./UpdatePassword";
import { receiveReport } from "../feachers/user/userSlice";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  usePDF,
  Image,
  Font,
} from "@react-pdf/renderer";
import MyDocument from "../pdf file/MyDocument";
import ReportsSumuries from "./ReportsSumuries";
import { infoArray } from "./TransactionForm";
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  smallTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  page: {
    //flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  sec: {
    flexDirection: "row",
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: "50%",
  },
  text: {
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    borderTop: 1,
  },
});

const { Column, HeaderCell, Cell } = Table;
const ViewReport = ({ setEmailConf, dates }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);

  const { transactions, report } = useSelector((store) => store.transaction);
  const info = [...infoArray, { data: "custom", total: "$0" }];
  const reportArr = info.map((e) => {
    if (report.find((el) => el.category.includes(e.data))) {
      const c = report.find((el) => el.category.includes(e.data));
      return { ...e, total: `$${c.amount}` };
    } else {
      return e;
    }
  });
  const tran = [...transactions];

  const tranArr = tran
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((t, i) => {
      return { info: t.info, amount: t.amount };
    });
  const MyDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text
          style={styles.title}
        >{`Report for ${dates[0].toDateString()} to ${dates[1].toDateString()}`}</Text>
        <Text style={styles.title}>{`Summary`}</Text>
        <View style={styles.sec}>
          <View style={styles.section}>
            <Text style={styles.smallTitle}>Category</Text>

            {reportArr.map((el, i) => (
              <Text style={styles.text} key={i}>
                {el.data}
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.smallTitle}>Total Spent</Text>
            {reportArr.map((el, i) => (
              <Text style={styles.text} key={i}>
                {el.total}
              </Text>
            ))}
          </View>
        </View>
        <Text style={styles.title}>{`Transactions`}</Text>
        <View style={styles.sec}>
          <View style={styles.section}>
            <Text style={styles.smallTitle}>Info</Text>

            {tranArr.map((el, i) => (
              <Text style={styles.text} key={i}>
                {el.info}
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.smallTitle}>$Amount</Text>
            {tranArr.map((el, i) => (
              <Text style={styles.text} key={i}>
                {`$${el.amount}`}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });
  const [instance, updateInstance] = usePDF({ document: MyDoc });
  //  console.log(instance);
  const { year, month, date } = useSelector((store) => store.report);
  return (
    <Message
      style={{}}
      showIcon
      type="warning"
      header={`View or Download PDF report for ${dates[0].toDateString()} to ${dates[1].toDateString()}`}
    >
      <hr />
      <ButtonToolbar>
        <Button size="sm">
          <a href={instance.url}>View PDF</a>
        </Button>
        <PDFDownloadLink
          document={<MyDocument report={report} />}
          fileName="FORM"
        >
          {({ loading }) =>
            loading ? <Button>Loading Doc</Button> : <Button>Download</Button>
          }
        </PDFDownloadLink>
        <Button size="sm" onClick={() => setEmailConf(false)}>
          Go Back
        </Button>
      </ButtonToolbar>
    </Message>
  );
};

export default ViewReport;
