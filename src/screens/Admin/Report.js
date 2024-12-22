import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropdownComponent from '../../components/DropdownComponent';
import ReportComponent from '../../components/ReportComponent';
import reports from '../../../data/report';

const Report = () => {
  const [reportLabel, setReportLabel] = useState("Hôm nay")

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.reportSection}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 19, fontWeight: "500" }}>Báo cáo tổng quát</Text>
          <View style={{ width: 150 }}>
            <DropdownComponent data={reports} setLabel={setReportLabel} />
          </View>
        </View>


        <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: 'wrap', marginTop: 20 }}>

          {
            reports.find(item => item.label === reportLabel).data.map((item) => (
              <ReportComponent
                key={item.title}
                title={item?.title}
                value={item?.value}
                percentage={item?.percentage}
                progress={item?.progress}
                progressColor={item?.progressColor}
              />
            ))
          }

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Report

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  reportSection: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  }
})