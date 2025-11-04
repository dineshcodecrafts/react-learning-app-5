// src/components/ExportPdf.jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

// ✅ Define PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottom: "2px solid #007bff",
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    color: "#007bff",
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    border: "2px solid #007bff",
  },
  info: {
    marginLeft: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 14,
    marginBottom: 6,
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#888",
    marginTop: 40,
  },
});

// ✅ Create PDF layout component
const UserPDFDocument = ({ user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>User Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          style={styles.image}
          src={user.image || "https://via.placeholder.com/100"}
        />
        <View style={styles.info}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user.name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{user.role || "User"}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{user.status || "Active"}</Text>
        <Text style={styles.label}>Joined:</Text>
        <Text style={styles.value}>
          {user.joined || new Date().toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.footer}>
        Generated on {new Date().toLocaleString()}
      </Text>
    </Page>
  </Document>
);

// ✅ ExportPdf component (button + PDF link)
const ExportPdf = ({ user }) => (
  <PDFDownloadLink
    document={<UserPDFDocument user={user} />}
    fileName={`${user.name}_Profile.pdf`}
  >
    {({ loading }) =>
      loading ? (
        "Preparing PDF..."
      ) : (
        <button
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Export PDF
        </button>
      )
    }
  </PDFDownloadLink>
);

export default ExportPdf;
